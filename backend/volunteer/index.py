"""Личный кабинет волонтёра: профиль, мои мероприятия, регистрация на событие"""
import json
import os
import psycopg2
from datetime import date

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def serialize(obj):
    if isinstance(obj, date):
        return obj.isoformat()
    return str(obj)

def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    headers = event.get('headers') or {}
    user_id_str = headers.get('x-user-id') or headers.get('X-User-Id', '')
    action = body.get('action', '')

    if not user_id_str:
        return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Не авторизован'})}

    user_id = int(user_id_str)
    conn = get_conn()
    cur = conn.cursor()

    try:
        if action == 'profile':
            cur.execute("""
                SELECT u.id, u.full_name, u.email, u.dobro_profile_url,
                       v.hours, v.rank, v.badge, v.bio
                FROM users u LEFT JOIN volunteers v ON v.user_id = u.id
                WHERE u.id = %s
            """, (user_id,))
            row = cur.fetchone()
            if not row:
                return {'statusCode': 404, 'headers': CORS, 'body': json.dumps({'error': 'Пользователь не найден'})}
            cur.execute("SELECT COUNT(*) FROM volunteers")
            total = cur.fetchone()[0]
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({
                'id': row[0], 'full_name': row[1], 'email': row[2],
                'dobro_profile_url': row[3],
                'hours': row[4] or 0, 'rank': row[5], 'badge': row[6] or '⭐',
                'bio': row[7], 'total_volunteers': total
            }, ensure_ascii=False)}

        if action == 'profile_update':
            if 'dobro_profile_url' in body:
                cur.execute("UPDATE users SET dobro_profile_url=%s WHERE id=%s", (body['dobro_profile_url'], user_id))
            if 'bio' in body:
                cur.execute("UPDATE volunteers SET bio=%s WHERE user_id=%s", (body['bio'], user_id))
            conn.commit()
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

        if action == 'my_events':
            cur.execute("""
                SELECT e.id, e.title, e.event_date, e.event_time, e.location, e.category, e.category_color, e.dobro_url
                FROM event_registrations er
                JOIN events e ON e.id = er.event_id
                WHERE er.user_id = %s ORDER BY e.event_date ASC
            """, (user_id,))
            rows = cur.fetchall()
            data = [{'id': r[0], 'title': r[1], 'event_date': serialize(r[2]), 'event_time': r[3], 'location': r[4], 'category': r[5], 'category_color': r[6], 'dobro_url': r[7]} for r in rows]
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(data, ensure_ascii=False)}

        if action == 'register_event':
            event_id = body.get('event_id')
            if not event_id:
                return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'event_id обязателен'})}
            cur.execute(
                "INSERT INTO event_registrations (event_id, user_id) VALUES (%s, %s) ON CONFLICT DO NOTHING",
                (event_id, user_id)
            )
            conn.commit()
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

        if action == 'contests':
            cur.execute("SELECT id, title, description, deadline, prize, link FROM contests WHERE is_active=TRUE ORDER BY deadline ASC")
            rows = cur.fetchall()
            data = [{'id': r[0], 'title': r[1], 'description': r[2], 'deadline': serialize(r[3]), 'prize': r[4], 'link': r[5]} for r in rows]
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(data, ensure_ascii=False)}

        if action == 'rating':
            cur.execute("""
                SELECT u.id, u.full_name, v.hours, v.rank, v.badge
                FROM volunteers v JOIN users u ON u.id = v.user_id ORDER BY v.hours DESC
            """)
            rows = cur.fetchall()
            data = [{'id': r[0], 'name': r[1], 'hours': r[2], 'rank': r[3], 'badge': r[4], 'is_me': r[0] == user_id} for r in rows]
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(data, ensure_ascii=False)}

        return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Укажите action'})}

    finally:
        cur.close()
        conn.close()