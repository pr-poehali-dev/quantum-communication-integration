/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadAuth, clearAuth } from '@/lib/auth'
import { volunteerApi, publicApi } from '@/lib/api'
import Icon from '@/components/ui/icon'

type Tab = 'dashboard' | 'rating' | 'events' | 'contests' | 'profile'

export default function Cabinet() {
  const navigate = useNavigate()
  const { user } = loadAuth()
  const [tab, setTab] = useState<Tab>('dashboard')
  const [profile, setProfile] = useState<any>(null)
  const [rating, setRating] = useState<any[]>([])
  const [myEvents, setMyEvents] = useState<any[]>([])
  const [allEvents, setAllEvents] = useState<any[]>([])
  const [contests, setContests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [dobro, setDobro] = useState('')
  const [bio, setBio] = useState('')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (user.role === 'admin') { navigate('/admin'); return }
    loadAll()
  }, [])

  const loadAll = async () => {
    if (!user) return
    setLoading(true)
    const [prof, rat, me, ev, con] = await Promise.all([
      volunteerApi.profile(user.id),
      volunteerApi.rating(user.id),
      volunteerApi.myEvents(user.id),
      publicApi.events(),
      volunteerApi.contests(user.id),
    ])
    setProfile(prof)
    setRating(Array.isArray(rat) ? rat : [])
    setMyEvents(Array.isArray(me) ? me : [])
    setAllEvents(Array.isArray(ev) ? ev : [])
    setContests(Array.isArray(con) ? con : [])
    setDobro(prof?.dobro_profile_url || '')
    setBio(prof?.bio || '')
    setLoading(false)
  }

  const handleRegisterEvent = async (eventId: number) => {
    if (!user) return
    await volunteerApi.registerEvent(user.id, eventId)
    showToast('Вы записались на мероприятие!')
    const me = await volunteerApi.myEvents(user.id)
    setMyEvents(Array.isArray(me) ? me : [])
  }

  const handleSaveProfile = async () => {
    if (!user) return
    setSaving(true)
    await volunteerApi.updateProfile(user.id, { dobro_profile_url: dobro, bio })
    setSaving(false)
    showToast('Профиль сохранён!')
  }

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const logout = () => { clearAuth(); navigate('/') }

  const myEventIds = new Set(myEvents.map((e: any) => e.id))
  const myRank = rating.find((r: any) => r.is_me)

  const navItems: { key: Tab; icon: string; label: string }[] = [
    { key: 'dashboard', icon: 'LayoutDashboard', label: 'Главная' },
    { key: 'rating', icon: 'Trophy', label: 'Рейтинг' },
    { key: 'events', icon: 'Calendar', label: 'Мероприятия' },
    { key: 'contests', icon: 'Award', label: 'Конкурсы' },
    { key: 'profile', icon: 'User', label: 'Профиль' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');
        .cab-wrap { display:flex; min-height:100vh; background:#002b36; font-family:"Montserrat",sans-serif; }
        .cab-sidebar {
          width:240px; flex-shrink:0; background:rgba(0,0,0,0.3);
          border-right:1px solid rgba(255,255,255,0.08);
          display:flex; flex-direction:column; padding:28px 0;
        }
        .cab-logo { padding:0 24px 28px; border-bottom:1px solid rgba(255,255,255,0.08); }
        .cab-logo-icon { width:44px;height:44px;background:#d33682;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;color:#002b36;margin-bottom:8px; }
        .cab-logo h2 { color:#fff;font-size:15px;font-weight:700;margin:0; }
        .cab-logo p { color:rgba(255,255,255,0.4);font-size:11px;margin:2px 0 0; }
        .cab-nav { flex:1; padding:16px 12px; }
        .cab-nav-item {
          display:flex;align-items:center;gap:10px;padding:11px 12px;border-radius:12px;
          color:rgba(255,255,255,0.55);font-size:14px;font-weight:600;cursor:pointer;
          transition:all 0.2s;margin-bottom:4px;border:none;background:none;width:100%;text-align:left;
        }
        .cab-nav-item:hover { background:rgba(255,255,255,0.06);color:#fff; }
        .cab-nav-item.active { background:rgba(211,54,130,0.2);color:#d33682; }
        .cab-logout { padding:0 12px 12px; }
        .cab-logout-btn {
          display:flex;align-items:center;gap:10px;padding:11px 12px;border-radius:12px;
          color:rgba(255,255,255,0.4);font-size:14px;font-weight:600;cursor:pointer;
          background:none;border:none;width:100%;transition:all 0.2s;
        }
        .cab-logout-btn:hover { color:#ff6b6b; }
        .cab-main { flex:1;overflow-y:auto;padding:40px; }
        .cab-title { color:#fff;font-size:28px;font-weight:900;margin:0 0 8px; }
        .cab-subtitle { color:rgba(255,255,255,0.5);font-size:14px;margin:0 0 32px; }
        .cab-cards { display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:32px; }
        .cab-card {
          background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);
          border-radius:18px;padding:24px;
        }
        .cab-card-icon { font-size:28px;margin-bottom:8px; }
        .cab-card-value { color:#d33682;font-size:32px;font-weight:900;line-height:1; }
        .cab-card-label { color:rgba(255,255,255,0.5);font-size:12px;margin-top:4px;text-transform:uppercase;letter-spacing:1px; }
        .cab-section-title { color:#fff;font-size:18px;font-weight:700;margin:0 0 16px; }
        .cab-table { background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden; }
        .cab-table-row {
          display:grid;align-items:center;padding:16px 20px;
          border-bottom:1px solid rgba(255,255,255,0.06);transition:background 0.2s;
        }
        .cab-table-row:last-child{border-bottom:none;}
        .cab-table-row:hover{background:rgba(255,255,255,0.03);}
        .cab-table-row.me{background:rgba(211,54,130,0.08);border-color:rgba(211,54,130,0.2);}
        .vol-row-3 { grid-template-columns:60px 1fr 120px; }
        .vol-badge { font-size:24px; }
        .vol-name { color:#fff;font-weight:600;font-size:15px; }
        .vol-name-sub { color:rgba(255,255,255,0.4);font-size:12px; }
        .vol-hours { color:#d33682;font-weight:700;font-size:17px; }
        .vol-hours span { color:rgba(255,255,255,0.4);font-size:12px;font-weight:400;margin-left:3px; }
        .event-item { display:flex;align-items:flex-start;gap:16px;padding:18px 20px;border-bottom:1px solid rgba(255,255,255,0.06); }
        .event-item:last-child{border-bottom:none;}
        .event-date-box { min-width:52px;height:52px;background:rgba(211,54,130,0.15);border:1px solid rgba(211,54,130,0.3);border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0; }
        .event-date-day{color:#d33682;font-weight:900;font-size:18px;line-height:1;}
        .event-date-month{color:rgba(255,255,255,0.5);font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;}
        .event-info{flex:1;}
        .event-title-sm{color:#fff;font-weight:700;font-size:15px;margin-bottom:4px;}
        .event-meta-sm{color:rgba(255,255,255,0.45);font-size:12px;}
        .event-cat-tag{display:inline-block;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700;text-transform:uppercase;color:#002b36;margin-right:8px;}
        .cab-btn {
          padding:9px 18px;border-radius:10px;border:none;cursor:pointer;
          font-family:"Montserrat",sans-serif;font-size:13px;font-weight:700;transition:all 0.2s;
        }
        .cab-btn-primary{background:#d33682;color:#fff;}
        .cab-btn-primary:hover{opacity:0.85;}
        .cab-btn-outline{background:transparent;border:1px solid rgba(211,54,130,0.5);color:#d33682;}
        .cab-btn-outline:hover{background:rgba(211,54,130,0.1);}
        .cab-btn-green{background:#2aa198;color:#fff;}
        .cab-btn-green:hover{opacity:0.85;}
        .contest-item{padding:20px;border-bottom:1px solid rgba(255,255,255,0.06);}
        .contest-item:last-child{border-bottom:none;}
        .contest-title{color:#fff;font-weight:700;font-size:16px;margin-bottom:6px;}
        .contest-desc{color:rgba(255,255,255,0.55);font-size:13px;line-height:1.7;margin-bottom:10px;}
        .contest-meta{display:flex;gap:16px;align-items:center;flex-wrap:wrap;}
        .contest-prize{color:#d33682;font-weight:700;font-size:14px;}
        .contest-deadline{color:rgba(255,255,255,0.4);font-size:12px;}
        .cab-form-field{margin-bottom:16px;}
        .cab-form-label{display:block;color:rgba(255,255,255,0.7);font-size:13px;font-weight:600;margin-bottom:8px;}
        .cab-form-input,.cab-form-textarea{
          width:100%;padding:12px 14px;background:rgba(255,255,255,0.07);
          border:1px solid rgba(255,255,255,0.15);border-radius:10px;
          color:#fff;font-family:"Montserrat",sans-serif;font-size:14px;
          outline:none;box-sizing:border-box;transition:border-color 0.2s;
        }
        .cab-form-textarea{height:80px;resize:vertical;}
        .cab-form-input:focus,.cab-form-textarea:focus{border-color:#d33682;}
        .cab-form-input::placeholder,.cab-form-textarea::placeholder{color:rgba(255,255,255,0.3);}
        .cab-profile-header{display:flex;align-items:center;gap:20px;margin-bottom:28px;}
        .cab-avatar{width:64px;height:64px;background:#d33682;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:900;color:#002b36;flex-shrink:0;}
        .cab-profile-name{color:#fff;font-size:22px;font-weight:900;}
        .cab-profile-email{color:rgba(255,255,255,0.5);font-size:13px;margin-top:2px;}
        .cab-toast{
          position:fixed;bottom:24px;right:24px;background:#2aa198;color:#fff;
          padding:12px 20px;border-radius:12px;font-weight:600;font-size:14px;
          z-index:999;animation:slideIn 0.3s ease;
        }
        @keyframes slideIn{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
        .dobro-link{display:inline-flex;align-items:center;gap:6px;color:#268bd2;font-size:13px;text-decoration:none;font-weight:600;}
        .dobro-link:hover{text-decoration:underline;}
        .loading-spin{color:rgba(255,255,255,0.4);font-size:16px;text-align:center;padding:60px;}
        @media(max-width:768px){
          .cab-sidebar{display:none;}
          .cab-main{padding:24px 16px;}
          .cab-cards{grid-template-columns:1fr 1fr;}
        }
      `}</style>

      <div className="cab-wrap">
        <aside className="cab-sidebar">
          <div className="cab-logo">
            <div className="cab-logo-icon">МВ</div>
            <h2>Молодёжь ВБР</h2>
            <p>Кабинет волонтёра</p>
          </div>
          <nav className="cab-nav">
            {navItems.map(item => (
              <button key={item.key} className={`cab-nav-item ${tab === item.key ? 'active' : ''}`}
                onClick={() => setTab(item.key)}>
                <Icon name={item.icon} size={18} />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="cab-logout">
            <button className="cab-logout-btn" onClick={logout}>
              <Icon name="LogOut" size={18} /> Выйти
            </button>
          </div>
        </aside>

        <main className="cab-main">
          {loading ? <div className="loading-spin">Загрузка...</div> : <>

            {tab === 'dashboard' && (
              <>
                <h1 className="cab-title">Привет, {user?.full_name?.split(' ')[0]}! 👋</h1>
                <p className="cab-subtitle">Добро пожаловать в личный кабинет волонтёра</p>
                <div className="cab-cards">
                  <div className="cab-card">
                    <div className="cab-card-icon">⏱️</div>
                    <div className="cab-card-value">{profile?.hours || 0}</div>
                    <div className="cab-card-label">Часов волонтёрства</div>
                  </div>
                  <div className="cab-card">
                    <div className="cab-card-icon">{myRank?.badge || '⭐'}</div>
                    <div className="cab-card-value">{myRank ? `#${myRank.rank || '—'}` : '—'}</div>
                    <div className="cab-card-label">Место в рейтинге</div>
                  </div>
                  <div className="cab-card">
                    <div className="cab-card-icon">📅</div>
                    <div className="cab-card-value">{myEvents.length}</div>
                    <div className="cab-card-label">Мероприятий</div>
                  </div>
                </div>
                <p className="cab-section-title">Ближайшие мероприятия</p>
                <div className="cab-table">
                  {allEvents.slice(0, 3).map((ev: any) => {
                    const d = new Date(ev.event_date)
                    return (
                      <div className="event-item" key={ev.id}>
                        <div className="event-date-box">
                          <span className="event-date-day">{d.getDate()}</span>
                          <span className="event-date-month">{d.toLocaleString('ru', { month: 'short' })}</span>
                        </div>
                        <div className="event-info">
                          <div className="event-title-sm">{ev.title}</div>
                          <div className="event-meta-sm">📍 {ev.location} · 🕐 {ev.event_time}</div>
                        </div>
                        {!myEventIds.has(ev.id) && (
                          <button className="cab-btn cab-btn-primary" onClick={() => handleRegisterEvent(ev.id)}>
                            Записаться
                          </button>
                        )}
                        {myEventIds.has(ev.id) && (
                          <span style={{ color: '#2aa198', fontSize: 13, fontWeight: 700 }}>✓ Записан</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </>
            )}

            {tab === 'rating' && (
              <>
                <h1 className="cab-title">Рейтинг волонтёров</h1>
                <p className="cab-subtitle">Твоя позиция среди {rating.length} волонтёров района</p>
                <div className="cab-table">
                  {rating.map((v: any, i: number) => (
                    <div key={v.id} className={`cab-table-row vol-row-3 ${v.is_me ? 'me' : ''}`}>
                      <span className="vol-badge">{v.badge}</span>
                      <div>
                        <div className="vol-name">{v.name} {v.is_me && <span style={{ color: '#d33682', fontSize: 12 }}>(вы)</span>}</div>
                        <div className="vol-name-sub">Место #{i + 1}</div>
                      </div>
                      <span className="vol-hours">{v.hours}<span>ч</span></span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {tab === 'events' && (
              <>
                <h1 className="cab-title">Мероприятия</h1>
                <p className="cab-subtitle">Записывайтесь на события и подавайте заявки через ДОБРО.РФ</p>
                <p className="cab-section-title" style={{ marginBottom: 12 }}>Все мероприятия района</p>
                <div className="cab-table" style={{ marginBottom: 28 }}>
                  {allEvents.map((ev: any) => {
                    const d = new Date(ev.event_date)
                    const registered = myEventIds.has(ev.id)
                    return (
                      <div className="event-item" key={ev.id}>
                        <div className="event-date-box">
                          <span className="event-date-day">{d.getDate()}</span>
                          <span className="event-date-month">{d.toLocaleString('ru', { month: 'short' })}</span>
                        </div>
                        <div className="event-info">
                          <div style={{ marginBottom: 4 }}>
                            <span className="event-cat-tag" style={{ background: ev.category_color }}>{ev.category}</span>
                          </div>
                          <div className="event-title-sm">{ev.title}</div>
                          <div className="event-meta-sm">📍 {ev.location} · 🕐 {ev.event_time}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
                          {registered ? (
                            <span style={{ color: '#2aa198', fontSize: 13, fontWeight: 700 }}>✓ Записан</span>
                          ) : (
                            <button className="cab-btn cab-btn-primary" onClick={() => handleRegisterEvent(ev.id)}>
                              Записаться
                            </button>
                          )}
                          {ev.dobro_url && (
                            <a className="dobro-link" href={ev.dobro_url} target="_blank" rel="noreferrer">
                              <Icon name="ExternalLink" size={12} /> ДОБРО.РФ
                            </a>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
                {myEvents.length > 0 && (
                  <>
                    <p className="cab-section-title">Мои мероприятия</p>
                    <div className="cab-table">
                      {myEvents.map((ev: any) => {
                        const d = new Date(ev.event_date)
                        return (
                          <div className="event-item" key={ev.id}>
                            <div className="event-date-box">
                              <span className="event-date-day">{d.getDate()}</span>
                              <span className="event-date-month">{d.toLocaleString('ru', { month: 'short' })}</span>
                            </div>
                            <div className="event-info">
                              <div className="event-title-sm">{ev.title}</div>
                              <div className="event-meta-sm">📍 {ev.location}</div>
                            </div>
                            <span style={{ color: '#2aa198', fontSize: 13, fontWeight: 700 }}>✓ Записан</span>
                          </div>
                        )
                      })}
                    </div>
                  </>
                )}
              </>
            )}

            {tab === 'contests' && (
              <>
                <h1 className="cab-title">Конкурсы и гранты</h1>
                <p className="cab-subtitle">Актуальные возможности для волонтёров района</p>
                <div className="cab-table">
                  {contests.map((c: any) => (
                    <div className="contest-item" key={c.id}>
                      <div className="contest-title">{c.title}</div>
                      <div className="contest-desc">{c.description}</div>
                      <div className="contest-meta">
                        <span className="contest-prize">🏆 {c.prize}</span>
                        {c.deadline && <span className="contest-deadline">До {new Date(c.deadline).toLocaleDateString('ru')}</span>}
                        {c.link && (
                          <a href={c.link} target="_blank" rel="noreferrer" className="cab-btn cab-btn-outline" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                            <Icon name="ExternalLink" size={12} /> Подать заявку
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {tab === 'profile' && (
              <>
                <h1 className="cab-title">Мой профиль</h1>
                <p className="cab-subtitle">Настройте свою информацию</p>
                <div className="cab-card" style={{ maxWidth: 560, marginBottom: 24 }}>
                  <div className="cab-profile-header">
                    <div className="cab-avatar">{user?.full_name?.[0] || '?'}</div>
                    <div>
                      <div className="cab-profile-name">{user?.full_name}</div>
                      <div className="cab-profile-email">{user?.email}</div>
                    </div>
                  </div>
                  <div className="cab-form-field">
                    <label className="cab-form-label">Ссылка на профиль ДОБРО.РФ</label>
                    <input className="cab-form-input" placeholder="https://dobro.ru/volunteer/..." value={dobro}
                      onChange={e => setDobro(e.target.value)} />
                  </div>
                  <div className="cab-form-field">
                    <label className="cab-form-label">О себе</label>
                    <textarea className="cab-form-textarea" placeholder="Расскажите о своей волонтёрской деятельности..."
                      value={bio} onChange={e => setBio(e.target.value)} />
                  </div>
                  <button className="cab-btn cab-btn-primary" onClick={handleSaveProfile} disabled={saving}>
                    {saving ? 'Сохранение...' : 'Сохранить'}
                  </button>
                </div>
              </>
            )}
          </>}
        </main>
      </div>

      {toast && <div className="cab-toast">{toast}</div>}
    </>
  )
}