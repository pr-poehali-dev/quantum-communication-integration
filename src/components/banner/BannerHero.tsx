import type React from "react"
import { useNavigate } from "react-router-dom"
import { loadAuth } from "@/lib/auth"

interface NavLink {
  label: string
  href: string
}

interface Particle {
  id: number
  size: number
  left: number
  duration: number
  delay: number
}

interface Stat {
  value: string
  label: string
}

interface BannerHeroProps {
  navLinks: NavLink[]
  particles: Particle[]
  currentText: string
  sc: Record<string, string>
  stats: Stat[]
}

const BannerHero: React.FC<BannerHeroProps> = ({ navLinks, particles, currentText, sc, stats }) => {
  const navigate = useNavigate()
  const { user } = loadAuth()

  return (
    <>
      {/* NAV */}
      <nav className="youth-nav">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="https://cdn.poehali.dev/projects/2bd4f7a6-eadb-486e-a916-098fef7014b8/bucket/5be3bb63-1298-4d23-affa-f0c8facf365c.png"
            alt="Молодёжь ВБР"
            style={{ height: 40, objectFit: "contain" }}
          />
          <div className="nav-logo">Молодёжь <span>ВБР</span></div>
        </div>
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <button
          className="nav-login-btn"
          onClick={() => navigate(user?.role === "admin" ? "/admin" : "/login")}
        >
          {user?.role === "admin" ? "Панель управления" : "Войти"}
        </button>
      </nav>

      {/* HERO */}
      <section className="info-section">
        <div className="particles-container">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.left}%`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="left-part">
          <h1>
            <span>{sc.hero_title_1 || "НАЙДИ"}</span>
            <span>{sc.hero_title_2 || "СВОЁ"}</span>
            <span className="text d-flex">
              {currentText.split("").map((char, i) => (
                <span key={i} className="char">{char}</span>
              ))}
              <span style={{ color: "#d33682", opacity: 0.7, marginLeft: 2 }}>|</span>
            </span>
          </h1>
          <p>
            {sc.hero_description ||
              "Портал возможностей для молодёжи Верхнебуреинского муниципального района — гранты, карьера, отдых и всё, что нужно для яркой жизни рядом с домом."}
          </p>
          <div className="hero-badges">
            <span className="hero-badge">🏆 Гранты и конкурсы</span>
            <span className="hero-badge">💼 Трудоустройство</span>
            <span className="hero-badge">🎯 Досуг</span>
          </div>
          <a className="book-link" href={sc.hero_btn_link || "#navigator"}>
            <span className="linktext">{sc.hero_btn_text || "Исследовать"}</span>
            <span className="arrow"><span /></span>
          </a>
        </div>

        <div className="hero-stats">
          {stats.map((s) => (
            <div className="stat-card" key={s.label}>
              <div className="stat-number">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default BannerHero