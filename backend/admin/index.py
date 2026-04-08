"""Администратор: CRUD новостей, документов, событий, волонтёров, конкурсов"""
import json
import os
import psycopg2
from datetime import date

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Session-Id, X-User-Id',
}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def serialize(obj):
    if isinstance(obj, date):
        return obj.isoformat()
    return str(obj)

def check_admin(cur, user_id):
    cur.execute("SELECT role FROM users WHERE id = %s", (user_id,))
    row = cur.fetchone()
    return row and row[0] == 'admin'

def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    headers = event.get('headers') or {}
    user_id_str = headers.get('x-user-id') or headers.get('X-User-Id', '')
    action = body.get('action', '')

    conn = get_conn()
    cur = conn.cursor()

    try:
        if not user_id_str:
            return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Не авторизован'})}

        user_id = int(user_id_str)
        if not check_admin(cur, user_id):
            return {'statusCode': 403, 'headers': CORS, 'body': json.dumps({'error': 'Доступ запрещён'})}

        # ---- NEWS ----
        if action == 'news_list':
            cur.execute("SELECT id, title, content, category, published_at FROM news ORDER BY published_at DESC")
            rows = cur.fetchall()
            data = [{'id': r[0], 'title': r[1], 'content': r[2], 'category': r[3], 'date': serialize(r[4])} for r in rows]
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(data, ensure_ascii=False)}

        if action == 'news_create':
            cur.execute(
                "INSERT INTO news (title, content, category, published_at, author_id) VALUES (%s, %s, %s, %s, %s) RETURNING id",
                (body['title'], body['content'], body.get('category', 'Новости'), body.get('published_at', date.today().isoformat()), user_id)
            )
            new_id = cur.fetchone()[0]
            conn.commit()
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'id': new_id})}

        if action == 'news_update':
            cur.execute(
                "UPDATE news SET title=%s, content=%s, category=%s, published_at=%s WHERE id=%s",
                (body['title'], body['content'], body.get('category', 'Новости'), body.get('published_at', date.today().isoformat()), body['id'])
            )
            conn.commit()
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

        # ---- DOCUMENTS ----
        if action == 'docs_list':
            cur.execute("SELECT id, title, file_type, file_url, doc_year FROM documents ORDER BY created_at DESC")
            rows = cur.fetchall()
            data = [{'id': r[0], 'title': r[1], 'file_type': r[2], 'file_url': r[3], 'doc_year': r[4]} for r in rows]
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(data, ensure_ascii=False)}

        if action == 'docs_create':
            cur.execute(
                "INSERT INTO documents (title, file_type, file_url, doc_year) VALUES (%s, %s, %s, %s) RETURNING id",
                (body['title'], body.get('file_type', 'PDF'), body.get('file_url'), body.get('doc_year'))
            )
            new_id = cur.fetchone()[0]
            conn.commit()
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'id': new_id})}

        if action == 'docs_update':
            cur.execute(
                "UPDATE documents SET title=%s, file_type=%s, file_url=%s, doc_year=%s WHERE id=%s",
                (body['title'], body.get('file_type', 'PDF'), body.get('file_url'), body.get('doc_year'), body['id'])
            )
            conn.commit()
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

        # ---- EVENTS ----
        if action == 'events_list':
            cur.execute("SELECT id, title, description, event_date, event_time, location, category, category_color, dobro_url FROM events ORDER BY event_date ASC")
            rows = cur.fetchall()
            data = [{'id': r[0], 'title': r[1], 'description': r[2], 'event_date': serialize(r[3]), 'event_time': r[4], 'location': r[5], 'category': r[6], 'category_color': r[7], 'dobro_url': r[8]} for r in rows]
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(data, ensure_ascii=False)}

        if action == 'events_create':
            cur.execute(
                "INSERT INTO events (title, description, event_date, event_time, location, category, category_color, dobro_url) VALUES (%s,%s,%s,%s,%s,%s,%s,%s) RETURNING id",
                (body['title'], body.get('description'), body['event_date'], body.get('event_time'), body.get('location'), body.get('category'), body.get('category_color', '#d33682'), body.get('dobro_url'))
            )
            new_id = cur.fetchone()[0]
            conn.commit()
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'id': new_id})}

        if action == 'events_update':
            cur.execute(
                "UPDATE events SET title=%s, description=%s, event_date=%s, event_time=%s, location=%s, category=%s, category_color=%s, dobro_url=%s WHERE id=%s",
                (body['title'], body.get('description'), body['event_date'], body.get('event_time'), body.get('location'), body.get('category'), body.get('category_color', '#d33682'), body.get('dobro_url'), body['id'])
            )
            conn.commit()
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

        # ---- VOLUNTEERS ----
        if action == 'volunteers_list':
            cur.execute("""
                SELECT u.id, u.full_name, u.email, v.hours, v.rank, v.badge, v.bio
                FROM volunteers v JOIN users u ON u.id = v.user_id ORDER BY v.hours DESC
            """)
            rows = cur.fetchall()
            data = [{'id': r[0], 'name': r[1], 'email': r[2], 'hours': r[3], 'rank': r[4], 'badge': r[5], 'bio': r[6]} for r in rows]
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(data, ensure_ascii=False)}

        if action == 'volunteer_update':
            cur.execute(
                "UPDATE volunteers SET hours=%s, rank=%s, badge=%s, bio=%s WHERE user_id=%s",
                (body.get('hours', 0), body.get('rank'), body.get('badge', '⭐'), body.get('bio'), body['id'])
            )
            conn.commit()
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

        # ---- CONTESTS ----
        if action == 'contests_list':
            cur.execute("SELECT id, title, description, deadline, prize, link, is_active FROM contests ORDER BY deadline ASC")
            rows = cur.fetchall()
            data = [{'id': r[0], 'title': r[1], 'description': r[2], 'deadline': serialize(r[3]), 'prize': r[4], 'link': r[5], 'is_active': r[6]} for r in rows]
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(data, ensure_ascii=False)}

        if action == 'contests_create':
            cur.execute(
                "INSERT INTO contests (title, description, deadline, prize, link) VALUES (%s,%s,%s,%s,%s) RETURNING id",
                (body['title'], body.get('description'), body.get('deadline'), body.get('prize'), body.get('link'))
            )
            new_id = cur.fetchone()[0]
            conn.commit()
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'id': new_id})}

        if action == 'contests_update':
            cur.execute(
                "UPDATE contests SET title=%s, description=%s, deadline=%s, prize=%s, link=%s, is_active=%s WHERE id=%s",
                (body['title'], body.get('description'), body.get('deadline'), body.get('prize'), body.get('link'), body.get('is_active', True), body['id'])
            )
            conn.commit()
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

        # ---- DELETE ----
        if action == 'news_delete':
            cur.execute("DELETE FROM news WHERE id=%s", (body['id'],))
            conn.commit()
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

        if action == 'events_delete':
            cur.execute("DELETE FROM event_registrations WHERE event_id=%s", (body['id'],))
            cur.execute("DELETE FROM events WHERE id=%s", (body['id'],))
            conn.commit()
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

        if action == 'docs_delete':
            cur.execute("DELETE FROM documents WHERE id=%s", (body['id'],))
            conn.commit()
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

        if action == 'contests_delete':
            cur.execute("DELETE FROM contests WHERE id=%s", (body['id'],))
            conn.commit()
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

        # ---- SITE CONTENT ----
        if action == 'content_list':
            cur.execute("SELECT key, label, value FROM site_content ORDER BY id ASC")
            rows = cur.fetchall()
            data = [{'key': r[0], 'label': r[1], 'value': r[2]} for r in rows]
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(data, ensure_ascii=False)}

        if action == 'content_update':
            for item in body.get('items', []):
                cur.execute(
                    "UPDATE site_content SET value=%s, updated_at=NOW() WHERE key=%s",
                    (item['value'], item['key'])
                )
            conn.commit()
            return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

        return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Неизвестное действие'})}

    finally:
        cur.close()
        conn.close()