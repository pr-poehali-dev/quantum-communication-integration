import type React from "react"

const BannerStyles: React.FC = () => (
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

    .char {
      display: inline-block;
    }

    .left-part p {
      font-family: "Montserrat", sans-serif;
      font-size: 16px;
      line-height: 1.8;
      color: rgba(255,255,255,0.7);
      margin: 30px 0;
      max-width: 560px;
    }

    .hero-badges {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 36px;
    }

    .hero-badge {
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 20px;
      padding: 7px 16px;
      font-family: "Montserrat", sans-serif;
      font-size: 13px;
      color: rgba(255,255,255,0.85);
    }

    .book-link {
      display: inline-flex;
      align-items: center;
      gap: 16px;
      text-decoration: none;
      color: #fff;
    }

    .book-link .linktext {
      font-family: "Montserrat", sans-serif;
      font-weight: 700;
      font-size: 18px;
      color: #fff;
      position: relative;
    }

    .book-link .linktext:before {
      position: absolute;
      bottom: -4px;
      content: "";
      width: 100%;
      height: 2px;
      left: 0;
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
)

export default BannerStyles