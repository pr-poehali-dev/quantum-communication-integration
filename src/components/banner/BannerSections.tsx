import type React from "react"

interface NavigatorCard {
  icon: string
  title: string
  description: string
  tag: string
  color: string
}

interface NewsItem {
  date: string
  category: string
  title: string
  desc: string
}

interface Volunteer {
  rank: number
  name: string
  hours: number
  badge: string
}

interface Event {
  date: { day: string; month: string }
  title: string
  desc: string
  location: string
  category: string
  categoryColor: string
  time: string
}

interface Document {
  title: string
  type: string
  date: string
}

interface BannerSectionsProps {
  sc: Record<string, string>
  navigatorCards: NavigatorCard[]
  newsItems: NewsItem[]
  volunteers: Volunteer[]
  events: Event[]
  documents: Document[]
}

const BannerSections: React.FC<BannerSectionsProps> = ({
  sc,
  navigatorCards,
  newsItems,
  volunteers,
  events,
  documents,
}) => {
  const facts = [
    { icon: "👥", value: sc.about_fact_1_value || "8 000+", name: sc.about_fact_1_label || "молодых людей в районе" },
    { icon: "🏅", value: sc.about_fact_2_value || "50+", name: sc.about_fact_2_label || "мероприятий в год" },
    { icon: "💰", value: sc.about_fact_3_value || "3 млн ₽", name: sc.about_fact_3_label || "грантов ежегодно" },
    { icon: "🤝", value: sc.about_fact_4_value || "20+", name: sc.about_fact_4_label || "активных объединений" },
  ]

  const maxHours = volunteers[0]?.hours || 1

  return (
    <>
      {/* ABOUT */}
      <hr className="section-divider" />
      <section id="about" className="youth-section">
        <div className="section-label">О молодёжи</div>
        <h2 className="section-title">
          {sc.about_title ? sc.about_title.replace(" района", "") : "Молодёжь — сила"}{" "}
          <span>{sc.about_title ? "района" : "района"}</span>
        </h2>
        <div className="about-grid">
          <div>
            <p className="section-desc">
              {sc.about_text_1 ||
                "Верхнебуреинский район — это место, где каждый молодой человек может реализовать свой потенциал."}
            </p>
            <p className="section-desc" style={{ marginTop: 20 }}>
              {sc.about_text_2 ||
                "Молодёжная политика района направлена на поддержку инициатив, создание рабочих мест и формирование комфортной среды для жизни и самореализации."}
            </p>
          </div>
          <div className="about-facts">
            {facts.map((f) => (
              <div className="fact-card" key={f.name}>
                <div className="fact-icon">{f.icon}</div>
                <div className="fact-value">{f.value}</div>
                <div className="fact-name">{f.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NAVIGATOR */}
      <hr className="section-divider" />
      <section id="navigator" className="youth-section">
        <div className="section-label">Навигатор возможностей</div>
        <h2 className="section-title">Твой путь <span>начинается здесь</span></h2>
        <div className="navigator-grid">
          {navigatorCards.map((card) => (
            <div className="nav-card" key={card.title}>
              <div className="nav-card-icon">{card.icon}</div>
              <span className="nav-card-tag" style={{ background: card.color }}>{card.tag}</span>
              <div className="nav-card-title">{card.title}</div>
              <div className="nav-card-desc">{card.description}</div>
              <a
                className="nav-card-btn"
                href={card.tag === "Гранты" ? "#news" : card.tag === "Карьера" ? "#events" : "#events"}
                style={{ textDecoration: "none", display: "inline-block" }}
              >
                Подробнее →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* EVENTS */}
      <hr className="section-divider" />
      <section id="events" className="youth-section events-section">
        <div className="section-label">Календарь мероприятий</div>
        <h2 className="section-title">Ближайшие <span>события</span></h2>
        <div className="events-grid">
          {events.map((event) => (
            <div className="event-card" key={event.title}>
              <div className="event-top">
                <div className="event-date-box">
                  <span className="event-date-day">{event.date.day}</span>
                  <span className="event-date-month">{event.date.month}</span>
                </div>
                <span className="event-category-tag" style={{ background: event.categoryColor }}>
                  {event.category}
                </span>
              </div>
              <div className="event-title">{event.title}</div>
              <div className="event-desc">{event.desc}</div>
              <div className="event-footer">
                <span className="event-meta-item">
                  <span className="event-meta-icon">📍</span>
                  {event.location}
                </span>
                <span className="event-meta-item">
                  <span className="event-meta-icon">🕐</span>
                  {event.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWS */}
      <hr className="section-divider" />
      <section id="news" className="youth-section">
        <div className="section-label">Новости</div>
        <h2 className="section-title">Молодёжная <span>политика</span></h2>
        <div className="news-grid">
          {newsItems.map((item) => (
            <div className="news-card" key={item.title}>
              <div className="news-meta">
                <span className="news-category">{item.category}</span>
                <span className="news-date">{item.date}</span>
              </div>
              <div className="news-title">{item.title}</div>
              <div className="news-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DOCUMENTS */}
      <hr className="section-divider" />
      <section id="documents" className="youth-section">
        <div className="section-label">Официальные документы</div>
        <h2 className="section-title">Нормативная <span>база</span></h2>
        <div className="docs-list">
          {documents.map((doc) => (
            <div className="doc-item" key={doc.title}>
              <div className="doc-icon">📄</div>
              <div className="doc-info">
                <div className="doc-title">{doc.title}</div>
                <div className="doc-meta">{doc.type} · {doc.date}</div>
              </div>
              <div className="doc-download">Скачать ↓</div>
            </div>
          ))}
        </div>
      </section>

      {/* VOLUNTEERS */}
      <hr className="section-divider" />
      <section id="volunteers" className="youth-section volunteers-section">
        <div className="section-label">Волонтёрство</div>
        <h2 className="section-title">Рейтинг <span>волонтёров</span></h2>
        <p className="section-desc">Герои нашего района — люди, которые делают мир лучше каждый день.</p>
        <div className="volunteers-table">
          <div className="vol-header">
            <span className="vol-header-cell">Место</span>
            <span className="vol-header-cell">Имя</span>
            <span className="vol-header-cell">Часов</span>
            <span className="vol-header-cell">Прогресс</span>
          </div>
          {volunteers.map((v) => (
            <div className="vol-row" key={v.rank}>
              <span className="vol-rank">{v.badge}</span>
              <span className="vol-name">{v.name}</span>
              <span className="vol-hours">{v.hours}<span>ч</span></span>
              <div className="vol-progress-bar">
                <div className="vol-progress-fill" style={{ width: `${(v.hours / maxHours) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default BannerSections
