import type React from 'react'

const AdminStyles: React.FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');
    *{box-sizing:border-box;}
    .adm-wrap{display:flex;min-height:100vh;background:#002b36;font-family:"Montserrat",sans-serif;}
    .adm-sidebar{width:240px;flex-shrink:0;background:rgba(0,0,0,0.3);border-right:1px solid rgba(255,255,255,0.08);display:flex;flex-direction:column;padding:28px 0;position:sticky;top:0;height:100vh;}
    .adm-logo{padding:0 20px 24px;border-bottom:1px solid rgba(255,255,255,0.08);}
    .adm-logo img{width:110px;object-fit:contain;margin-bottom:4px;}
    .adm-logo h2{color:#fff;font-size:14px;font-weight:700;margin:0;}
    .adm-logo p{color:rgba(255,255,255,0.4);font-size:11px;margin:2px 0 0;}
    .adm-nav{flex:1;padding:16px 10px;overflow-y:auto;}
    .adm-nav-item{display:flex;align-items:center;gap:10px;padding:11px 12px;border-radius:12px;color:rgba(255,255,255,0.55);font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s;margin-bottom:4px;border:none;background:none;width:100%;text-align:left;}
    .adm-nav-item:hover{background:rgba(255,255,255,0.06);color:#fff;}
    .adm-nav-item.active{background:rgba(211,54,130,0.2);color:#d33682;}
    .adm-bottom{padding:0 10px 12px;}
    .adm-main{flex:1;overflow-y:auto;padding:36px;}
    .adm-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;gap:12px;}
    .adm-title{color:#fff;font-size:26px;font-weight:900;margin:0;}
    .adm-btn{padding:10px 18px;border-radius:12px;border:none;cursor:pointer;font-family:"Montserrat",sans-serif;font-size:13px;font-weight:700;transition:all 0.2s;display:inline-flex;align-items:center;gap:6px;}
    .adm-btn-primary{background:#d33682;color:#fff;}
    .adm-btn-primary:hover{opacity:0.85;}
    .adm-btn-primary:disabled{opacity:0.5;cursor:not-allowed;}
    .adm-btn-sm{padding:6px 12px;font-size:12px;border-radius:8px;}
    .adm-btn-outline{background:transparent;border:1px solid rgba(211,54,130,0.5);color:#d33682;}
    .adm-btn-outline:hover{background:rgba(211,54,130,0.1);}
    .adm-btn-danger{background:transparent;border:1px solid rgba(220,50,50,0.5);color:#ff6b6b;}
    .adm-btn-danger:hover{background:rgba(220,50,50,0.1);}
    .adm-btn-ghost{background:transparent;border:none;color:rgba(255,255,255,0.5);}
    .adm-btn-ghost:hover{color:#fff;}
    .adm-table{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;}
    .adm-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);transition:background 0.2s;}
    .adm-row:last-child{border-bottom:none;}
    .adm-row:hover{background:rgba(255,255,255,0.03);}
    .adm-row-info{flex:1;min-width:0;}
    .adm-row-title{color:#fff;font-weight:600;font-size:14px;margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .adm-row-sub{color:rgba(255,255,255,0.4);font-size:12px;}
    .adm-row-actions{display:flex;gap:6px;flex-shrink:0;}
    .adm-tag{display:inline-block;padding:2px 9px;border-radius:20px;background:rgba(211,54,130,0.2);color:#d33682;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-right:6px;}
    .adm-badge-active{display:inline-block;padding:2px 9px;border-radius:20px;background:rgba(42,161,152,0.2);color:#2aa198;font-size:11px;font-weight:700;}
    .adm-badge-inactive{display:inline-block;padding:2px 9px;border-radius:20px;background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.4);font-size:11px;font-weight:700;}
    .adm-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:300;display:flex;align-items:center;justify-content:center;padding:20px;}
    .adm-modal{background:#073642;border:1px solid rgba(211,54,130,0.3);border-radius:20px;padding:32px;width:100%;max-width:540px;max-height:90vh;overflow-y:auto;}
    .adm-modal-title{color:#fff;font-size:19px;font-weight:900;margin:0 0 22px;}
    .adm-field{margin-bottom:14px;}
    .adm-label{display:block;color:rgba(255,255,255,0.7);font-size:12px;font-weight:700;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;}
    .adm-input,.adm-textarea,.adm-select{width:100%;padding:11px 14px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.15);border-radius:10px;color:#fff;font-family:"Montserrat",sans-serif;font-size:13px;outline:none;transition:border-color 0.2s;}
    .adm-textarea{height:90px;resize:vertical;}
    .adm-select option{background:#073642;}
    .adm-input:focus,.adm-textarea:focus,.adm-select:focus{border-color:#d33682;}
    .adm-input::placeholder,.adm-textarea::placeholder{color:rgba(255,255,255,0.3);}
    .adm-modal-actions{display:flex;gap:10px;margin-top:22px;justify-content:flex-end;}
    .adm-confirm-modal{background:#073642;border:1px solid rgba(220,50,50,0.4);border-radius:20px;padding:32px;width:100%;max-width:420px;text-align:center;}
    .adm-confirm-title{color:#fff;font-size:18px;font-weight:900;margin:0 0 10px;}
    .adm-confirm-sub{color:rgba(255,255,255,0.5);font-size:14px;margin:0 0 24px;line-height:1.6;}
    .adm-confirm-name{color:#fff;font-weight:700;}
    .adm-confirm-actions{display:flex;gap:12px;justify-content:center;}
    .adm-toast{position:fixed;bottom:24px;right:24px;background:#2aa198;color:#fff;padding:12px 20px;border-radius:12px;font-weight:700;font-size:14px;z-index:999;animation:toastIn 0.3s ease;}
    @keyframes toastIn{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
    .loading-spin{color:rgba(255,255,255,0.4);font-size:15px;text-align:center;padding:60px;}
    .adm-checkbox-row{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,0.7);font-size:14px;}
    .adm-checkbox-row input{width:16px;height:16px;accent-color:#d33682;}
    .content-group{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;overflow:hidden;margin-bottom:16px;}
    .content-group-title{padding:12px 18px;background:rgba(211,54,130,0.1);border-bottom:1px solid rgba(255,255,255,0.06);color:#d33682;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;}
    .content-item{padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.05);}
    .content-item:last-child{border-bottom:none;}
    .content-item-label{color:rgba(255,255,255,0.6);font-size:11px;font-weight:700;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;}
    .adm-empty{padding:48px 24px;text-align:center;color:rgba(255,255,255,0.3);font-size:14px;}
    @media(max-width:768px){.adm-sidebar{display:none;}.adm-main{padding:20px 14px;}}
  `}</style>
)

export default AdminStyles
