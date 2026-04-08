const SectionsStyles = `
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
`

export default SectionsStyles
