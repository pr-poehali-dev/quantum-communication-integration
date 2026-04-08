const EventsVolunteersStyles = `
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
`

export default EventsVolunteersStyles
