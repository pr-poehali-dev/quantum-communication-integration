import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { loadAuth } from "@/lib/auth"

const PhotographyBanner: React.FC = () => {
  const navigate = useNavigate()
  const { user } = loadAuth()
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const texts = ["ГРАНТЫ.", "КАРЬЕРУ.", "ОТДЫХ.", "БУДУЩЕЕ."]

  useEffect(() => {
    const typeSpeed = isDeleting ? 40 : 100
    const currentFullText = texts[currentIndex]

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.substring(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length)
        }
      }
    }, typeSpeed)

    return () => clearTimeout(timer)
  }, [currentText, currentIndex, isDeleting, texts])

  const navLinks = [
    { label: "О молодёжи", href: "#about" },
    { label: "Навигатор", href: "#navigator" },
    { label: "События", href: "#events" },
    { label: "Документы", href: "#documents" },
    { label: "Новости", href: "#news" },
    { label: "Волонтёры", href: "#volunteers" },
  ]

  const navigatorCards = [
    {
      icon: "🏆",
      title: "Грантовые конкурсы",
      description: "Финансирование твоих идей и проектов. Найди подходящий конкурс и выиграй грант на реализацию мечты.",
      tag: "Гранты",
      color: "#d33682",
    },
    {
      icon: "💼",
      title: "Трудоустройство",
      description: "Вакансии, стажировки и первая работа в Верхнебуреинском районе. Строй карьеру рядом с домом.",
      tag: "Карьера",
      color: "#268bd2",
    },
    {
      icon: "🎯",
      title: "Отдых и досуг",
      description: "Спорт, творчество, путешествия и активный отдых для молодёжи района. Жизнь ярче вместе!",
      tag: "Досуг",
      color: "#2aa198",
    },
  ]

  const newsItems = [
    {
      date: "05 апр 2026",
      category: "Конкурс",
      title: "Открыт приём заявок на грантовый конкурс «Молодёжь района»",
      desc: "До 30 апреля принимаются заявки от молодёжных объединений на получение грантов.",
    },
    {
      date: "01 апр 2026",
      category: "Событие",
      title: "Форум молодёжных инициатив в Чегдомыне",
      desc: "Собери команду и представь свой проект на районном форуме молодёжных инициатив.",
    },
    {
      date: "28 мар 2026",
      category: "Программа",
      title: "Новые вакансии для молодых специалистов",
      desc: "Работодатели района приглашают молодых специалистов в сфере IT, медицины и образования.",
    },
  ]

  const volunteers = [
    { rank: 1, name: "Анна Соколова", hours: 312, badge: "🥇" },
    { rank: 2, name: "Дмитрий Петров", hours: 278, badge: "🥈" },
    { rank: 3, name: "Мария Иванова", hours: 245, badge: "🥉" },
    { rank: 4, name: "Алексей Краснов", hours: 198, badge: "⭐" },
    { rank: 5, name: "Екатерина Лебедь", hours: 176, badge: "⭐" },
  ]

  const events = [
    {
      date: { day: "19", month: "АПР" },
      title: "Форум молодёжных инициатив",
      desc: "Районный форум для активной молодёжи. Презентации проектов, нетворкинг, мастер-классы от экспертов.",
      location: "Чегдомын, ДК «Горняк»",
      category: "Форум",
      categoryColor: "#d33682",
      time: "10:00",
    },
    {
      date: { day: "25", month: "АПР" },
      title: "Открытый чемпионат по волейболу",
      desc: "Соревнования среди молодёжных команд поселений Верхнебуреинского района. Регистрация команд до 20 апреля.",
      location: "Чегдомын, спорткомплекс",
      category: "Спорт",
      categoryColor: "#268bd2",
      time: "12:00",
    },
    {
      date: { day: "01", month: "МАЙ" },
      title: "Субботник «Чистый район»",
      desc: "Волонтёрская акция по уборке и благоустройству территорий. Все желающие приглашаются!",
      location: "Все поселения района",
      category: "Волонтёрство",
      categoryColor: "#2aa198",
      time: "09:00",
    },
    {
      date: { day: "15", month: "МАЙ" },
      title: "День молодёжного предпринимательства",
      desc: "Встреча молодых предпринимателей, презентации стартапов и консультации по грантовой поддержке.",
      location: "Чегдомын, Администрация района",
      category: "Бизнес",
      categoryColor: "#cb4b16",
      time: "14:00",
    },
    {
      date: { day: "22", month: "МАЙ" },
      title: "Творческий фестиваль «Мы — район»",
      desc: "Конкурс талантов, музыкальные выступления и арт-инсталляции от молодых творцов района.",
      location: "Чегдомын, городская площадь",
      category: "Культура",
      categoryColor: "#6c71c4",
      time: "16:00",
    },
    {
      date: { day: "05", month: "ИЮН" },
      title: "Слёт студентов и выпускников",
      desc: "Ежегодная встреча студентов и выпускников, уехавших на учёбу. Истории успеха и возможности вернуться.",
      location: "Чегдомын, парк «Юность»",
      category: "Образование",
      categoryColor: "#859900",
      time: "11:00",
    },
  ]

  const documents = [
    { title: "Стратегия молодёжной политики района до 2030 года", type: "PDF", date: "2024" },
    { title: "Положение о молодёжном совете", type: "DOCX", date: "2024" },
    { title: "Программа «Активная молодёжь» на 2025–2027 гг.", type: "PDF", date: "2025" },
    { title: "Порядок проведения грантовых конкурсов", type: "PDF", date: "2025" },
  ]

  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    left: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700;900&family=Inter:wght@400;500&display=swap');

        .photography-banner,
        .photography-banner * {
          box-sizing: border-box;
        }

        .photography-banner {
          margin: 0;
          background-color: #002b36;
          background-image: url("https://www.yudiz.com/codepen/photography-banner/frame.png");
          background-size: cover;
          background-repeat: no-repeat;
          overflow-x: hidden;
          width: 100%;
        }

        /* ---- NAV ---- */
        .youth-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 40px;
          background: rgba(0,43,54,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(211,54,130,0.2);
        }

        .nav-logo {
          font-family: "Montserrat", sans-serif;
          font-weight: 900;
          font-size: 18px;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .nav-logo span {
          color: #d33682;
        }

        .nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-links a {
          font-family: "Montserrat", sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          font-weight: 500;
          letter-spacing: 0.5px;
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: #d33682;
        }

        .nav-login-btn {
          padding: 8px 20px;
          background: #d33682;
          border: none;
          border-radius: 20px;
          color: #fff;
          font-family: "Montserrat", sans-serif;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s;
          text-decoration: none;
          display: inline-block;
        }

        .nav-login-btn:hover { opacity: 0.85; }

        /* ---- HERO ---- */
        .info-section {
          height: 100vh;
          min-height: 780px;
          padding: 0 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 1;
          user-select: none;
          overflow: hidden;
        }

        .info-section::before {
          content: "";
          border-radius: 197.5px 0px;
          opacity: 0.4;
          background: #d33682;
          filter: blur(162px);
          height: 35%;
          width: 55%;
          position: absolute;
          top: -40%;
          left: -66%;
          transform: translate(50%, 50%);
          z-index: -1;
        }

        .left-part {
          padding: 20px 0 0;
          overflow: hidden;
          max-width: 60%;
        }

        .left-part h1 {
          margin: 0;
          color: #fff;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: clamp(36px, 8vw, 110px);
          line-height: 0.85;
          font-style: normal;
          text-transform: uppercase;
        }

        .left-part h1 .text {
          color: #d33682;
          display: block;
          height: clamp(80px, 10vw, 120px);
        }

        .left-part h1 .d-flex {
          display: flex;
          align-items: center;
        }

        .left-part h1 .char {
          transform: translateY(0);
          transition: transform 0.5s;
          animation: slideUp 0.3s ease-out forwards;
        }

        @keyframes slideUp {
          from { transform: translateY(-515px); }
          to { transform: translateY(0); }
        }

        .left-part p {
          width: 80%;
          margin: 24px 0 0;
          color: #fff;
          font-size: 16px;
          font-style: normal;
          font-weight: normal;
          line-height: 2;
          font-family: "Montserrat";
          opacity: 0.8;
        }

        .hero-badges {
          display: flex;
          gap: 12px;
          margin-top: 32px;
          flex-wrap: wrap;
        }

        .hero-badge {
          padding: 8px 18px;
          border-radius: 30px;
          border: 1px solid rgba(211,54,130,0.5);
          color: rgba(255,255,255,0.8);
          font-family: "Montserrat", sans-serif;
          font-size: 13px;
          font-weight: 500;
          background: rgba(211,54,130,0.1);
        }

        .book-link {
          margin: 40px 0 0;
          padding: 0;
          border: 0;
          font-size: clamp(32px, 5vw, 56px);
          line-height: 1;
          color: #f1f1f1;
          letter-spacing: 0.25px;
          text-transform: uppercase;
          font-family: "Montserrat";
          font-weight: 300;
          font-style: normal;
          display: inline-flex;
          align-items: center;
          gap: 28px;
          position: relative;
          text-decoration: none;
          cursor: pointer;
          background: none;
        }

        .book-link .linktext {
          position: relative;
          overflow: hidden;
          display: inline-block;
        }

        .book-link .linktext::before {
          position: absolute;
          content: "";
          left: 0;
          bottom: 6px;
          width: 100%;
          height: 3px;
          background-color: #ffffff;
          transform: scaleX(1);
          transition: transform 250ms ease-in-out;
          transform-origin: 0 0;
        }

        .book-link:hover .linktext:before {
          transform: scaleX(0);
          transform-origin: 100% 100%;
        }

        .book-link .arrow {
          height: 36px;
          width: 36px;
          top: -5px;
          display: inline-block;
          position: relative;
          overflow: hidden;
        }

        .book-link .arrow::before,
        .book-link .arrow::after {
          position: absolute;
          content: "";
          background-color: #d33682;
          transition: all ease-in-out 0.35s;
          transform-origin: 0 0;
          border-radius: 30px;
        }

        .book-link .arrow::before {
          height: 2px;
          width: 100%;
          top: 0;
          right: 0;
        }

        .book-link .arrow::after {
          width: 2px;
          height: 100%;
          top: 0;
          right: 0;
        }

        .book-link:hover .arrow::before { width: 65%; }
        .book-link:hover .arrow::after { height: 65%; }

        .book-link .arrow span {
          background-color: #d33682;
          height: 2px;
          width: 100%;
          display: inline-block;
          transform: rotate(-45deg) translate(-3px, -1px);
          transform-origin: right top;
          border-radius: 30px;
          position: absolute;
          top: 0;
          left: 0;
          transition: all ease-in-out 0.35s;
        }

        .book-link .arrow span::before {
          background-color: #d33682;
          content: "";
          height: 100%;
          width: 15px;
          left: -15px;
          top: 0;
          position: absolute;
        }

        /* stats panel */
        .hero-stats {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: flex-end;
          flex-shrink: 0;
        }

        .stat-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(211,54,130,0.3);
          border-radius: 16px;
          padding: 20px 28px;
          text-align: center;
          backdrop-filter: blur(10px);
          min-width: 150px;
        }

        .stat-number {
          font-family: "Montserrat", sans-serif;
          font-weight: 900;
          font-size: 42px;
          color: #d33682;
          line-height: 1;
        }

        .stat-label {
          font-family: "Montserrat", sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 6px;
        }

        /* particles */
        .particles-container {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          background: rgba(211, 54, 130, 0.6);
          border-radius: 50%;
          pointer-events: none;
          animation: float linear infinite;
        }

        .particle:nth-child(odd) { background: rgba(203, 75, 22, 0.4); }
        .particle:nth-child(3n) { background: rgba(255, 255, 255, 0.2); }

        @keyframes float {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) scale(1); opacity: 0; }
        }

        /* ---- SECTIONS ---- */
        .youth-section {
          padding: 100px 60px;
          position: relative;
        }

        .section-label {
          font-family: "Montserrat", sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #d33682;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 16px;
        }

        .section-title {
          font-family: "Montserrat", sans-serif;
          font-weight: 900;
          font-size: clamp(32px, 5vw, 60px);
          color: #fff;
          line-height: 1.1;
          margin: 0 0 24px;
        }

        .section-title span {
          color: #d33682;
        }

        .section-desc {
          font-family: "Montserrat", sans-serif;
          font-size: 16px;
          line-height: 1.9;
          color: rgba(255,255,255,0.7);
          max-width: 600px;
        }

        /* ---- ABOUT ---- */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          margin-top: 60px;
        }

        .about-facts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .fact-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 28px;
          transition: border-color 0.3s;
        }

        .fact-card:hover {
          border-color: rgba(211,54,130,0.5);
        }

        .fact-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .fact-value {
          font-family: "Montserrat", sans-serif;
          font-weight: 900;
          font-size: 36px;
          color: #d33682;
          line-height: 1;
        }

        .fact-name {
          font-family: "Montserrat", sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          margin-top: 6px;
        }

        /* ---- NAVIGATOR ---- */
        .navigator-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 60px;
        }

        .nav-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 36px;
          transition: all 0.3s;
          cursor: pointer;
        }

        .nav-card:hover {
          border-color: rgba(211,54,130,0.5);
          transform: translateY(-6px);
          background: rgba(211,54,130,0.08);
        }

        .nav-card-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .nav-card-tag {
          display: inline-block;
          padding: 5px 14px;
          border-radius: 30px;
          font-family: "Montserrat", sans-serif;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
          color: #002b36;
        }

        .nav-card-title {
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 22px;
          color: #fff;
          margin-bottom: 14px;
          line-height: 1.3;
        }

        .nav-card-desc {
          font-family: "Montserrat", sans-serif;
          font-size: 14px;
          line-height: 1.8;
          color: rgba(255,255,255,0.6);
        }

        .nav-card-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 24px;
          font-family: "Montserrat", sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #d33682;
          text-decoration: none;
          transition: gap 0.3s;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .nav-card-btn:hover { gap: 14px; }

        /* ---- NEWS ---- */
        .news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 60px;
        }

        .news-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 28px;
          transition: all 0.3s;
        }

        .news-card:hover {
          border-color: rgba(211,54,130,0.4);
          transform: translateY(-4px);
        }

        .news-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .news-category {
          background: rgba(211,54,130,0.2);
          color: #d33682;
          padding: 4px 12px;
          border-radius: 20px;
          font-family: "Montserrat", sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .news-date {
          font-family: "Montserrat", sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.4);
        }

        .news-title {
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 17px;
          color: #fff;
          line-height: 1.4;
          margin-bottom: 12px;
        }

        .news-desc {
          font-family: "Montserrat", sans-serif;
          font-size: 13px;
          line-height: 1.7;
          color: rgba(255,255,255,0.55);
        }

        /* ---- DOCUMENTS ---- */
        .docs-list {
          margin-top: 50px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .doc-item {
          display: flex;
          align-items: center;
          gap: 20px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 20px 28px;
          transition: all 0.3s;
          cursor: pointer;
        }

        .doc-item:hover {
          border-color: rgba(211,54,130,0.4);
          background: rgba(211,54,130,0.06);
        }

        .doc-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: rgba(211,54,130,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .doc-info { flex: 1; }

        .doc-title {
          font-family: "Montserrat", sans-serif;
          font-weight: 600;
          font-size: 16px;
          color: #fff;
          margin-bottom: 4px;
        }

        .doc-meta {
          font-family: "Montserrat", sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
        }

        .doc-download {
          font-family: "Montserrat", sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #d33682;
          white-space: nowrap;
        }

        /* ---- EVENTS ---- */
        .events-section {
          background: rgba(0,0,0,0.15);
        }

        .events-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 60px;
        }

        .event-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: all 0.3s;
          cursor: pointer;
        }

        .event-card:hover {
          border-color: rgba(211,54,130,0.45);
          transform: translateY(-5px);
          background: rgba(211,54,130,0.06);
        }

        .event-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .event-date-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 14px;
          background: rgba(211,54,130,0.15);
          border: 1px solid rgba(211,54,130,0.3);
          flex-shrink: 0;
        }

        .event-date-day {
          font-family: "Montserrat", sans-serif;
          font-weight: 900;
          font-size: 22px;
          color: #d33682;
          line-height: 1;
        }

        .event-date-month {
          font-family: "Montserrat", sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: rgba(255,255,255,0.5);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .event-category-tag {
          display: inline-block;
          padding: 5px 12px;
          border-radius: 20px;
          font-family: "Montserrat", sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #002b36;
        }

        .event-title {
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 17px;
          color: #fff;
          line-height: 1.4;
        }

        .event-desc {
          font-family: "Montserrat", sans-serif;
          font-size: 13px;
          line-height: 1.75;
          color: rgba(255,255,255,0.55);
          flex: 1;
        }

        .event-footer {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .event-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: "Montserrat", sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.45);
        }

        .event-meta-icon {
          font-size: 14px;
        }

        @media (max-width: 900px) {
          .events-grid { grid-template-columns: 1fr; }
        }

        /* ---- VOLUNTEERS ---- */
        .volunteers-section {
          background: rgba(0,0,0,0.2);
        }

        .volunteers-table {
          margin-top: 50px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          overflow: hidden;
        }

        .vol-header {
          display: grid;
          grid-template-columns: 80px 1fr 180px 100px;
          padding: 16px 28px;
          background: rgba(211,54,130,0.1);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .vol-header-cell {
          font-family: "Montserrat", sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .vol-row {
          display: grid;
          grid-template-columns: 80px 1fr 180px 100px;
          padding: 20px 28px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          align-items: center;
          transition: background 0.3s;
        }

        .vol-row:last-child { border-bottom: none; }
        .vol-row:hover { background: rgba(211,54,130,0.05); }

        .vol-rank {
          font-family: "Montserrat", sans-serif;
          font-size: 28px;
        }

        .vol-name {
          font-family: "Montserrat", sans-serif;
          font-weight: 600;
          font-size: 16px;
          color: #fff;
        }

        .vol-hours {
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 18px;
          color: #d33682;
        }

        .vol-hours span {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          font-weight: 400;
          margin-left: 4px;
        }

        .vol-progress-bar {
          height: 6px;
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
          overflow: hidden;
        }

        .vol-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #d33682, #268bd2);
          border-radius: 3px;
        }

        /* ---- DIVIDER ---- */
        .section-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.08);
          margin: 0;
        }

        @media (max-width: 900px) {
          .info-section { padding: 0 24px; flex-direction: column; justify-content: center; }
          .left-part { max-width: 100%; }
          .hero-stats { flex-direction: row; align-items: flex-start; flex-wrap: wrap; }
          .youth-nav { padding: 16px 24px; }
          .nav-links { display: none; }
          .about-grid, .navigator-grid, .news-grid { grid-template-columns: 1fr; }
          .youth-section { padding: 70px 24px; }
          .vol-header, .vol-row { grid-template-columns: 60px 1fr 120px; }
          .vol-row > *:last-child { display: none; }
          .vol-header > *:last-child { display: none; }
        }
      `}</style>

      <div className="photography-banner">

        {/* NAV */}
        <nav className="youth-nav">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="https://cdn.poehali.dev/projects/2bd4f7a6-eadb-486e-a916-098fef7014b8/bucket/5be3bb63-1298-4d23-affa-f0c8facf365c.png" alt="Молодёжь ВБР" style={{ height: 40, objectFit: 'contain' }} />
            <div className="nav-logo">Молодёжь <span>ВБР</span></div>
          </div>
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <button className="nav-login-btn" onClick={() => navigate(user ? (user.role === 'admin' ? '/admin' : '/cabinet') : '/login')}>
            {user ? 'Кабинет' : 'Войти'}
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
              <span>НАЙДИ</span>
              <span>СВОЁ</span>
              <span className="text d-flex">
                {currentText.split("").map((char, i) => (
                  <span key={i} className="char">{char}</span>
                ))}
                <span style={{ color: "#d33682", opacity: 0.7, marginLeft: 2 }}>|</span>
              </span>
            </h1>
            <p>
              Портал возможностей для молодёжи Верхнебуреинского муниципального района —
              гранты, карьера, отдых и всё, что нужно для яркой жизни рядом с домом.
            </p>
            <div className="hero-badges">
              <span className="hero-badge">🏆 Гранты и конкурсы</span>
              <span className="hero-badge">💼 Трудоустройство</span>
              <span className="hero-badge">🎯 Досуг</span>
            </div>
            <a className="book-link" href="#navigator">
              <span className="linktext">Исследовать</span>
              <span className="arrow">
                <span />
              </span>
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-number">14+</div>
              <div className="stat-label">Программ</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Волонтёров</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">12</div>
              <div className="stat-label">Поселений</div>
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* ABOUT */}
        <section id="about" className="youth-section">
          <div className="section-label">О молодёжи</div>
          <h2 className="section-title">Молодёжь — сила <span>района</span></h2>
          <div className="about-grid">
            <div>
              <p className="section-desc">
                Верхнебуреинский район — это место, где каждый молодой человек может реализовать
                свой потенциал. Мы объединяем активистов, волонтёров, спортсменов и творческих
                людей для развития родного края.
              </p>
              <p className="section-desc" style={{ marginTop: 20 }}>
                Молодёжная политика района направлена на поддержку инициатив, создание
                рабочих мест и формирование комфортной среды для жизни и самореализации.
              </p>
            </div>
            <div className="about-facts">
              {[
                { icon: "👥", value: "8 000+", name: "молодых людей в районе" },
                { icon: "🏅", value: "50+", name: "мероприятий в год" },
                { icon: "💰", value: "3 млн ₽", name: "грантов ежегодно" },
                { icon: "🤝", name: "активных объединений", value: "20+" },
              ].map((f) => (
                <div className="fact-card" key={f.name}>
                  <div className="fact-icon">{f.icon}</div>
                  <div className="fact-value">{f.value}</div>
                  <div className="fact-name">{f.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* NAVIGATOR */}
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
                <button className="nav-card-btn">
                  Подробнее →
                </button>
              </div>
            ))}
          </div>
        </section>

        <hr className="section-divider" />

        {/* EVENTS */}
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
                  <span
                    className="event-category-tag"
                    style={{ background: event.categoryColor }}
                  >
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

        <hr className="section-divider" />

        {/* NEWS */}
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

        <hr className="section-divider" />

        {/* DOCUMENTS */}
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

        <hr className="section-divider" />

        {/* VOLUNTEERS */}
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
                <span className="vol-hours">
                  {v.hours}<span>ч</span>
                </span>
                <div className="vol-progress-bar">
                  <div
                    className="vol-progress-fill"
                    style={{ width: `${(v.hours / 312) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  )
}

export default PhotographyBanner