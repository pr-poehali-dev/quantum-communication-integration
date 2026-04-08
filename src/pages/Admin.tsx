/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadAuth, clearAuth } from '@/lib/auth'
import { adminApi } from '@/lib/api'
import Icon from '@/components/ui/icon'

type Tab = 'news' | 'events' | 'documents' | 'volunteers' | 'contests'

const CATEGORY_COLORS = ['#d33682', '#268bd2', '#2aa198', '#cb4b16', '#6c71c4', '#859900']

export default function Admin() {
  const navigate = useNavigate()
  const { user } = loadAuth()
  const [tab, setTab] = useState<Tab>('news')
  const [data, setData] = useState<Record<Tab, any[]>>({ news: [], events: [], documents: [], volunteers: [], contests: [] })
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<{ open: boolean; item: any; type: Tab } | null>(null)
  const [form, setForm] = useState<Record<string, any>>({})
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (user.role !== 'admin') { navigate('/cabinet'); return }
    loadTab(tab)
  }, [tab])

  const loadTab = async (t: Tab) => {
    if (!user) return
    setLoading(true)
    let result: any[] = []
    if (t === 'news') result = await adminApi.newsList(user.id)
    if (t === 'events') result = await adminApi.eventsList(user.id)
    if (t === 'documents') result = await adminApi.docsList(user.id)
    if (t === 'volunteers') result = await adminApi.volunteersList(user.id)
    if (t === 'contests') result = await adminApi.contestsList(user.id)
    setData(d => ({ ...d, [t]: Array.isArray(result) ? result : [] }))
    setLoading(false)
  }

  const openCreate = () => {
    setForm({})
    setModal({ open: true, item: null, type: tab })
  }

  const openEdit = (item: any) => {
    setForm({ ...item })
    setModal({ open: true, item, type: tab })
  }

  const handleSave = async () => {
    if (!user || !modal) return
    setSaving(true)
    const t = modal.type
    const isEdit = !!modal.item
    try {
      if (t === 'news') {
        if (isEdit) await adminApi.newsUpdate(user.id, form)
        else await adminApi.newsCreate(user.id, form)
      } else if (t === 'events') {
        if (isEdit) await adminApi.eventsUpdate(user.id, form)
        else await adminApi.eventsCreate(user.id, form)
      } else if (t === 'documents') {
        if (isEdit) await adminApi.docsUpdate(user.id, form)
        else await adminApi.docsCreate(user.id, form)
      } else if (t === 'volunteers') {
        await adminApi.volunteerUpdate(user.id, form)
      } else if (t === 'contests') {
        if (isEdit) await adminApi.contestsUpdate(user.id, form)
        else await adminApi.contestsCreate(user.id, form)
      }
      setModal(null)
      showToast('Сохранено!')
      loadTab(t)
    } finally {
      setSaving(false)
    }
  }

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const logout = () => { clearAuth(); navigate('/') }

  const navItems: { key: Tab; icon: string; label: string }[] = [
    { key: 'news', icon: 'Newspaper', label: 'Новости' },
    { key: 'events', icon: 'Calendar', label: 'Мероприятия' },
    { key: 'documents', icon: 'FileText', label: 'Документы' },
    { key: 'volunteers', icon: 'Users', label: 'Волонтёры' },
    { key: 'contests', icon: 'Award', label: 'Конкурсы' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');
        .adm-wrap{display:flex;min-height:100vh;background:#002b36;font-family:"Montserrat",sans-serif;}
        .adm-sidebar{width:240px;flex-shrink:0;background:rgba(0,0,0,0.3);border-right:1px solid rgba(255,255,255,0.08);display:flex;flex-direction:column;padding:28px 0;}
        .adm-logo{padding:0 24px 28px;border-bottom:1px solid rgba(255,255,255,0.08);}
        .adm-logo-icon{width:44px;height:44px;background:#d33682;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;color:#002b36;margin-bottom:8px;}
        .adm-logo h2{color:#fff;font-size:15px;font-weight:700;margin:0;}
        .adm-logo p{color:rgba(255,255,255,0.4);font-size:11px;margin:2px 0 0;}
        .adm-nav{flex:1;padding:16px 12px;}
        .adm-nav-item{display:flex;align-items:center;gap:10px;padding:11px 12px;border-radius:12px;color:rgba(255,255,255,0.55);font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;margin-bottom:4px;border:none;background:none;width:100%;text-align:left;}
        .adm-nav-item:hover{background:rgba(255,255,255,0.06);color:#fff;}
        .adm-nav-item.active{background:rgba(211,54,130,0.2);color:#d33682;}
        .adm-logout{padding:0 12px 12px;}
        .adm-logout-btn{display:flex;align-items:center;gap:10px;padding:11px 12px;border-radius:12px;color:rgba(255,255,255,0.4);font-size:14px;font-weight:600;cursor:pointer;background:none;border:none;width:100%;transition:all 0.2s;}
        .adm-logout-btn:hover{color:#ff6b6b;}
        .adm-main{flex:1;overflow-y:auto;padding:40px;}
        .adm-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;}
        .adm-title{color:#fff;font-size:28px;font-weight:900;margin:0;}
        .adm-btn{padding:10px 20px;border-radius:12px;border:none;cursor:pointer;font-family:"Montserrat",sans-serif;font-size:14px;font-weight:700;transition:all 0.2s;}
        .adm-btn-primary{background:#d33682;color:#fff;}
        .adm-btn-primary:hover{opacity:0.85;}
        .adm-btn-sm{padding:6px 14px;font-size:12px;border-radius:8px;}
        .adm-btn-outline{background:transparent;border:1px solid rgba(211,54,130,0.5);color:#d33682;}
        .adm-btn-outline:hover{background:rgba(211,54,130,0.1);}
        .adm-table{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;}
        .adm-row{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.06);transition:background 0.2s;}
        .adm-row:last-child{border-bottom:none;}
        .adm-row:hover{background:rgba(255,255,255,0.03);}
        .adm-row-info{flex:1;min-width:0;}
        .adm-row-title{color:#fff;font-weight:600;font-size:15px;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .adm-row-sub{color:rgba(255,255,255,0.4);font-size:12px;}
        .adm-tag{display:inline-block;padding:3px 10px;border-radius:20px;background:rgba(211,54,130,0.2);color:#d33682;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-right:6px;}
        .adm-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;}
        .adm-modal{background:#073642;border:1px solid rgba(211,54,130,0.3);border-radius:20px;padding:36px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;}
        .adm-modal-title{color:#fff;font-size:20px;font-weight:900;margin:0 0 24px;}
        .adm-field{margin-bottom:16px;}
        .adm-label{display:block;color:rgba(255,255,255,0.7);font-size:13px;font-weight:600;margin-bottom:7px;}
        .adm-input,.adm-textarea,.adm-select{width:100%;padding:11px 14px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.15);border-radius:10px;color:#fff;font-family:"Montserrat",sans-serif;font-size:14px;outline:none;box-sizing:border-box;transition:border-color 0.2s;}
        .adm-textarea{height:90px;resize:vertical;}
        .adm-select option{background:#073642;}
        .adm-input:focus,.adm-textarea:focus,.adm-select:focus{border-color:#d33682;}
        .adm-input::placeholder,.adm-textarea::placeholder{color:rgba(255,255,255,0.3);}
        .adm-modal-actions{display:flex;gap:12px;margin-top:24px;justify-content:flex-end;}
        .adm-toast{position:fixed;bottom:24px;right:24px;background:#2aa198;color:#fff;padding:12px 20px;border-radius:12px;font-weight:600;font-size:14px;z-index:999;}
        .loading-spin{color:rgba(255,255,255,0.4);font-size:16px;text-align:center;padding:60px;}
        .adm-checkbox-row{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,0.7);font-size:14px;}
        .adm-checkbox-row input{width:16px;height:16px;accent-color:#d33682;}
        @media(max-width:768px){.adm-sidebar{display:none;}.adm-main{padding:24px 16px;}}
      `}</style>

      <div className="adm-wrap">
        <aside className="adm-sidebar">
          <div className="adm-logo">
            <div className="adm-logo-icon">МВ</div>
            <h2>Молодёжь ВБР</h2>
            <p>Панель администратора</p>
          </div>
          <nav className="adm-nav">
            {navItems.map(item => (
              <button key={item.key} className={`adm-nav-item ${tab === item.key ? 'active' : ''}`}
                onClick={() => setTab(item.key)}>
                <Icon name={item.icon} size={18} />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="adm-logout">
            <button className="adm-nav-item" style={{ color: 'rgba(255,255,255,0.4)' }} onClick={() => navigate('/')}>
              <Icon name="Home" size={18} /> На сайт
            </button>
            <button className="adm-logout-btn" onClick={logout}>
              <Icon name="LogOut" size={18} /> Выйти
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
            </h1>
            {tab !== 'volunteers' && (
              <button className="adm-btn adm-btn-primary" onClick={openCreate}>
                + Добавить
              </button>
            )}
          </div>

          {loading ? <div className="loading-spin">Загрузка...</div> : (
            <div className="adm-table">
              {/* NEWS */}
              {tab === 'news' && data.news.map((item: any) => (
                <div className="adm-row" key={item.id}>
                  <div className="adm-row-info">
                    <div className="adm-row-title">{item.title}</div>
                    <div className="adm-row-sub"><span className="adm-tag">{item.category}</span>{item.date}</div>
                  </div>
                  <button className="adm-btn adm-btn-sm adm-btn-outline" onClick={() => openEdit(item)}>
                    <Icon name="Pencil" size={12} /> Изменить
                  </button>
                </div>
              ))}

              {/* EVENTS */}
              {tab === 'events' && data.events.map((item: any) => (
                <div className="adm-row" key={item.id}>
                  <div className="adm-row-info">
                    <div className="adm-row-title">{item.title}</div>
                    <div className="adm-row-sub">{item.event_date} · {item.location}</div>
                  </div>
                  <button className="adm-btn adm-btn-sm adm-btn-outline" onClick={() => openEdit(item)}>
                    <Icon name="Pencil" size={12} /> Изменить
                  </button>
                </div>
              ))}

              {/* DOCUMENTS */}
              {tab === 'documents' && data.documents.map((item: any) => (
                <div className="adm-row" key={item.id}>
                  <div className="adm-row-info">
                    <div className="adm-row-title">{item.title}</div>
                    <div className="adm-row-sub"><span className="adm-tag">{item.file_type}</span>{item.doc_year}</div>
                  </div>
                  <button className="adm-btn adm-btn-sm adm-btn-outline" onClick={() => openEdit(item)}>
                    <Icon name="Pencil" size={12} /> Изменить
                  </button>
                </div>
              ))}

              {/* VOLUNTEERS */}
              {tab === 'volunteers' && data.volunteers.map((item: any) => (
                <div className="adm-row" key={item.id}>
                  <div className="adm-row-info">
                    <div className="adm-row-title">{item.name}</div>
                    <div className="adm-row-sub">{item.email} · {item.hours} ч · Место #{item.rank || '—'}</div>
                  </div>
                  <button className="adm-btn adm-btn-sm adm-btn-outline" onClick={() => openEdit(item)}>
                    <Icon name="Pencil" size={12} /> Изменить
                  </button>
                </div>
              ))}

              {/* CONTESTS */}
              {tab === 'contests' && data.contests.map((item: any) => (
                <div className="adm-row" key={item.id}>
                  <div className="adm-row-info">
                    <div className="adm-row-title">{item.title}</div>
                    <div className="adm-row-sub">{item.prize} · До {item.deadline}</div>
                  </div>
                  <button className="adm-btn adm-btn-sm adm-btn-outline" onClick={() => openEdit(item)}>
                    <Icon name="Pencil" size={12} /> Изменить
                  </button>
                </div>
              ))}

              {data[tab].length === 0 && (
                <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>
                  Пока ничего нет. Нажмите «Добавить»
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* MODAL */}
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
                <input className="adm-input" value={form.title || ''} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="Заголовок новости" /></div>
              <div className="adm-field"><label className="adm-label">Текст</label>
                <textarea className="adm-textarea" value={form.content || ''} onChange={e => setForm(f => ({...f, content: e.target.value}))} placeholder="Текст новости..." /></div>
              <div className="adm-field"><label className="adm-label">Категория</label>
                <input className="adm-input" value={form.category || ''} onChange={e => setForm(f => ({...f, category: e.target.value}))} placeholder="Конкурс / Событие / Программа" /></div>
              <div className="adm-field"><label className="adm-label">Дата публикации</label>
                <input className="adm-input" type="date" value={form.published_at || form.date || ''} onChange={e => setForm(f => ({...f, published_at: e.target.value}))} /></div>
            </>}

            {modal.type === 'events' && <>
              <div className="adm-field"><label className="adm-label">Название</label>
                <input className="adm-input" value={form.title || ''} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="Название мероприятия" /></div>
              <div className="adm-field"><label className="adm-label">Описание</label>
                <textarea className="adm-textarea" value={form.description || ''} onChange={e => setForm(f => ({...f, description: e.target.value}))} placeholder="Описание..." /></div>
              <div className="adm-field"><label className="adm-label">Дата</label>
                <input className="adm-input" type="date" value={form.event_date || ''} onChange={e => setForm(f => ({...f, event_date: e.target.value}))} /></div>
              <div className="adm-field"><label className="adm-label">Время</label>
                <input className="adm-input" value={form.event_time || ''} onChange={e => setForm(f => ({...f, event_time: e.target.value}))} placeholder="10:00" /></div>
              <div className="adm-field"><label className="adm-label">Место проведения</label>
                <input className="adm-input" value={form.location || ''} onChange={e => setForm(f => ({...f, location: e.target.value}))} placeholder="Чегдомын, ДК «Горняк»" /></div>
              <div className="adm-field"><label className="adm-label">Категория</label>
                <input className="adm-input" value={form.category || ''} onChange={e => setForm(f => ({...f, category: e.target.value}))} placeholder="Спорт / Форум / Культура..." /></div>
              <div className="adm-field"><label className="adm-label">Цвет категории</label>
                <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:4}}>
                  {CATEGORY_COLORS.map(c => (
                    <button key={c} onClick={() => setForm(f => ({...f, category_color: c}))}
                      style={{width:28,height:28,borderRadius:'50%',background:c,border: form.category_color === c ? '3px solid #fff' : '2px solid transparent',cursor:'pointer'}} />
                  ))}
                </div>
              </div>
              <div className="adm-field"><label className="adm-label">Ссылка на ДОБРО.РФ (необязательно)</label>
                <input className="adm-input" value={form.dobro_url || ''} onChange={e => setForm(f => ({...f, dobro_url: e.target.value}))} placeholder="https://dobro.ru/event/..." /></div>
            </>}

            {modal.type === 'documents' && <>
              <div className="adm-field"><label className="adm-label">Название документа</label>
                <input className="adm-input" value={form.title || ''} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="Название документа" /></div>
              <div className="adm-field"><label className="adm-label">Тип файла</label>
                <select className="adm-select adm-input" value={form.file_type || 'PDF'} onChange={e => setForm(f => ({...f, file_type: e.target.value}))}>
                  <option>PDF</option><option>DOCX</option><option>XLSX</option><option>DOC</option>
                </select></div>
              <div className="adm-field"><label className="adm-label">Ссылка на файл (необязательно)</label>
                <input className="adm-input" value={form.file_url || ''} onChange={e => setForm(f => ({...f, file_url: e.target.value}))} placeholder="https://..." /></div>
              <div className="adm-field"><label className="adm-label">Год</label>
                <input className="adm-input" value={form.doc_year || ''} onChange={e => setForm(f => ({...f, doc_year: e.target.value}))} placeholder="2025" /></div>
            </>}

            {modal.type === 'volunteers' && <>
              <div style={{color:'rgba(255,255,255,0.8)',marginBottom:16,fontSize:14}}>
                Редактирование волонтёра: <strong style={{color:'#fff'}}>{form.name}</strong>
              </div>
              <div className="adm-field"><label className="adm-label">Часов волонтёрства</label>
                <input className="adm-input" type="number" value={form.hours || 0} onChange={e => setForm(f => ({...f, hours: parseInt(e.target.value)}))} /></div>
              <div className="adm-field"><label className="adm-label">Место в рейтинге</label>
                <input className="adm-input" type="number" value={form.rank || ''} onChange={e => setForm(f => ({...f, rank: parseInt(e.target.value) || null}))} placeholder="1" /></div>
              <div className="adm-field"><label className="adm-label">Значок</label>
                <div style={{display:'flex',gap:8,marginTop:4}}>
                  {['🥇','🥈','🥉','⭐','🌟','🏅'].map(b => (
                    <button key={b} onClick={() => setForm(f => ({...f, badge: b}))}
                      style={{fontSize:20,background: form.badge===b ? 'rgba(211,54,130,0.3)' : 'transparent',border: form.badge===b ? '1px solid #d33682' : '1px solid transparent',borderRadius:8,padding:'4px 8px',cursor:'pointer'}}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div className="adm-field"><label className="adm-label">О волонтёре</label>
                <textarea className="adm-textarea" value={form.bio || ''} onChange={e => setForm(f => ({...f, bio: e.target.value}))} placeholder="Краткая биография..." /></div>
            </>}

            {modal.type === 'contests' && <>
              <div className="adm-field"><label className="adm-label">Название конкурса</label>
                <input className="adm-input" value={form.title || ''} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="Название конкурса" /></div>
              <div className="adm-field"><label className="adm-label">Описание</label>
                <textarea className="adm-textarea" value={form.description || ''} onChange={e => setForm(f => ({...f, description: e.target.value}))} placeholder="Описание конкурса..." /></div>
              <div className="adm-field"><label className="adm-label">Дедлайн</label>
                <input className="adm-input" type="date" value={form.deadline || ''} onChange={e => setForm(f => ({...f, deadline: e.target.value}))} /></div>
              <div className="adm-field"><label className="adm-label">Приз / Вознаграждение</label>
                <input className="adm-input" value={form.prize || ''} onChange={e => setForm(f => ({...f, prize: e.target.value}))} placeholder="до 150 000 ₽" /></div>
              <div className="adm-field"><label className="adm-label">Ссылка</label>
                <input className="adm-input" value={form.link || ''} onChange={e => setForm(f => ({...f, link: e.target.value}))} placeholder="https://dobro.ru/..." /></div>
              {modal.item && <div className="adm-checkbox-row">
                <input type="checkbox" checked={form.is_active !== false} onChange={e => setForm(f => ({...f, is_active: e.target.checked}))} />
                <label>Активный конкурс</label>
              </div>}
            </>}

            <div className="adm-modal-actions">
              <button className="adm-btn adm-btn-outline" onClick={() => setModal(null)}>Отмена</button>
              <button className="adm-btn adm-btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="adm-toast">{toast}</div>}
    </>
  )
}
