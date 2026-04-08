/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadAuth } from '@/lib/auth'
import { adminApi } from '@/lib/api'
import Icon from '@/components/ui/icon'
import AdminStyles from './admin/AdminStyles'
import AdminSidebar from './admin/AdminSidebar'
import AdminTabContent from './admin/AdminTabContent'
import AdminModals from './admin/AdminModals'

type Tab = 'news' | 'events' | 'documents' | 'volunteers' | 'contests' | 'content'

export default function Admin() {
  const navigate = useNavigate()
  const [authState] = useState(() => loadAuth())
  const user = authState.user
  const [tab, setTab] = useState<Tab>('news')
  const [data, setData] = useState<Record<string, any[]>>({ news: [], events: [], documents: [], volunteers: [], contests: [] })
  const [siteContent, setSiteContent] = useState<{ key: string; label: string; value: string }[]>([])
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (user.role !== 'admin') { navigate('/cabinet'); return }
    loadTab(tab)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

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

  const canCreate = tab !== 'volunteers' && tab !== 'content'

  const TAB_TITLES: Record<Tab, string> = {
    news: 'Новости',
    events: 'Мероприятия',
    documents: 'Документы',
    volunteers: 'Волонтёры',
    contests: 'Конкурсы',
    content: 'Тексты сайта',
  }

  return (
    <>
      <AdminStyles />

      <div className="adm-wrap">
        <AdminSidebar tab={tab} setTab={setTab} />

        <main className="adm-main">
          <div className="adm-header">
            <h1 className="adm-title">{TAB_TITLES[tab]}</h1>
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

          <AdminTabContent
            tab={tab}
            data={data}
            siteContent={siteContent}
            contentEdits={contentEdits}
            setContentEdits={setContentEdits}
            loading={loading}
            openEdit={openEdit}
            setConfirmDelete={setConfirmDelete}
          />
        </main>
      </div>

      <AdminModals
        modal={modal}
        confirmDelete={confirmDelete}
        form={form}
        setForm={setForm}
        saving={saving}
        onSave={handleSave}
        onDelete={handleDelete}
        onCloseModal={() => setModal(null)}
        onCloseConfirm={() => setConfirmDelete(null)}
      />

      {toast && <div className="adm-toast">{toast}</div>}
    </>
  )
}