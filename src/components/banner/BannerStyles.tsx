import type React from "react"
import NavHeroStyles from "./styles/NavHeroStyles"
import SectionsStyles from "./styles/SectionsStyles"
import EventsVolunteersStyles from "./styles/EventsVolunteersStyles"

const BannerStyles: React.FC = () => (
  <style>{`
    ${NavHeroStyles}
    ${SectionsStyles}
    ${EventsVolunteersStyles}
  `}</style>
)

export default BannerStyles
