import type React from "react"
import { useState, useEffect } from "react"
import { publicApi } from "@/lib/api"
import BannerStyles from "./banner/BannerStyles"
import BannerHero from "./banner/BannerHero"
import BannerSections from "./banner/BannerSections"

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

const PhotographyBanner: React.FC = () => {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [sc, setSc] = useState<Record<string, string>>({})

  useEffect(() => {
    publicApi.siteContent?.().then((data: Record<string, string>) => {
      if (data && !data.error) setSc(data)
    }).catch(() => {})
  }, [])

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

  const stats = [
    { value: sc.hero_stat_1_value || "14+", label: sc.hero_stat_1_label || "Программ" },
    { value: sc.hero_stat_2_value || "500+", label: sc.hero_stat_2_label || "Волонтёров" },
    { value: sc.hero_stat_3_value || "12", label: sc.hero_stat_3_label || "Поселений" },
  ]

  return (
    <>
      <BannerStyles />
      <div className="photography-banner">
        <BannerHero
          navLinks={navLinks}
          particles={particles}
          currentText={currentText}
          sc={sc}
          stats={stats}
        />
        <BannerSections
          sc={sc}
          navigatorCards={navigatorCards}
          newsItems={newsItems}
          volunteers={volunteers}
          events={events}
          documents={documents}
        />
      </div>
    </>
  )
}

export default PhotographyBanner
