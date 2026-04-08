/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadAuth, clearAuth } from '@/lib/auth'
import { adminApi } from '@/lib/api'
import Icon from '@/components/ui/icon'

type Tab = 'news' | 'events' | 'documents' | 'volunteers' | 'contests' | 'content'

const CATEGORY_COLORS = ['#d33682', '#268bd2', '#2aa198', '#cb4b16', '#6c71c4', '#859900']

const LOGO = 'https://cdn.poehali.dev/projects/2bd4f7a6-eadb-486e-a916-098fef7014b8/bucket/5be3bb63-1298-4d23-affa-f0c8facf365c.png'

export default function Admin() {
  const navigate = useNavigate()
  const { user } = loadAuth()
  const [tab, setTab] = useState<Tab>('news')
  const [data, setData] = useState<Record<string, any[]>>({ news: [], events: [], documents: [], volunteers: [], contests: [] })
  const [siteContent, setSiteContent] = useState<{key: string, label: string, value: string}[]>([])
  const [contentEdits, setContentEdits] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<{ open: boolean; item: any; type: Tab } | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<{ id: number; type: Tab; title: string } | null>(null)
  const [form, setForm] = useState<Record<string, any>>({})
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  const loadTab = useCallback(async (t: Tab) => {
    if (!user) return
    setLoading(true)
    if (t === 'content') {
      const res = await adminApi.contentList(user.id)
      const list = Array.isArray(res) ? res : []
      setSiteContent(list)
      const edits: Record<string, string> = {}
      list.forEach((i: any) => { edits[i.key] = i.value })
      setContentEdits(edits)
    } else {
      let result: any[] = []
      if (t === 'news') result = await adminApi.newsList(user.id)
      if (t === 'events') result = await adminApi.eventsList(user.id)
      if (t === 'documents') result = await adminApi.docsList(user.id)
      if (t === 'volunteers') result = await adminApi.volunteersList(user.id)
      if (t === 'contests') result = await adminApi.contestsList(user.id)
      setData(d => ({ ...d, [t]: Array.isArray(result) ? result : [] }))
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (user.role !== 'admin') { navigate('/cabinet'); return }
    loadTab(tab)
  }, [tab, loadTab, navigate, user])

  const openCreate = () => { setForm({}); setModal({ open: true, item: null, type: tab }) }
  const openEdit = (item: any) => { setForm({ ...item }); setModal({ open: true, item, type: tab }) }

  const handleSave = async () => {
    if (!user || !modal) return
    setSaving(true)
    const t = modal.type
    const isEdit = !!modal.item
    try {
      if (t === 'news') {
        if (isEdit) await adminApi.newsUpdate(user.id, form); else await adminApi.newsCreate(user.id, form)
      } else if (t === 'events') {
        if (isEdit) await adminApi.eventsUpdate(user.id, form); else await adminApi.eventsCreate(user.id, form)
      } else if (t === 'documents') {
        if (isEdit) await adminApi.docsUpdate(user.id, form); else await adminApi.docsCreate(user.id, form)
      } else if (t === 'volunteers') {
        await adminApi.volunteerUpdate(user.id, form)
      } else if (t === 'contests') {
        if (isEdit) await adminApi.contestsUpdate(user.id, form); else await adminApi.contestsCreate(user.id, form)
      }
      setModal(null)
      showToast('✓ Сохранено!')
      loadTab(t)
    } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!user || !confirmDelete) return
    setSaving(true)
    const { id, type } = confirmDelete
    try {
      if (type === 'news') await adminApi.newsDelete(user.id, id)
      else if (type === 'events') await adminApi.eventsDelete(user.id, id)
      else if (type === 'documents') await adminApi.docsDelete(user.id, id)
      else if (type === 'contests') await adminApi.contestsDelete(user.id, id)
      setConfirmDelete(null)
      showToast('✓ Удалено!')
      loadTab(type)
    } finally { setSaving(false) }
  }

  const handleSaveContent = async () => {
    if (!user) return
    setSaving(true)
    const items = Object.entries(contentEdits).map(([key, value]) => ({ key, value }))
    await adminApi.contentUpdate(user.id, items)
    setSaving(false)
    showToast('✓ Тексты сайта сохранены!')
  }

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }
  const logout = () => { clearAuth(); navigate('/') }

  const navItems: { key: Tab; icon: string; label: string }[] = [
    { key: 'news', icon: 'Newspaper', label: 'Новости' },
    { key: 'events', icon: 'Calendar', label: 'Мероприятия' },
    { key: 'documents', icon: 'FileText', label: 'Документы' },
    { key: 'volunteers', icon: 'Users', label: 'Волонтёры' },
    { key: 'contests', icon: 'Award', label: 'Конкурсы' },
    { key: 'content', icon: 'PenLine', label: 'Тексты сайта' },
  ]

  const canCreate = tab !== 'volunteers' && tab !== 'content'
  const canDelete = tab !== 'volunteers' && tab !== 'content'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');
        *{box-sizing:border-box;}
        .adm-wrap{display:flex;min-height:100vh;background:#002b36;font-family:"Montserrat",sans-serif;}
        .adm-sidebar{width:240px;flex-shrink:0;background:rgba(0,0,0,0.3);border-right:1px solid rgba(255,255,255,0.08);display:flex;flex-direction:column;padding:28px 0;position:sticky;top:0;height:100vh;}
        .adm-logo{padding:0 20px 24px;border-bottom:1px solid rgba(255,255,255,0.08);}
        .adm-logo img{width:110px;object-fit:contain;margin-bottom:4px;}
        .adm-logo h2{color:#fff;font-size:14px;font-weight:700;margin:0;}
        .adm-logo p{color:rgba(255,255,255,0.4);font-size:11px;margin:2px 0 0;}
        .adm-nav{flex:1;padding:16px 10px;overflow-y:auto;}
        .adm-nav-item{display:flex;align-items:center;gap:10px;padding:11px 12px;border-radius:12px;color:rgba(255,255,255,0.55);font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s;margin-bottom:4px;border:none;background:none;width:100%;text-align:left;}
        .adm-nav-item:hover{background:rgba(255,255,255,0.06);color:#fff;}
        .adm-nav-item.active{background:rgba(211,54,130,0.2);color:#d33682;}
        .adm-bottom{padding:0 10px 12px;}
        .adm-main{flex:1;overflow-y:auto;padding:36px;}
        .adm-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;gap:12px;}
        .adm-title{color:#fff;font-size:26px;font-weight:900;margin:0;}
        .adm-btn{padding:10px 18px;border-radius:12px;border:none;cursor:pointer;font-family:"Montserrat",sans-serif;font-size:13px;font-weight:700;transition:all 0.2s;display:inline-flex;align-items:center;gap:6px;}
        .adm-btn-primary{background:#d33682;color:#fff;}
        .adm-btn-primary:hover{opacity:0.85;}
        .adm-btn-primary:disabled{opacity:0.5;cursor:not-allowed;}
        .adm-btn-sm{padding:6px 12px;font-size:12px;border-radius:8px;}
        .adm-btn-outline{background:transparent;border:1px solid rgba(211,54,130,0.5);color:#d33682;}
        .adm-btn-outline:hover{background:rgba(211,54,130,0.1);}
        .adm-btn-danger{background:transparent;border:1px solid rgba(220,50,50,0.5);color:#ff6b6b;}
        .adm-btn-danger:hover{background:rgba(220,50,50,0.1);}
        .adm-btn-ghost{background:transparent;border:none;color:rgba(255,255,255,0.5);}
        .adm-btn-ghost:hover{color:#fff;}
        .adm-table{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;}
        .adm-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);transition:background 0.2s;}
        .adm-row:last-child{border-bottom:none;}
        .adm-row:hover{background:rgba(255,255,255,0.03);}
        .adm-row-info{flex:1;min-width:0;}
        .adm-row-title{color:#fff;font-weight:600;font-size:14px;margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
        .adm-row-sub{color:rgba(255,255,255,0.4);font-size:12px;}
        .adm-row-actions{display:flex;gap:6px;flex-shrink:0;}
        .adm-tag{display:inline-block;padding:2px 9px;border-radius:20px;background:rgba(211,54,130,0.2);color:#d33682;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-right:6px;}
        .adm-badge-active{display:inline-block;padding:2px 9px;border-radius:20px;background:rgba(42,161,152,0.2);color:#2aa198;font-size:11px;font-weight:700;}
        .adm-badge-inactive{display:inline-block;padding:2px 9px;border-radius:20px;background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.4);font-size:11px;font-weight:700;}
        .adm-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:300;display:flex;align-items:center;justify-content:center;padding:20px;}
        .adm-modal{background:#073642;border:1px solid rgba(211,54,130,0.3);border-radius:20px;padding:32px;width:100%;max-width:540px;max-height:90vh;overflow-y:auto;}
        .adm-modal-title{color:#fff;font-size:19px;font-weight:900;margin:0 0 22px;}
        .adm-field{margin-bottom:14px;}
        .adm-label{display:block;color:rgba(255,255,255,0.7);font-size:12px;font-weight:700;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;}
        .adm-input,.adm-textarea,.adm-select{width:100%;padding:11px 14px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.15);border-radius:10px;color:#fff;font-family:"Montserrat",sans-serif;font-size:13px;outline:none;transition:border-color 0.2s;}
        .adm-textarea{height:90px;resize:vertical;}
        .adm-select option{background:#073642;}
        .adm-input:focus,.adm-textarea:focus,.adm-select:focus{border-color:#d33682;}
        .adm-input::placeholder,.adm-textarea::placeholder{color:rgba(255,255,255,0.3);}
        .adm-modal-actions{display:flex;gap:10px;margin-top:22px;justify-content:flex-end;}
        .adm-confirm-modal{background:#073642;border:1px solid rgba(220,50,50,0.4);border-radius:20px;padding:32px;width:100%;max-width:420px;text-align:center;}
        .adm-confirm-title{color:#fff;font-size:18px;font-weight:900;margin:0 0 10px;}
        .adm-confirm-sub{color:rgba(255,255,255,0.5);font-size:14px;margin:0 0 24px;line-height:1.6;}
        .adm-confirm-name{color:#fff;font-weight:700;}
        .adm-confirm-actions{display:flex;gap:12px;justify-content:center;}
        .adm-toast{position:fixed;bottom:24px;right:24px;background:#2aa198;color:#fff;padding:12px 20px;border-radius:12px;font-weight:700;font-size:14px;z-index:999;animation:toastIn 0.3s ease;}
        @keyframes toastIn{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
        .loading-spin{color:rgba(255,255,255,0.4);font-size:15px;text-align:center;padding:60px;}
        .adm-checkbox-row{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,0.7);font-size:14px;}
        .adm-checkbox-row input{width:16px;height:16px;accent-color:#d33682;}
        .content-group{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;overflow:hidden;margin-bottom:16px;}
        .content-group-title{padding:12px 18px;background:rgba(211,54,130,0.1);border-bottom:1px solid rgba(255,255,255,0.06);color:#d33682;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;}
        .content-item{padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.05);}
        .content-item:last-child{border-bottom:none;}
        .content-item-label{color:rgba(255,255,255,0.6);font-size:11px;font-weight:700;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;}
        .adm-empty{padding:48px 24px;text-align:center;color:rgba(255,255,255,0.3);font-size:14px;}
        @media(max-width:768px){.adm-sidebar{display:none;}.adm-main{padding:20px 14px;}}
      `}</style>

      <div className="adm-wrap">
        <aside className="adm-sidebar">
          <div className="adm-logo">
            <img src={LOGO} alt="Молодёжь ВБР" />
            <h2>Молодёжь ВБР</h2>
            <p>Панель администратора</p>
          </div>
          <nav className="adm-nav">
            {navItems.map(item => (
              <button key={item.key} className={`adm-nav-item ${tab === item.key ? 'active' : ''}`} onClick={() => setTab(item.key)}>
                <Icon name={item.icon} size={16} /> {item.label}
              </button>
            ))}
          </nav>
          <div className="adm-bottom">
            <button className="adm-nav-item" onClick={() => navigate('/')}>
              <Icon name="Home" size={16} /> На сайт
            </button>
            <button className="adm-nav-item" style={{ color: '#ff6b6b' }} onClick={logout}>
              <Icon name="LogOut" size={16} /> Выйти
            </button>
          </div>
        </aside>

        <main className="adm-main">
          <div className="adm-header">
            <h1 className="adm-title">
              {tab === 'news' && 'Новости'}
              {tab === 'events' && 'Мероприятия'}
              {tab === 'documents' && 'Документы'}
              {tab === 'volunteers' && 'Волонтёры'}
              {tab === 'contests' && 'Конкурсы'}
              {tab === 'content' && 'Тексты сайта'}
            </h1>
            {canCreate && (
              <button className="adm-btn adm-btn-primary" onClick={openCreate}>
                <Icon name="Plus" size={15} /> Добавить
              </button>
            )}
            {tab === 'content' && (
              <button className="adm-btn adm-btn-primary" onClick={handleSaveContent} disabled={saving}>
                <Icon name="Save" size={15} /> {saving ? 'Сохранение...' : 'Сохранить всё'}
              </button>
            )}
          </div>

          {loading ? <div className="loading-spin">Загрузка...</div> : <>

            {/* ---- CONTENT EDITOR ---- */}
            {tab === 'content' && (() => {
              const groups: Record<string, {key: string, label: string, value: string}[]> = {}
              siteContent.forEach(item => {
                const g = item.label.split(':')[0] || 'Прочее'
                if (!groups[g]) groups[g] = []
                groups[g].push(item)
              })
              return Object.entries(groups).map(([group, items]) => (
                <div className="content-group" key={group}>
                  <div className="content-group-title">{group}</div>
                  {items.map(item => (
                    <div className="content-item" key={item.key}>
                      <div className="content-item-label">{item.label.split(':')[1]?.trim() || item.label}</div>
                      {item.value.length > 80 ? (
                        <textarea className="adm-textarea" style={{ height: 70 }}
                          value={contentEdits[item.key] ?? item.value}
                          onChange={e => setContentEdits(c => ({ ...c, [item.key]: e.target.value }))} />
                      ) : (
                        <input className="adm-input"
                          value={contentEdits[item.key] ?? item.value}
                          onChange={e => setContentEdits(c => ({ ...c, [item.key]: e.target.value }))} />
                      )}
                    </div>
                  ))}
                </div>
              ))
            })()}

            {/* ---- NEWS ---- */}
            {tab === 'news' && (
              <div className="adm-table">
                {data.news.length === 0 && <div className="adm-empty">Новостей пока нет. Нажмите «Добавить»</div>}
                {data.news.map((item: any) => (
                  <div className="adm-row" key={item.id}>
                    <div className="adm-row-info">
                      <div className="adm-row-title">{item.title}</div>
                      <div className="adm-row-sub"><span className="adm-tag">{item.category}</span>{item.date}</div>
                    </div>
                    <div className="adm-row-actions">
                      <button className="adm-btn adm-btn-sm adm-btn-outline" onClick={() => openEdit(item)}>
                        <Icon name="Pencil" size={12} /> Изменить
                      </button>
                      <button className="adm-btn adm-btn-sm adm-btn-danger" onClick={() => setConfirmDelete({ id: item.id, type: 'news', title: item.title })}>
                        <Icon name="Trash2" size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ---- EVENTS ---- */}
            {tab === 'events' && (
              <div className="adm-table">
                {data.events.length === 0 && <div className="adm-empty">Мероприятий пока нет. Нажмите «Добавить»</div>}
                {data.events.map((item: any) => (
                  <div className="adm-row" key={item.id}>
                    <div className="adm-row-info">
                      <div className="adm-row-title">{item.title}</div>
                      <div className="adm-row-sub">{item.event_date} · {item.event_time} · {item.location}</div>
                    </div>
                    <div className="adm-row-actions">
                      <button className="adm-btn adm-btn-sm adm-btn-outline" onClick={() => openEdit(item)}>
                        <Icon name="Pencil" size={12} /> Изменить
                      </button>
                      <button className="adm-btn adm-btn-sm adm-btn-danger" onClick={() => setConfirmDelete({ id: item.id, type: 'events', title: item.title })}>
                        <Icon name="Trash2" size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ---- DOCUMENTS ---- */}
            {tab === 'documents' && (
              <div className="adm-table">
                {data.documents.length === 0 && <div className="adm-empty">Документов пока нет. Нажмите «Добавить»</div>}
                {data.documents.map((item: any) => (
                  <div className="adm-row" key={item.id}>
                    <div className="adm-row-info">
                      <div className="adm-row-title">{item.title}</div>
                      <div className="adm-row-sub">
                        <span className="adm-tag">{item.file_type}</span>{item.doc_year}
                        {item.file_url && <> · <a href={item.file_url} target="_blank" rel="noreferrer" style={{ color: '#268bd2', textDecoration: 'none' }}>Открыть файл ↗</a></>}
                      </div>
                    </div>
                    <div className="adm-row-actions">
                      <button className="adm-btn adm-btn-sm adm-btn-outline" onClick={() => openEdit(item)}>
                        <Icon name="Pencil" size={12} /> Изменить
                      </button>
                      <button className="adm-btn adm-btn-sm adm-btn-danger" onClick={() => setConfirmDelete({ id: item.id, type: 'documents', title: item.title })}>
                        <Icon name="Trash2" size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ---- VOLUNTEERS ---- */}
            {tab === 'volunteers' && (
              <div className="adm-table">
                {data.volunteers.map((item: any) => (
                  <div className="adm-row" key={item.id}>
                    <div className="adm-row-info">
                      <div className="adm-row-title">{item.badge} {item.name}</div>
                      <div className="adm-row-sub">{item.email} · {item.hours} ч · Место #{item.rank || '—'}</div>
                    </div>
                    <div className="adm-row-actions">
                      <button className="adm-btn adm-btn-sm adm-btn-outline" onClick={() => openEdit(item)}>
                        <Icon name="Pencil" size={12} /> Изменить
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ---- CONTESTS ---- */}
            {tab === 'contests' && (
              <div className="adm-table">
                {data.contests.length === 0 && <div className="adm-empty">Конкурсов пока нет. Нажмите «Добавить»</div>}
                {data.contests.map((item: any) => (
                  <div className="adm-row" key={item.id}>
                    <div className="adm-row-info">
                      <div className="adm-row-title">{item.title}</div>
                      <div className="adm-row-sub">
                        {item.prize} · До {item.deadline}
                        {' '}
                        <span className={item.is_active ? 'adm-badge-active' : 'adm-badge-inactive'}>
                          {item.is_active ? 'Активен' : 'Завершён'}
                        </span>
                        {item.link && <> · <a href={item.link} target="_blank" rel="noreferrer" style={{ color: '#268bd2', textDecoration: 'none' }}>Ссылка ↗</a></>}
                      </div>
                    </div>
                    <div className="adm-row-actions">
                      <button className="adm-btn adm-btn-sm adm-btn-outline" onClick={() => openEdit(item)}>
                        <Icon name="Pencil" size={12} /> Изменить
                      </button>
                      <button className="adm-btn adm-btn-sm adm-btn-danger" onClick={() => setConfirmDelete({ id: item.id, type: 'contests', title: item.title })}>
                        <Icon name="Trash2" size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>}
        </main>
      </div>

      {/* EDIT/CREATE MODAL */}
      {modal?.open && (
        <div className="adm-modal-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="adm-modal">
            <h2 className="adm-modal-title">
              {modal.item ? 'Редактировать' : 'Добавить'} —{' '}
              {modal.type === 'news' && 'новость'}
              {modal.type === 'events' && 'мероприятие'}
              {modal.type === 'documents' && 'документ'}
              {modal.type === 'volunteers' && 'волонтёра'}
              {modal.type === 'contests' && 'конкурс'}
            </h2>

            {modal.type === 'news' && <>
              <div className="adm-field"><label className="adm-label">Заголовок</label>
                <input className="adm-input" value={form.title || ''} placeholder="Заголовок новости"
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
              <div className="adm-field"><label className="adm-label">Текст новости</label>
                <textarea className="adm-textarea" value={form.content || ''} placeholder="Текст новости..."
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))} /></div>
              <div className="adm-field"><label className="adm-label">Категория</label>
                <input className="adm-input" value={form.category || ''} placeholder="Конкурс / Событие / Программа"
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))} /></div>
              <div className="adm-field"><label className="adm-label">Дата публикации</label>
                <input className="adm-input" type="date" value={form.published_at || form.date || ''}
                  onChange={e => setForm(f => ({ ...f, published_at: e.target.value }))} /></div>
            </>}

            {modal.type === 'events' && <>
              <div className="adm-field"><label className="adm-label">Название</label>
                <input className="adm-input" value={form.title || ''} placeholder="Название мероприятия"
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
              <div className="adm-field"><label className="adm-label">Описание</label>
                <textarea className="adm-textarea" value={form.description || ''} placeholder="Описание..."
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
              <div className="adm-field"><label className="adm-label">Дата</label>
                <input className="adm-input" type="date" value={form.event_date || ''}
                  onChange={e => setForm(f => ({ ...f, event_date: e.target.value }))} /></div>
              <div className="adm-field"><label className="adm-label">Время</label>
                <input className="adm-input" value={form.event_time || ''} placeholder="10:00"
                  onChange={e => setForm(f => ({ ...f, event_time: e.target.value }))} /></div>
              <div className="adm-field"><label className="adm-label">Место проведения</label>
                <input className="adm-input" value={form.location || ''} placeholder="Чегдомын, ДК «Горняк»"
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></div>
              <div className="adm-field"><label className="adm-label">Категория</label>
                <input className="adm-input" value={form.category || ''} placeholder="Спорт / Форум / Культура..."
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))} /></div>
              <div className="adm-field"><label className="adm-label">Цвет категории</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
                  {CATEGORY_COLORS.map(c => (
                    <button key={c} onClick={() => setForm(f => ({ ...f, category_color: c }))}
                      style={{ width: 28, height: 28, borderRadius: '50%', background: c, cursor: 'pointer', border: form.category_color === c ? '3px solid #fff' : '2px solid transparent' }} />
                  ))}
                </div>
              </div>
              <div className="adm-field"><label className="adm-label">Ссылка на ДОБРО.РФ</label>
                <input className="adm-input" value={form.dobro_url || ''} placeholder="https://dobro.ru/event/..."
                  onChange={e => setForm(f => ({ ...f, dobro_url: e.target.value }))} /></div>
            </>}

            {modal.type === 'documents' && <>
              <div className="adm-field"><label className="adm-label">Название документа</label>
                <input className="adm-input" value={form.title || ''} placeholder="Название документа"
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
              <div className="adm-field"><label className="adm-label">Тип файла</label>
                <select className="adm-select adm-input" value={form.file_type || 'PDF'}
                  onChange={e => setForm(f => ({ ...f, file_type: e.target.value }))}>
                  <option>PDF</option><option>DOCX</option><option>XLSX</option><option>DOC</option>
                </select></div>
              <div className="adm-field"><label className="adm-label">Ссылка на файл (URL)</label>
                <input className="adm-input" value={form.file_url || ''} placeholder="https://..."
                  onChange={e => setForm(f => ({ ...f, file_url: e.target.value }))} /></div>
              <div className="adm-field"><label className="adm-label">Год</label>
                <input className="adm-input" value={form.doc_year || ''} placeholder="2025"
                  onChange={e => setForm(f => ({ ...f, doc_year: e.target.value }))} /></div>
            </>}

            {modal.type === 'volunteers' && <>
              <div style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 16, fontSize: 14 }}>
                Волонтёр: <strong style={{ color: '#fff' }}>{form.name}</strong>
              </div>
              <div className="adm-field"><label className="adm-label">Часов волонтёрства</label>
                <input className="adm-input" type="number" value={form.hours || 0}
                  onChange={e => setForm(f => ({ ...f, hours: parseInt(e.target.value) }))} /></div>
              <div className="adm-field"><label className="adm-label">Место в рейтинге</label>
                <input className="adm-input" type="number" value={form.rank || ''} placeholder="1"
                  onChange={e => setForm(f => ({ ...f, rank: parseInt(e.target.value) || null }))} /></div>
              <div className="adm-field"><label className="adm-label">Значок</label>
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  {['🥇', '🥈', '🥉', '⭐', '🌟', '🏅'].map(b => (
                    <button key={b} onClick={() => setForm(f => ({ ...f, badge: b }))}
                      style={{ fontSize: 20, background: form.badge === b ? 'rgba(211,54,130,0.3)' : 'transparent', border: form.badge === b ? '1px solid #d33682' : '1px solid transparent', borderRadius: 8, padding: '4px 8px', cursor: 'pointer' }}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div className="adm-field"><label className="adm-label">О волонтёре</label>
                <textarea className="adm-textarea" value={form.bio || ''} placeholder="Краткая биография..."
                  onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} /></div>
            </>}

            {modal.type === 'contests' && <>
              <div className="adm-field"><label className="adm-label">Название конкурса</label>
                <input className="adm-input" value={form.title || ''} placeholder="Название конкурса"
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
              <div className="adm-field"><label className="adm-label">Описание</label>
                <textarea className="adm-textarea" value={form.description || ''} placeholder="Описание конкурса..."
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
              <div className="adm-field"><label className="adm-label">Дедлайн</label>
                <input className="adm-input" type="date" value={form.deadline || ''}
                  onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} /></div>
              <div className="adm-field"><label className="adm-label">Приз / Вознаграждение</label>
                <input className="adm-input" value={form.prize || ''} placeholder="до 150 000 ₽"
                  onChange={e => setForm(f => ({ ...f, prize: e.target.value }))} /></div>
              <div className="adm-field"><label className="adm-label">Ссылка для подачи заявки</label>
                <input className="adm-input" value={form.link || ''} placeholder="https://dobro.ru/..."
                  onChange={e => setForm(f => ({ ...f, link: e.target.value }))} /></div>
              {modal.item && <div className="adm-checkbox-row">
                <input type="checkbox" checked={form.is_active !== false}
                  onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} />
                <label>Активный конкурс (показывать на сайте)</label>
              </div>}
            </>}

            <div className="adm-modal-actions">
              <button className="adm-btn adm-btn-ghost" onClick={() => setModal(null)}>Отмена</button>
              <button className="adm-btn adm-btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {confirmDelete && (
        <div className="adm-modal-overlay" onClick={e => e.target === e.currentTarget && setConfirmDelete(null)}>
          <div className="adm-confirm-modal">
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <div className="adm-confirm-title">Удалить запись?</div>
            <div className="adm-confirm-sub">
              Вы удаляете: <span className="adm-confirm-name">«{confirmDelete.title}»</span><br />
              Это действие нельзя отменить.
            </div>
            <div className="adm-confirm-actions">
              <button className="adm-btn adm-btn-ghost" onClick={() => setConfirmDelete(null)}>Отмена</button>
              <button className="adm-btn adm-btn-danger" onClick={handleDelete} disabled={saving}>
                {saving ? 'Удаление...' : 'Да, удалить'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="adm-toast">{toast}</div>}
    </>
  )
}