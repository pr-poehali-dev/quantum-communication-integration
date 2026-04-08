"""Публичное API: новости, документы, события, волонтёры, конкурсы"""
import json
import os
import psycopg2
from datetime import date

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
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
    qs = event.get('queryStringParameters') or {}
    action = body.get('action') or qs.get('action', '')

    conn = get_conn()
    cur = conn.cursor()

    try:
        if action == 'news':
            cur.execute("SELECT id, title, content, category, published_at FROM news ORDER BY published_at DESC")
            rows = cur.fetchall()
            data = [{'id': r[0], 'title': r[1], 'content': r[2], 'category': r[3], 'date': serialize(r[4])} for r in rows]
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(data, ensure_ascii=False)}

        if action == 'documents':
            cur.execute("SELECT id, title, file_type, file_url, doc_year FROM documents ORDER BY created_at DESC")
            rows = cur.fetchall()
            data = [{'id': r[0], 'title': r[1], 'file_type': r[2], 'file_url': r[3], 'doc_year': r[4]} for r in rows]
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(data, ensure_ascii=False)}

        if action == 'events':
            cur.execute("SELECT id, title, description, event_date, event_time, location, category, category_color, dobro_url FROM events ORDER BY event_date ASC")
            rows = cur.fetchall()
            data = [{'id': r[0], 'title': r[1], 'description': r[2], 'event_date': serialize(r[3]), 'event_time': r[4], 'location': r[5], 'category': r[6], 'category_color': r[7], 'dobro_url': r[8]} for r in rows]
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(data, ensure_ascii=False)}

        if action == 'volunteers':
            cur.execute("""
                SELECT u.id, u.full_name, v.hours, v.rank, v.badge
                FROM volunteers v JOIN users u ON u.id = v.user_id
                ORDER BY v.hours DESC
            """)
            rows = cur.fetchall()
            data = [{'id': r[0], 'name': r[1], 'hours': r[2], 'rank': r[3], 'badge': r[4]} for r in rows]
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(data, ensure_ascii=False)}

        if action == 'contests':
            cur.execute("SELECT id, title, description, deadline, prize, link FROM contests WHERE is_active = TRUE ORDER BY deadline ASC")
            rows = cur.fetchall()
            data = [{'id': r[0], 'title': r[1], 'description': r[2], 'deadline': serialize(r[3]), 'prize': r[4], 'link': r[5]} for r in rows]
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(data, ensure_ascii=False)}

        if action == 'site_content':
            cur.execute("SELECT key, value FROM site_content ORDER BY id ASC")
            rows = cur.fetchall()
            data = {r[0]: r[1] for r in rows}
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(data, ensure_ascii=False)}

        return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Укажите action'})}

    finally:
        cur.close()
        conn.close()