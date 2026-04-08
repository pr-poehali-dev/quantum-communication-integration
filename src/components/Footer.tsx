import { Mail, MapPin, Phone } from "lucide-react"
import { useEffect, useState } from "react"
import { publicApi } from "@/lib/api"

const aboutLinks = [
  { text: "О молодёжи", href: "#about" },
  { text: "Навигатор возможностей", href: "#navigator" },
  { text: "Новости", href: "#news" },
  { text: "Рейтинг волонтёров", href: "#volunteers" },
]

const serviceLinks = [
  { text: "Грантовые конкурсы", href: "#news" },
  { text: "Трудоустройство", href: "#events" },
  { text: "Отдых и досуг", href: "#events" },
]

const helpfulLinks = [
  { text: "Официальные документы", href: "#documents" },
  { text: "Молодёжная политика", href: "#news", hasIndicator: true },
  { text: "Мероприятия", href: "#events" },
  { text: "Волонтёры", href: "#volunteers" },
]

export default function Footer() {
   
  const [sc, setSc] = useState<Record<string, string>>({})

  useEffect(() => {
    publicApi.siteContent().then((data: Record<string, string>) => {
      if (data && !data.error) setSc(data)
    }).catch(() => {})
  }, [])

  const email = sc.contacts_email || "molodezh@vbr.ru"
  const phone = sc.contacts_phone || "+7 (42149) 2-00-00"
  const address = sc.contacts_address || "Хабаровский край, Верхнебуреинский район"
  const vkLink = sc.contacts_vk || "https://vk.com/"
  const tgLink = sc.contacts_telegram || "https://t.me/"
  const footerText = sc.footer_text || "Официальный портал молодёжной политики Верхнебуреинского муниципального района. Гранты, карьера, досуг и активная жизнь."

  return (
    <>
      <style>{`
        .ai-footer {
          background-color: #073642;
          position: relative;
          overflow: hidden;
        }
        .ai-footer::before {
          content: "";
          border-radius: 197.5px 0px;
          opacity: 0.3;
          background: #d33682;
          filter: blur(140px);
          height: 60%;
          width: 50%;
          position: absolute;
          top: 20%;
          left: -25%;
          z-index: 0;
        }
        .ai-footer::after {
          content: "";
          border-radius: 197.5px 0px;
          opacity: 0.2;
          background: #cb4b16;
          filter: blur(120px);
          height: 40%;
          width: 40%;
          position: absolute;
          bottom: 10%;
          right: -20%;
          z-index: 0;
        }
        .footer-container {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto;
          padding: 80px 30px 30px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 80px;
          margin-bottom: 60px;
        }
        .footer-brand { display: flex; flex-direction: column; }
        .brand-logo { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
        .brand-logo-img { height: 48px; object-fit: contain; }
        .brand-name { font-family: "Montserrat", sans-serif; font-weight: 700; font-size: 20px; color: #ffffff; text-transform: uppercase; }
        .brand-description { font-family: "Montserrat"; font-size: 14px; line-height: 1.8; color: #aaa; margin-bottom: 28px; max-width: 380px; }
        .social-links { display: flex; gap: 12px; }
        .social-link {
          padding: 8px 16px;
          background: rgba(211,54,130,0.1);
          border: 1px solid rgba(211,54,130,0.3);
          border-radius: 20px;
          color: #d33682;
          text-decoration: none;
          font-family: "Montserrat", sans-serif;
          font-size: 13px;
          font-weight: 700;
          transition: all 0.3s ease;
        }
        .social-link:hover { background: #d33682; color: #002b36; }
        .footer-links { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; }
        .link-column h3 {
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 14px;
          color: #d33682;
          text-transform: uppercase;
          margin: 0 0 20px;
          letter-spacing: 1px;
        }
        .link-list { list-style: none; padding: 0; margin: 0; }
        .link-item { margin-bottom: 12px; }
        .link-item a {
          font-family: "Montserrat";
          font-size: 13px;
          color: #aaa;
          text-decoration: none;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .link-item a:hover { color: #ffffff; }
        .contact-item { display: flex; align-items: flex-start; gap: 10px; }
        .contact-icon { color: #d33682; flex-shrink: 0; margin-top: 2px; }
        .live-indicator { position: relative; display: inline-flex; align-items: center; gap: 8px; }
        .pulse-dot { position: relative; width: 8px; height: 8px; flex-shrink: 0; }
        .pulse-dot::before { content: ""; position: absolute; width: 100%; height: 100%; background: #d33682; border-radius: 50%; animation: pulse 2s infinite; }
        .pulse-dot::after { content: ""; position: absolute; width: 100%; height: 100%; background: #d33682; border-radius: 50%; }
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(211,54,130,0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(211,54,130,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(211,54,130,0); }
        }
        .footer-bottom { border-top: 1px solid #333; padding-top: 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
        .copyright { font-family: "Montserrat"; font-size: 13px; color: #aaa; }
        .footer-legal { display: flex; gap: 24px; }
        .footer-legal a { font-family: "Montserrat"; font-size: 13px; color: #aaa; text-decoration: none; transition: color 0.3s ease; }
        .footer-legal a:hover { color: #fff; }
        @media screen and (max-width: 1199px) {
          .footer-container { padding: 60px 20px 20px; }
          .footer-grid { gap: 40px; }
          .footer-links { grid-template-columns: repeat(2, 1fr); }
        }
        @media screen and (max-width: 767px) {
          .footer-grid { grid-template-columns: 1fr; gap: 40px; }
          .footer-links { grid-template-columns: 1fr 1fr; gap: 24px; }
          .footer-bottom { flex-direction: column; text-align: center; gap: 12px; }
        }
      `}</style>

      <footer className="ai-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="brand-logo">
                <img
                  src="https://cdn.poehali.dev/projects/2bd4f7a6-eadb-486e-a916-098fef7014b8/bucket/5be3bb63-1298-4d23-affa-f0c8facf365c.png"
                  alt="Молодёжь ВБР"
                  className="brand-logo-img"
                />
                <span className="brand-name">Молодёжь ВБР</span>
              </div>
              <p className="brand-description">{footerText}</p>
              <div className="social-links">
                <a href={vkLink} className="social-link" target="_blank" rel="noreferrer">ВКонтакте</a>
                <a href={tgLink} className="social-link" target="_blank" rel="noreferrer">Telegram</a>
              </div>
            </div>

            <div className="footer-links">
              <div className="link-column">
                <h3>Навигация</h3>
                <ul className="link-list">
                  {aboutLinks.map(({ text, href }) => (
                    <li key={text} className="link-item"><a href={href}>{text}</a></li>
                  ))}
                </ul>
              </div>

              <div className="link-column">
                <h3>Возможности</h3>
                <ul className="link-list">
                  {serviceLinks.map(({ text, href }) => (
                    <li key={text} className="link-item"><a href={href}>{text}</a></li>
                  ))}
                </ul>
              </div>

              <div className="link-column">
                <h3>Документы</h3>
                <ul className="link-list">
                  {helpfulLinks.map(({ text, href, hasIndicator }) => (
                    <li key={text} className="link-item">
                      <a href={href}>
                        {hasIndicator ? (
                          <span className="live-indicator">{text}<span className="pulse-dot" /></span>
                        ) : text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="link-column">
                <h3>Контакты</h3>
                <ul className="link-list">
                  <li className="link-item">
                    <a href={`mailto:${email}`} className="contact-item">
                      <Mail className="contact-icon" size={16} /><span>{email}</span>
                    </a>
                  </li>
                  <li className="link-item">
                    <a href={`tel:${phone.replace(/\D/g, '')}`} className="contact-item">
                      <Phone className="contact-icon" size={16} /><span>{phone}</span>
                    </a>
                  </li>
                  <li className="link-item">
                    <a href="#" className="contact-item">
                      <MapPin className="contact-icon" size={16} /><span>{address}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright">© 2026 Молодёжь Верхнебуреинского района</p>
            <div className="footer-legal">
              <a href="#documents">Документы</a>
              <a href="/login">Личный кабинет</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
