const NavHeroStyles = `
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
`

export default NavHeroStyles
