import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth as authApi } from '@/lib/api'
import { saveAuth } from '@/lib/auth'
import Icon from '@/components/ui/icon'

export default function Login() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [form, setForm] = useState({ email: '', password: '', full_name: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      let res
      if (tab === 'login') {
        res = await authApi.login(form.email, form.password)
      } else {
        res = await authApi.register(form.email, form.password, form.full_name)
      }
      if (res.error) { setError(res.error); return }
      saveAuth(res.user, res.token)
      navigate(res.user.role === 'admin' ? '/admin' : '/cabinet')
    } catch {
      setError('Ошибка соединения с сервером')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');
        .login-page {
          min-height: 100vh;
          background: #002b36;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Montserrat", sans-serif;
          padding: 20px;
        }
        .login-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(211,54,130,0.3);
          border-radius: 24px;
          padding: 48px;
          width: 100%;
          max-width: 440px;
          backdrop-filter: blur(20px);
        }
        .login-logo {
          text-align: center;
          margin-bottom: 32px;
        }
        .login-logo-icon {
          width: 60px; height: 60px;
          background: #d33682;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; font-weight: 900; color: #002b36;
          margin: 0 auto 12px;
        }
        .login-logo h1 {
          color: #fff; font-size: 20px; font-weight: 700; margin: 0;
        }
        .login-logo p { color: rgba(255,255,255,0.5); font-size: 13px; margin: 4px 0 0; }
        .login-tabs {
          display: flex; background: rgba(0,0,0,0.2); border-radius: 12px;
          padding: 4px; margin-bottom: 28px;
        }
        .login-tab {
          flex: 1; padding: 10px; border: none; background: transparent;
          color: rgba(255,255,255,0.5); font-family: "Montserrat", sans-serif;
          font-size: 14px; font-weight: 600; cursor: pointer; border-radius: 10px;
          transition: all 0.2s;
        }
        .login-tab.active { background: #d33682; color: #fff; }
        .login-field { margin-bottom: 16px; }
        .login-label { display: block; color: rgba(255,255,255,0.7); font-size: 13px; font-weight: 600; margin-bottom: 8px; }
        .login-input {
          width: 100%; padding: 12px 16px; background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.15); border-radius: 12px;
          color: #fff; font-family: "Montserrat", sans-serif; font-size: 15px;
          outline: none; box-sizing: border-box; transition: border-color 0.2s;
        }
        .login-input:focus { border-color: #d33682; }
        .login-input::placeholder { color: rgba(255,255,255,0.3); }
        .login-btn {
          width: 100%; padding: 14px; background: #d33682; border: none;
          border-radius: 12px; color: #fff; font-family: "Montserrat", sans-serif;
          font-size: 16px; font-weight: 700; cursor: pointer; margin-top: 8px;
          transition: opacity 0.2s;
        }
        .login-btn:hover { opacity: 0.9; }
        .login-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .login-error {
          background: rgba(220,50,50,0.15); border: 1px solid rgba(220,50,50,0.4);
          border-radius: 10px; padding: 12px 16px; color: #ff6b6b;
          font-size: 14px; margin-bottom: 16px;
        }
        .login-back {
          display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.5);
          font-size: 13px; text-decoration: none; margin-bottom: 24px;
          background: none; border: none; cursor: pointer; padding: 0;
          font-family: "Montserrat", sans-serif;
        }
        .login-back:hover { color: #d33682; }
      `}</style>
      <div className="login-page">
        <div className="login-card">
          <button className="login-back" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={16} /> На главную
          </button>
          <div className="login-logo">
            <img src="https://cdn.poehali.dev/projects/2bd4f7a6-eadb-486e-a916-098fef7014b8/bucket/5be3bb63-1298-4d23-affa-f0c8facf365c.png" alt="Молодёжь ВБР" style={{ width: 160, objectFit: 'contain', filter: 'invert(1)' }} />
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, margin: '8px 0 0' }}>Личный кабинет</p>
          </div>
          <div className="login-tabs">
            <button className={`login-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>Войти</button>
            <button className={`login-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => setTab('register')}>Регистрация</button>
          </div>
          <form onSubmit={handle}>
            {error && <div className="login-error">{error}</div>}
            {tab === 'register' && (
              <div className="login-field">
                <label className="login-label">Имя и фамилия</label>
                <input className="login-input" placeholder="Иван Иванов" value={form.full_name}
                  onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} required />
              </div>
            )}
            <div className="login-field">
              <label className="login-label">Email</label>
              <input className="login-input" type="email" placeholder="you@example.com" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            </div>
            <div className="login-field">
              <label className="login-label">Пароль</label>
              <input className="login-input" type="password" placeholder="••••••••" value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
            </div>
            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? 'Загрузка...' : tab === 'login' ? 'Войти' : 'Создать аккаунт'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}