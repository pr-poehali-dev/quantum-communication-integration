/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from 'react'
import Icon from '@/components/ui/icon'

type Tab = 'news' | 'events' | 'documents' | 'volunteers' | 'contests' | 'content'

interface AdminTabContentProps {
  tab: Tab
  data: Record<string, any[]>
  siteContent: { key: string; label: string; value: string }[]
  contentEdits: Record<string, string>
  setContentEdits: React.Dispatch<React.SetStateAction<Record<string, string>>>
  loading: boolean
  openEdit: (item: any) => void
  setConfirmDelete: (v: { id: number; type: Tab; title: string } | null) => void
}

const AdminTabContent: React.FC<AdminTabContentProps> = ({
  tab,
  data,
  siteContent,
  contentEdits,
  setContentEdits,
  loading,
  openEdit,
  setConfirmDelete,
}) => {
  if (loading) return <div className="loading-spin">Загрузка...</div>

  return (
    <>
      {/* ---- CONTENT EDITOR ---- */}
      {tab === 'content' && (() => {
        const groups: Record<string, { key: string; label: string; value: string }[]> = {}
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
                  <textarea
                    className="adm-textarea"
                    style={{ height: 70 }}
                    value={contentEdits[item.key] ?? item.value}
                    onChange={e => setContentEdits(c => ({ ...c, [item.key]: e.target.value }))}
                  />
                ) : (
                  <input
                    className="adm-input"
                    value={contentEdits[item.key] ?? item.value}
                    onChange={e => setContentEdits(c => ({ ...c, [item.key]: e.target.value }))}
                  />
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
                <button
                  className="adm-btn adm-btn-sm adm-btn-danger"
                  onClick={() => setConfirmDelete({ id: item.id, type: 'news', title: item.title })}
                >
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
                <button
                  className="adm-btn adm-btn-sm adm-btn-danger"
                  onClick={() => setConfirmDelete({ id: item.id, type: 'events', title: item.title })}
                >
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
                  {item.file_url && (
                    <> · <a href={item.file_url} target="_blank" rel="noreferrer" style={{ color: '#268bd2', textDecoration: 'none' }}>Открыть файл ↗</a></>
                  )}
                </div>
              </div>
              <div className="adm-row-actions">
                <button className="adm-btn adm-btn-sm adm-btn-outline" onClick={() => openEdit(item)}>
                  <Icon name="Pencil" size={12} /> Изменить
                </button>
                <button
                  className="adm-btn adm-btn-sm adm-btn-danger"
                  onClick={() => setConfirmDelete({ id: item.id, type: 'documents', title: item.title })}
                >
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
                  {item.link && (
                    <> · <a href={item.link} target="_blank" rel="noreferrer" style={{ color: '#268bd2', textDecoration: 'none' }}>Ссылка ↗</a></>
                  )}
                </div>
              </div>
              <div className="adm-row-actions">
                <button className="adm-btn adm-btn-sm adm-btn-outline" onClick={() => openEdit(item)}>
                  <Icon name="Pencil" size={12} /> Изменить
                </button>
                <button
                  className="adm-btn adm-btn-sm adm-btn-danger"
                  onClick={() => setConfirmDelete({ id: item.id, type: 'contests', title: item.title })}
                >
                  <Icon name="Trash2" size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default AdminTabContent
