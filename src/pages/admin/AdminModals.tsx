/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from 'react'
import Icon from '@/components/ui/icon'

type Tab = 'news' | 'events' | 'documents' | 'volunteers' | 'contests' | 'content'

const CATEGORY_COLORS = ['#d33682', '#268bd2', '#2aa198', '#cb4b16', '#6c71c4', '#859900']

interface ModalState {
  open: boolean
  item: any
  type: Tab
}

interface ConfirmDeleteState {
  id: number
  type: Tab
  title: string
}

interface AdminModalsProps {
  modal: ModalState | null
  confirmDelete: ConfirmDeleteState | null
  form: Record<string, any>
  setForm: React.Dispatch<React.SetStateAction<Record<string, any>>>
  saving: boolean
  onSave: () => void
  onDelete: () => void
  onCloseModal: () => void
  onCloseConfirm: () => void
}

const AdminModals: React.FC<AdminModalsProps> = ({
  modal,
  confirmDelete,
  form,
  setForm,
  saving,
  onSave,
  onDelete,
  onCloseModal,
  onCloseConfirm,
}) => {
  const f = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }))

  return (
    <>
      {/* EDIT/CREATE MODAL */}
      {modal?.open && (
        <div className="adm-modal-overlay" onClick={e => e.target === e.currentTarget && onCloseModal()}>
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
                  onChange={e => f('title', e.target.value)} /></div>
              <div className="adm-field"><label className="adm-label">Текст новости</label>
                <textarea className="adm-textarea" value={form.content || ''} placeholder="Текст новости..."
                  onChange={e => f('content', e.target.value)} /></div>
              <div className="adm-field"><label className="adm-label">Категория</label>
                <input className="adm-input" value={form.category || ''} placeholder="Конкурс / Событие / Программа"
                  onChange={e => f('category', e.target.value)} /></div>
              <div className="adm-field"><label className="adm-label">Дата публикации</label>
                <input className="adm-input" type="date" value={form.published_at || form.date || ''}
                  onChange={e => f('published_at', e.target.value)} /></div>
            </>}

            {modal.type === 'events' && <>
              <div className="adm-field"><label className="adm-label">Название</label>
                <input className="adm-input" value={form.title || ''} placeholder="Название мероприятия"
                  onChange={e => f('title', e.target.value)} /></div>
              <div className="adm-field"><label className="adm-label">Описание</label>
                <textarea className="adm-textarea" value={form.description || ''} placeholder="Описание..."
                  onChange={e => f('description', e.target.value)} /></div>
              <div className="adm-field"><label className="adm-label">Дата</label>
                <input className="adm-input" type="date" value={form.event_date || ''}
                  onChange={e => f('event_date', e.target.value)} /></div>
              <div className="adm-field"><label className="adm-label">Время</label>
                <input className="adm-input" value={form.event_time || ''} placeholder="10:00"
                  onChange={e => f('event_time', e.target.value)} /></div>
              <div className="adm-field"><label className="adm-label">Место проведения</label>
                <input className="adm-input" value={form.location || ''} placeholder="Чегдомын, ДК «Горняк»"
                  onChange={e => f('location', e.target.value)} /></div>
              <div className="adm-field"><label className="adm-label">Категория</label>
                <input className="adm-input" value={form.category || ''} placeholder="Спорт / Форум / Культура..."
                  onChange={e => f('category', e.target.value)} /></div>
              <div className="adm-field"><label className="adm-label">Цвет категории</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
                  {CATEGORY_COLORS.map(c => (
                    <button key={c} onClick={() => f('category_color', c)}
                      style={{ width: 28, height: 28, borderRadius: '50%', background: c, cursor: 'pointer', border: form.category_color === c ? '3px solid #fff' : '2px solid transparent' }} />
                  ))}
                </div>
              </div>
              <div className="adm-field"><label className="adm-label">Ссылка на ДОБРО.РФ</label>
                <input className="adm-input" value={form.dobro_url || ''} placeholder="https://dobro.ru/event/..."
                  onChange={e => f('dobro_url', e.target.value)} /></div>
            </>}

            {modal.type === 'documents' && <>
              <div className="adm-field"><label className="adm-label">Название документа</label>
                <input className="adm-input" value={form.title || ''} placeholder="Название документа"
                  onChange={e => f('title', e.target.value)} /></div>
              <div className="adm-field"><label className="adm-label">Тип файла</label>
                <select className="adm-select adm-input" value={form.file_type || 'PDF'}
                  onChange={e => f('file_type', e.target.value)}>
                  <option>PDF</option><option>DOCX</option><option>XLSX</option><option>DOC</option>
                </select></div>
              <div className="adm-field"><label className="adm-label">Ссылка на файл (URL)</label>
                <input className="adm-input" value={form.file_url || ''} placeholder="https://..."
                  onChange={e => f('file_url', e.target.value)} /></div>
              <div className="adm-field"><label className="adm-label">Год</label>
                <input className="adm-input" value={form.doc_year || ''} placeholder="2025"
                  onChange={e => f('doc_year', e.target.value)} /></div>
            </>}

            {modal.type === 'volunteers' && <>
              <div style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 16, fontSize: 14 }}>
                Волонтёр: <strong style={{ color: '#fff' }}>{form.name}</strong>
              </div>
              <div className="adm-field"><label className="adm-label">Часов волонтёрства</label>
                <input className="adm-input" type="number" value={form.hours || 0}
                  onChange={e => f('hours', parseInt(e.target.value))} /></div>
              <div className="adm-field"><label className="adm-label">Место в рейтинге</label>
                <input className="adm-input" type="number" value={form.rank || ''} placeholder="1"
                  onChange={e => f('rank', parseInt(e.target.value) || null)} /></div>
              <div className="adm-field"><label className="adm-label">Значок</label>
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  {['🥇', '🥈', '🥉', '⭐', '🌟', '🏅'].map(b => (
                    <button key={b} onClick={() => f('badge', b)}
                      style={{ fontSize: 20, background: form.badge === b ? 'rgba(211,54,130,0.3)' : 'transparent', border: form.badge === b ? '1px solid #d33682' : '1px solid transparent', borderRadius: 8, padding: '4px 8px', cursor: 'pointer' }}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div className="adm-field"><label className="adm-label">О волонтёре</label>
                <textarea className="adm-textarea" value={form.bio || ''} placeholder="Краткая биография..."
                  onChange={e => f('bio', e.target.value)} /></div>
            </>}

            {modal.type === 'contests' && <>
              <div className="adm-field"><label className="adm-label">Название конкурса</label>
                <input className="adm-input" value={form.title || ''} placeholder="Название конкурса"
                  onChange={e => f('title', e.target.value)} /></div>
              <div className="adm-field"><label className="adm-label">Описание</label>
                <textarea className="adm-textarea" value={form.description || ''} placeholder="Описание конкурса..."
                  onChange={e => f('description', e.target.value)} /></div>
              <div className="adm-field"><label className="adm-label">Дедлайн</label>
                <input className="adm-input" type="date" value={form.deadline || ''}
                  onChange={e => f('deadline', e.target.value)} /></div>
              <div className="adm-field"><label className="adm-label">Приз / Вознаграждение</label>
                <input className="adm-input" value={form.prize || ''} placeholder="до 150 000 ₽"
                  onChange={e => f('prize', e.target.value)} /></div>
              <div className="adm-field"><label className="adm-label">Ссылка для подачи заявки</label>
                <input className="adm-input" value={form.link || ''} placeholder="https://dobro.ru/..."
                  onChange={e => f('link', e.target.value)} /></div>
              {modal.item && (
                <div className="adm-checkbox-row">
                  <input type="checkbox" checked={form.is_active !== false}
                    onChange={e => f('is_active', e.target.checked)} />
                  <label>Активный конкурс (показывать на сайте)</label>
                </div>
              )}
            </>}

            <div className="adm-modal-actions">
              <button className="adm-btn adm-btn-ghost" onClick={onCloseModal}>Отмена</button>
              <button className="adm-btn adm-btn-primary" onClick={onSave} disabled={saving}>
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {confirmDelete && (
        <div className="adm-modal-overlay" onClick={e => e.target === e.currentTarget && onCloseConfirm()}>
          <div className="adm-confirm-modal">
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <div className="adm-confirm-title">Удалить запись?</div>
            <div className="adm-confirm-sub">
              Вы удаляете: <span className="adm-confirm-name">«{confirmDelete.title}»</span><br />
              Это действие нельзя отменить.
            </div>
            <div className="adm-confirm-actions">
              <button className="adm-btn adm-btn-ghost" onClick={onCloseConfirm}>Отмена</button>
              <button className="adm-btn adm-btn-danger" onClick={onDelete} disabled={saving}>
                {saving ? 'Удаление...' : 'Да, удалить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminModals
