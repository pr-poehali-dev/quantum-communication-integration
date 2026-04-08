import type React from 'react'
import { useNavigate } from 'react-router-dom'
import { clearAuth } from '@/lib/auth'
import Icon from '@/components/ui/icon'

type Tab = 'news' | 'events' | 'documents' | 'volunteers' | 'contests' | 'content'

const LOGO = 'https://cdn.poehali.dev/projects/2bd4f7a6-eadb-486e-a916-098fef7014b8/bucket/5be3bb63-1298-4d23-affa-f0c8facf365c.png'

const navItems: { key: Tab; icon: string; label: string }[] = [
  { key: 'news', icon: 'Newspaper', label: 'Новости' },
  { key: 'events', icon: 'Calendar', label: 'Мероприятия' },
  { key: 'documents', icon: 'FileText', label: 'Документы' },
  { key: 'volunteers', icon: 'Users', label: 'Волонтёры' },
  { key: 'contests', icon: 'Award', label: 'Конкурсы' },
  { key: 'content', icon: 'PenLine', label: 'Тексты сайта' },
]

interface AdminSidebarProps {
  tab: Tab
  setTab: (t: Tab) => void
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ tab, setTab }) => {
  const navigate = useNavigate()
  const logout = () => { clearAuth(); navigate('/') }

  return (
    <aside className="adm-sidebar">
      <div className="adm-logo">
        <img src={LOGO} alt="Молодёжь ВБР" />
        <h2>Молодёжь ВБР</h2>
        <p>Панель администратора</p>
      </div>
      <nav className="adm-nav">
        {navItems.map(item => (
          <button
            key={item.key}
            className={`adm-nav-item ${tab === item.key ? 'active' : ''}`}
            onClick={() => setTab(item.key)}
          >
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
  )
}

export default AdminSidebar
