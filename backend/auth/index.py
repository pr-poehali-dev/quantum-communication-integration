"""Авторизация: вход администратора"""
import json
import os
import hashlib
import secrets
import psycopg2

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Session-Id',
}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    h = hashlib.sha256(f"{salt}{password}".encode()).hexdigest()
    return f"sha256:{salt}:{h}"

def verify_password(password: str, stored: str) -> bool:
    if stored.startswith('plain:'):
        return stored[6:] == password
    if stored.startswith('sha256:'):
        _, salt, h = stored.split(':', 2)
        return hashlib.sha256(f"{salt}{password}".encode()).hexdigest() == h
    return False

def make_session_token(user_id: int) -> str:
    return hashlib.sha256(f"{user_id}{secrets.token_hex(16)}".encode()).hexdigest()

def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    action = body.get('action', '')

    conn = get_conn()
    cur = conn.cursor()

    try:
        if action == 'login':
            email = body.get('email', '').strip().lower()
            password = body.get('password', '')

            cur.execute("SELECT id, email, full_name, role, password_hash FROM users WHERE email = %s", (email,))
            row = cur.fetchone()
            if not row or not verify_password(password, row[4]):
                return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Неверный email или пароль'})}

            user_id, u_email, full_name, role, _ = row
            token = make_session_token(user_id)

            vol_data = None
            if role == 'volunteer':
                cur.execute("SELECT hours, rank, badge FROM volunteers WHERE user_id = %s", (user_id,))
                v = cur.fetchone()
                if v:
                    vol_data = {'hours': v[0], 'rank': v[1], 'badge': v[2]}

            return {
                'statusCode': 200,
                'headers': CORS,
                'body': json.dumps({
                    'token': token,
                    'user': {'id': user_id, 'email': u_email, 'full_name': full_name, 'role': role},
                    'volunteer': vol_data
                }, ensure_ascii=False)
            }

        if action == 'register':
            email = body.get('email', '').strip().lower()
            password = body.get('password', '')
            full_name = body.get('full_name', '').strip()

            if not email or not password or not full_name:
                return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Заполните все поля'})}

            cur.execute("SELECT id FROM users WHERE email = %s", (email,))
            if cur.fetchone():
                return {'statusCode': 409, 'headers': CORS, 'body': json.dumps({'error': 'Пользователь с таким email уже существует'})}

            pw_hash = hash_password(password)
            cur.execute(
                "INSERT INTO users (email, password_hash, full_name, role) VALUES (%s, %s, %s, 'volunteer') RETURNING id",
                (email, pw_hash, full_name)
            )
            user_id = cur.fetchone()[0]
            cur.execute("INSERT INTO volunteers (user_id, hours, badge) VALUES (%s, 0, '⭐')", (user_id,))
            conn.commit()

            token = make_session_token(user_id)
            return {
                'statusCode': 200,
                'headers': CORS,
                'body': json.dumps({
                    'token': token,
                    'user': {'id': user_id, 'email': email, 'full_name': full_name, 'role': 'volunteer'},
                    'volunteer': {'hours': 0, 'rank': None, 'badge': '⭐'}
                }, ensure_ascii=False)
            }

        return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Укажите action: login или register'})}

    finally:
        cur.close()
        conn.close()