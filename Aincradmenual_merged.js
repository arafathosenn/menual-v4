(function () {
  "use strict";

  if (document.getElementById("shortner-aincrad-root")) return;

  const APP_CSS = "\n  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@500;700&display=swap');\n\n  #shortner-aincrad-root {\n    position: fixed; inset: 0; z-index: 2147483647; overflow: hidden;\n    background-color: #050b14;\n    background-image: linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px);\n    background-size: 30px 30px;\n    font-family: 'Rajdhani', sans-serif;\n    color: #e0f7fa;\n    display: flex; justify-content: center; align-items: center;\n  }\n  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }\n  \n  /* Background Glows */\n  .bg-glow { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.5; pointer-events: none; }\n  .bg-glow.cyan { width: 300px; height: 300px; background: #00ffff; top: -100px; left: -100px; }\n  .bg-glow.purple { width: 300px; height: 300px; background: #8a2be2; bottom: -100px; right: -100px; }\n\n  /* Page Transitions */\n  .page { position: absolute; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; opacity: 0; visibility: hidden; transform: scale(0.95); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); z-index: 2; }\n  .page.active { opacity: 1; visibility: visible; transform: scale(1); }\n\n  /* Cyber Card Design */\n  .cyber-card {\n    width: min(400px, 100%);\n    background: rgba(5, 15, 25, 0.85);\n    border: 1px solid rgba(0, 255, 255, 0.2);\n    border-radius: 16px;\n    padding: 35px 25px;\n    position: relative;\n    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.05);\n    backdrop-filter: blur(10px);\n    display: flex; flex-direction: column; align-items: center;\n    max-height: 85vh; /* Limits height for scrolling */\n  }\n  \n  /* Card Scrollable Area */\n  .card-scroll-area {\n    width: 100%;\n    overflow-y: auto;\n    padding-right: 5px;\n  }\n  .card-scroll-area::-webkit-scrollbar { width: 6px; }\n  .card-scroll-area::-webkit-scrollbar-thumb { background: #00ffff; border-radius: 10px; }\n\n  /* Neon Corners */\n  .corner { position: absolute; width: 20px; height: 20px; border-radius: 4px; pointer-events: none; }\n  .c-tl { top: -2px; left: -2px; border-top: 3px solid #00ffff; border-left: 3px solid #00ffff; box-shadow: -4px -4px 10px rgba(0,255,255,0.5); }\n  .c-tr { top: -2px; right: -2px; border-top: 3px solid #8a2be2; border-right: 3px solid #8a2be2; box-shadow: 4px -4px 10px rgba(138,43,226,0.5); }\n  .c-bl { bottom: -2px; left: -2px; border-bottom: 3px solid #8a2be2; border-left: 3px solid #8a2be2; box-shadow: -4px 4px 10px rgba(138,43,226,0.5); }\n  .c-br { bottom: -2px; right: -2px; border-bottom: 3px solid #00ffff; border-right: 3px solid #00ffff; box-shadow: 4px 4px 10px rgba(0,255,255,0.5); }\n\n  /* Typography */\n  h1 { font-family: 'Orbitron', sans-serif; font-size: 26px; font-weight: 900; letter-spacing: 4px; margin: 15px 0 5px; color: #fff; text-shadow: 0 0 10px #00ffff; text-align: center; }\n  .sub { font-size: 14px; letter-spacing: 2px; color: #00ffff; margin-bottom: 25px; text-align: center; text-transform: uppercase; font-weight: 700; }\n\n  /* Logo */\n  .logo-box { width: 90px; height: 90px; border-radius: 50%; border: 2px dashed #00ffff; display: flex; justify-content: center; align-items: center; box-shadow: 0 0 20px rgba(0,255,255,0.3), inset 0 0 15px rgba(0,255,255,0.2); animation: pulseGlow 2s infinite alternate; margin: 0 auto; }\n  .logo-box svg { width: 45px; height: 45px; fill: #00ffff; filter: drop-shadow(0 0 5px #00ffff); }\n  @keyframes pulseGlow { from { box-shadow: 0 0 10px rgba(0,255,255,0.2), inset 0 0 10px rgba(0,255,255,0.1); } to { box-shadow: 0 0 25px rgba(0,255,255,0.5), inset 0 0 20px rgba(0,255,255,0.4); border-color: #8a2be2; } }\n\n  /* Inputs */\n  .cyber-input { width: 100%; background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(0, 255, 255, 0.3); border-radius: 8px; padding: 15px; color: #fff; font-family: 'Orbitron', sans-serif; font-size: 14px; text-align: center; letter-spacing: 2px; margin-bottom: 15px; outline: none; transition: all 0.3s; box-shadow: inset 0 0 10px rgba(0,0,0,0.8); }\n  .cyber-input:focus { border-color: #00ffff; box-shadow: 0 0 15px rgba(0, 255, 255, 0.4), inset 0 0 10px rgba(0, 255, 255, 0.2); }\n  .cyber-input::placeholder { color: rgba(255, 255, 255, 0.3); }\n\n  /* Buttons */\n  button { width: 100%; padding: 16px; border-radius: 8px; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 18px; letter-spacing: 2px; cursor: pointer; border: none; outline: none; transition: all 0.2s; position: relative; overflow: hidden; margin-bottom: 15px; display: flex; justify-content: center; align-items: center; gap: 10px; }\n  button:active { transform: scale(0.96); }\n  \n  .btn-primary { background: linear-gradient(90deg, #00ffff, #0055ff, #8a2be2); background-size: 200% 200%; color: #fff; box-shadow: 0 5px 15px rgba(138,43,226,0.4); animation: gradMove 3s ease infinite; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }\n  .btn-secondary { background: rgba(255, 255, 255, 0.05); color: #fff; border: 1px solid rgba(255, 255, 255, 0.2); backdrop-filter: blur(5px); }\n  .btn-secondary:hover { background: rgba(255, 255, 255, 0.1); border-color: #00ffff; box-shadow: 0 0 10px rgba(0,255,255,0.2); }\n  \n  @keyframes gradMove { 0% {background-position: 0% 50%} 50% {background-position: 100% 50%} 100% {background-position: 0% 50%} }\n\n  /* Time Selection Grid */\n  .time-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; }\n  .time-btn { background: rgba(0, 255, 255, 0.1); border: 1px solid #00ffff; color: #00ffff; padding: 12px 0; margin: 0; font-size: 20px; border-radius: 8px; box-shadow: inset 0 0 5px rgba(0,255,255,0.2); }\n  .time-btn:hover, .time-btn.selected { background: #00ffff; color: #000; box-shadow: 0 0 15px #00ffff; }\n  \n  .divider { display: flex; align-items: center; text-align: center; color: rgba(255,255,255,0.4); font-size: 12px; margin: 10px 0 20px; letter-spacing: 2px; }\n  .divider::before, .divider::after { content: ''; flex: 1; border-bottom: 1px dashed rgba(255,255,255,0.2); margin: 0 10px; }\n\n  /* Unknown Style Reactor (Processing) */\n  .reactor-container { position: relative; width: 160px; height: 160px; margin: 20px auto 40px; display: flex; justify-content: center; align-items: center; }\n  .ring { position: absolute; border-radius: 50%; border: 2px solid transparent; }\n  .ring-1 { width: 100%; height: 100%; border-top: 2px solid #00ffff; border-bottom: 2px solid #8a2be2; animation: spin 2s linear infinite; }\n  .ring-2 { width: 80%; height: 80%; border-left: 2px dashed #ff00ff; border-right: 2px dashed #00ffff; animation: spin-reverse 3s linear infinite; }\n  .ring-3 { width: 60%; height: 60%; border-top: 2px dotted #fff; border-bottom: 2px dotted #fff; animation: spin 1.5s linear infinite; }\n  .core { font-family: 'Orbitron', sans-serif; font-size: 32px; font-weight: 900; color: #fff; text-shadow: 0 0 15px #00ffff; }\n  \n  @keyframes spin { 100% { transform: rotate(360deg); } }\n  @keyframes spin-reverse { 100% { transform: rotate(-360deg); } }\n\n  /* Progress Bar */\n  .progress-wrap { width: 100%; background: rgba(0, 0, 0, 0.6); border: 1px solid rgba(0, 255, 255, 0.3); border-radius: 20px; height: 24px; padding: 3px; position: relative; margin-bottom: 10px; box-shadow: inset 0 0 10px rgba(0,0,0,0.8); overflow: hidden; }\n  .progress-fill { height: 100%; width: 0%; border-radius: 20px; background: linear-gradient(90deg, #00ffff, #0055ff, #8a2be2, #ff00ff); background-size: 300% 100%; animation: gradMove 2s linear infinite; transition: width 0.3s linear; box-shadow: 0 0 10px rgba(0, 255, 255, 0.5); }\n  .progress-text-label { text-align: center; font-size: 12px; letter-spacing: 2px; color: #00ffff; font-weight: 700; }\n\n  /* Footer Stylish Text */\n  .footer-box { margin-top: 25px; display: flex; justify-content: center; align-items: center; flex-direction: column; width: 100%; }\n  .footer-line { width: 80%; height: 1px; background: linear-gradient(90deg, transparent, rgba(0,255,255,0.5), transparent); margin-bottom: 10px; }\n  .arafat-text { \n    font-family: 'Orbitron', sans-serif; \n    font-size: 16px; \n    font-weight: 900; \n    letter-spacing: 3px;\n    background: linear-gradient(90deg, #00ffff, #8a2be2, #ff00ff, #00ffff);\n    background-size: 300% 100%;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    animation: gradMove 3s linear infinite, glowPulse 2s ease-in-out infinite;\n    text-transform: uppercase;\n  }\n  @keyframes glowPulse { 0%, 100% { filter: drop-shadow(0 0 5px rgba(0,255,255,0.5)); } 50% { filter: drop-shadow(0 0 15px rgba(255,0,255,0.8)); } }\n\n  /* Toast Notification */\n  .cyber-toast-wrap { position: fixed; top: 20px; right: 20px; z-index: 9999; pointer-events: none; display: flex; flex-direction: column; gap: 10px; }\n  .cyber-toast { width: 300px; background: rgba(5, 15, 25, 0.9); border-left: 4px solid #00ffff; padding: 15px; border-radius: 4px; box-shadow: 0 5px 15px rgba(0,0,0,0.5), 0 0 10px rgba(0,255,255,0.2); display: flex; align-items: center; gap: 15px; transform: translateX(120%); opacity: 0; transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); backdrop-filter: blur(5px); }\n  .cyber-toast.show { transform: translateX(0); opacity: 1; }\n  .toast-icon { font-size: 20px; color: #00ffff; text-shadow: 0 0 5px #00ffff; }\n  .cyber-toast.error { border-left-color: #ff003c; }\n  .cyber-toast.error .toast-icon { color: #ff003c; text-shadow: 0 0 5px #ff003c; }\n  .toast-title { font-size: 14px; font-weight: 900; color: #fff; letter-spacing: 1px; }\n  .toast-msg { font-size: 12px; color: #aaa; margin-top: 3px; }\n  \n  /* Blocking Error Modal */\n  .error-modal-backdrop { position: fixed; inset: 0; z-index: 2147483648; display: flex; justify-content: center; align-items: center; padding: 20px; background: rgba(0, 0, 0, 0.82); backdrop-filter: blur(6px); }\n  .error-modal { width: min(400px, 100%); background: rgba(5, 15, 25, 0.98); border: 1px solid rgba(255, 0, 60, 0.65); border-radius: 16px; padding: 28px 22px 20px; box-shadow: 0 0 35px rgba(255, 0, 60, 0.28), inset 0 0 20px rgba(255, 0, 60, 0.06); text-align: center; }\n  .error-modal-icon { font-size: 42px; line-height: 1; color: #ff003c; text-shadow: 0 0 14px #ff003c; margin-bottom: 12px; }\n  .error-modal-title { font-family: 'Orbitron', sans-serif; font-size: 20px; font-weight: 900; letter-spacing: 2px; color: #fff; margin-bottom: 12px; }\n  .error-modal-message { color: #d7e3e8; font-size: 15px; line-height: 1.5; margin-bottom: 22px; word-break: break-word; }\n  .error-modal-actions { display: flex; gap: 10px; }\n  .error-modal-actions button { margin-bottom: 0; font-size: 15px; padding: 13px 10px; }\n  .error-modal-join { background: linear-gradient(90deg, #00a8ff, #2376ff, #8a2be2); color: #fff; }\n  .error-modal-cancel { background: rgba(255, 255, 255, 0.06); color: #fff; border: 1px solid rgba(255, 255, 255, 0.25); }\n\n  /* Loading Spinner */\n  .spinner { display: none; width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 10px; }\n  .btn-primary.loading .spinner { display: inline-block; }\n  .btn-primary.loading .btn-text { display: none; }\n  \n  /* Compatibility hooks: IDs/classes used by the original application logic. */\n  #shortner-aincrad-root .notice-wrap { position: fixed; top: 20px; right: 20px; z-index: 9999; pointer-events: none; }\n  #shortner-aincrad-root .notice { width: min(320px, calc(100vw - 40px)); background: rgba(5,15,25,.94); border-left: 4px solid #00ffff; padding: 15px; border-radius: 4px; box-shadow: 0 5px 15px rgba(0,0,0,.5), 0 0 10px rgba(0,255,255,.2); display:flex; align-items:center; gap:15px; transform:translateX(120%); opacity:0; transition:all .4s cubic-bezier(.68,-.55,.265,1.55); backdrop-filter:blur(5px); }\n  #shortner-aincrad-root .notice.show { transform:translateX(0); opacity:1; }\n  #shortner-aincrad-root .notice.hide-down { transform:translateX(120%); opacity:0; }\n  #shortner-aincrad-root .nicon { font-size:20px; color:#00ffff; text-shadow:0 0 5px #00ffff; }\n  #shortner-aincrad-root .ntitle { font-size:14px; font-weight:900; color:#fff; letter-spacing:1px; }\n  #shortner-aincrad-root .ntext { font-size:12px; color:#aaa; margin-top:3px; }\n  #shortner-aincrad-root .process-messages { position:fixed; left:20px; bottom:20px; z-index:9999; width:min(360px,calc(100vw - 40px)); display:flex; flex-direction:column; gap:8px; pointer-events:none; }\n  #shortner-aincrad-root .process-msg { background:rgba(5,15,25,.92); border-left:3px solid #8a2be2; padding:10px 12px; color:#dff; font-size:12px; letter-spacing:1px; opacity:0; transform:translateY(10px); transition:all .2s ease; }\n  #shortner-aincrad-root .process-msg.show { opacity:1; transform:translateY(0); }\n  #shortner-aincrad-root .process-msg.leaving { opacity:0; transform:translateY(10px); }\n  #shortner-aincrad-root .field { width:100%; background:rgba(0,0,0,.5); border:1px solid rgba(0,255,255,.3); border-radius:8px; padding:15px; color:#fff; font-family:'Orbitron',sans-serif; font-size:14px; text-align:center; letter-spacing:2px; outline:none; transition:all .3s; box-shadow:inset 0 0 10px rgba(0,0,0,.8); }\n  #shortner-aincrad-root .field:focus { border-color:#00ffff; box-shadow:0 0 15px rgba(0,255,255,.4), inset 0 0 10px rgba(0,255,255,.2); }\n  #shortner-aincrad-root .field::placeholder { color:rgba(255,255,255,.3); }\n  #shortner-aincrad-root .primary, #shortner-aincrad-root .secondary { margin-bottom:15px; margin-top:0; padding:16px; border-radius:8px; font-family:'Rajdhani',sans-serif; font-weight:700; font-size:18px; letter-spacing:2px; }\n  #shortner-aincrad-root .primary { background:linear-gradient(90deg,#00ffff,#0055ff,#8a2be2); background-size:200% 200%; color:#fff; box-shadow:0 5px 15px rgba(138,43,226,.4); animation:gradMove 3s ease infinite; }\n  #shortner-aincrad-root .secondary { background:rgba(255,255,255,.05); color:#fff; border:1px solid rgba(255,255,255,.2); box-shadow:none; }\n  #shortner-aincrad-root .time-inputs { display:flex; align-items:center; justify-content:center; gap:10px; width:100%; margin-bottom:20px; }\n  #shortner-aincrad-root .time-box { width:42%; position:relative; }\n  #shortner-aincrad-root .time-box span { display:block; color:#00ffff; text-align:center; margin-top:6px; font-size:12px; letter-spacing:2px; }\n  #shortner-aincrad-root .time-separator { color:#00ffff; font-size:28px; font-weight:700; }\n  #shortner-aincrad-root .small-label { color:#00ffff; font-size:12px; letter-spacing:2px; text-align:center; margin-bottom:10px; }\n  #shortner-aincrad-root .count-ring { position:relative; width:160px; height:160px; margin:20px auto 40px; border-radius:50%; border:2px solid transparent; background:transparent !important; display:flex; justify-content:center; align-items:center; }\n  #shortner-aincrad-root .count-ring::before { content:''; position:absolute; inset:0; border-radius:50%; border-top:2px solid #00ffff; border-bottom:2px solid #8a2be2; animation:spin 2s linear infinite; }\n  #shortner-aincrad-root .count-ring::after { content:''; position:absolute; inset:16%; border-radius:50%; border-left:2px dashed #ff00ff; border-right:2px dashed #00ffff; animation:spin-reverse 3s linear infinite; }\n  #shortner-aincrad-root .count-ring-inner { position:relative; z-index:1; width:100%; height:100%; background:transparent; border:0; box-shadow:none; display:grid; place-items:center; }\n  #shortner-aincrad-root .count { width:auto; height:auto; overflow:visible; margin:0; font-family:'Orbitron',sans-serif; font-size:32px; font-weight:900; color:#fff; text-shadow:0 0 15px #00ffff; }\n  #shortner-aincrad-root .progress-shell { width:100%; background:rgba(0,0,0,.6); border:1px solid rgba(0,255,255,.3); border-radius:20px; height:24px; padding:3px; margin-bottom:10px; box-shadow:inset 0 0 10px rgba(0,0,0,.8); }\n  #shortner-aincrad-root .progress { height:100%; width:0%; border-radius:20px; background:linear-gradient(90deg,#00ffff,#0055ff,#8a2be2,#ff00ff); background-size:300% 100%; animation:gradMove 2s linear infinite; transition:width .3s linear; box-shadow:0 0 10px rgba(0,255,255,.5); }\n  #shortner-aincrad-root .progress-text { text-align:center; font-size:12px; letter-spacing:2px; color:#00ffff; font-weight:700; margin-top:0; }\n  #shortner-aincrad-root .footer { margin-top:25px; padding-top:10px; width:80%; border-top:1px solid rgba(0,255,255,.5); font-family:'Orbitron',sans-serif; font-size:16px; font-weight:900; letter-spacing:3px; color:#00ffff; text-shadow:0 0 8px #00ffff; }\n  @media(max-width:480px){ #shortner-aincrad-root .notice-wrap{top:10px;right:10px}.cyber-card{padding:25px 18px}.process-messages{left:10px;bottom:10px;width:calc(100% - 20px)} }\n";
  const APP_MARKUP = "<canvas id=\"water\"></canvas>\n\\\n<div class=\"bg-glow cyan\"></div>\n<div class=\"bg-glow purple\"></div>\n\n<div id=\"toastWrap\" class=\"cyber-toast-wrap\"></div>\n\n<div class=\"notice-wrap\">\n  <div id=\"notice\" class=\"notice\">\n    <div id=\"nicon\" class=\"nicon\">✓</div>\n    <div><div id=\"ntitle\" class=\"ntitle\">KEY VERIFIED</div><div id=\"ntext\" class=\"ntext\">Access confirmed</div></div>\n  </div>\n</div>\n\n<section id=\"accessPage\" class=\"page active\">\n  <div class=\"cyber-card\">\n    <div class=\"corner c-tl\"></div><div class=\"corner c-tr\"></div><div class=\"corner c-bl\"></div><div class=\"corner c-br\"></div>\n    <div class=\"logo-box\"><svg viewBox=\"0 0 24 24\"><path d=\"M12 2L3 7l9 5 9-5-9-5zM2 17l10 5 10-5M2 12l10 5 10-5\" stroke=\"#00ffff\" stroke-width=\"2\" fill=\"none\" stroke-linejoin=\"round\"/></svg></div>\n    <h1>SHORTNER</h1><div class=\"sub\">Access Gateway</div>\n    <input id=\"license\" class=\"field\" type=\"text\" placeholder=\"ENTER ACCESS KEY\" autocomplete=\"off\" spellcheck=\"false\">\n    <button id=\"verify\" class=\"primary\"><span class=\"btn-text\">START</span></button>\n    <button id=\"community\" class=\"secondary\">JOIN TELEGRAM</button>\n    <div class=\"footer\">SHORTNER BY ARAFAT</div>\n  </div>\n</section>\n\n<section id=\"timePage\" class=\"page\">\n  <div class=\"cyber-card\">\n    <div class=\"corner c-tl\"></div><div class=\"corner c-tr\"></div><div class=\"corner c-bl\"></div><div class=\"corner c-br\"></div>\n    <h1>SELECT TIME</h1><div class=\"sub\">Processing Duration</div>\n    <div class=\"time-grid\">\n      <button type=\"button\" class=\"time-btn\" data-time=\"20\">20s</button>\n      <button type=\"button\" class=\"time-btn\" data-time=\"30\">30s</button>\n      <button type=\"button\" class=\"time-btn\" data-time=\"40\">40s</button>\n    </div>\n    <div class=\"divider\">INPUT MANUAL</div>\n    <div class=\"time-inputs\">\n      <div class=\"time-box\"><input id=\"minutes\" class=\"field\" type=\"number\" min=\"0\" max=\"999\" placeholder=\"00\"><span>MIN</span></div>\n      <div class=\"time-separator\">:</div>\n      <div class=\"time-box\"><input id=\"seconds\" class=\"field\" type=\"number\" min=\"0\" max=\"999999\" placeholder=\"00\"><span>SEC</span></div>\n    </div>\n    <button id=\"start\" class=\"primary\">START PROCESS</button>\n    <button id=\"back\" class=\"secondary\">BACK</button>\n    <div class=\"footer\">SHORTNER BY ARAFAT</div>\n  </div>\n</section>\n\n<div id=\"processMessages\" class=\"process-messages\"></div>\n\n<section id=\"countPage\" class=\"page\">\n  <div class=\"cyber-card\">\n    <div class=\"corner c-tl\"></div><div class=\"corner c-tr\"></div><div class=\"corner c-bl\"></div><div class=\"corner c-br\"></div>\n    <h1>PROCESSING</h1><div class=\"sub\">Establishing Connection</div>\n    <div id=\"countRing\" class=\"count-ring\"><div class=\"count-ring-inner\"><div id=\"count\" class=\"count\">00:00</div></div></div>\n    <div class=\"small-label\">ACTIVE PROCESS</div>\n    <div class=\"progress-shell\"><div id=\"progress\" class=\"progress\"></div></div>\n    <div id=\"progressText\" class=\"progress-text\">PROCESSING 0%</div>\n    <button id=\"reset\" class=\"secondary\">RESET</button>\n    <div class=\"footer\">SHORTNER BY ARAFAT</div>\n  </div>\n</section>";

  const style = document.createElement("style");
  style.id = "shortner-aincrad-styles";
  style.textContent = APP_CSS;
  (document.head || document.documentElement).appendChild(style);

  const root = document.createElement("div");
  root.id = "shortner-aincrad-root";
  root.innerHTML = APP_MARKUP;
  (document.body || document.documentElement).appendChild(root);

  // Application logic from the supplied Liquid Access UI.
  "use strict";
  
  const LICENSE_API_URL = "https://licensedevices.akhildotto338.workers.dev/api/trpc/license.validate";
  const SCRIPT_NAME = "AINCRAD";
  const DEVICE_STORAGE_KEY = "aincrad_device_id";
  const SUPPORTED_DOMAINS = ["tarviral.com", "rodaemotor.com", "donpviral.xyz"];
  
  const canvas = document.getElementById("water");
  const ctx = canvas.getContext("2d", {alpha:true});
  let W=0,H=0,dpr=1;
  function resize(){
    dpr=Math.min(devicePixelRatio||1,1.5);
    W=innerWidth; H=innerHeight;
    canvas.width=W*dpr; canvas.height=H*dpr;
    canvas.style.width=W+"px"; canvas.style.height=H+"px";
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  addEventListener("resize",resize,{passive:true});
  resize();
  let t=0;
  function drawWater(){
    t+=0.012;
    ctx.clearRect(0,0,W,H);
    ctx.lineWidth=1;
    ctx.strokeStyle="rgba(55,190,220,.10)";
    const gap=48;
    for(let y=-gap;y<H+gap;y+=gap){
      ctx.beginPath();
      for(let x=-20;x<=W+20;x+=20){
        const yy=y+Math.sin(x*.012+t+y*.018)*4;
        if(x===-20)ctx.moveTo(x,yy);else ctx.lineTo(x,yy);
      }
      ctx.stroke();
    }
    requestAnimationFrame(drawWater);
  }
  drawWater();
  
  const notice=document.getElementById("notice");
  const ntitle=document.getElementById("ntitle");
  const ntext=document.getElementById("ntext");
  const nicon=document.getElementById("nicon");
  let noticeTimer;
  function showToast(title,message,type="success"){
    const wrap=document.getElementById("toastWrap");
    if(!wrap)return;
    const toast=document.createElement("div");
    toast.className="cyber-toast "+type;
    const icon=type==="success"?"✓":"✗";
    const iconEl=document.createElement("div"); iconEl.className="toast-icon"; iconEl.textContent=icon;
    const body=document.createElement("div");
    const titleEl=document.createElement("div"); titleEl.className="toast-title"; titleEl.textContent=title;
    const msgEl=document.createElement("div"); msgEl.className="toast-msg"; msgEl.textContent=message;
    body.append(titleEl,msgEl); toast.append(iconEl,body); wrap.appendChild(toast);
    requestAnimationFrame(()=>toast.classList.add("show"));
    setTimeout(()=>{toast.classList.remove("show");setTimeout(()=>toast.remove(),400);},3000);
  }
  function showDomainUnsupportedPage(){
    const old=document.getElementById("shortner-error-modal"); if(old)old.remove();
    const backdrop=document.createElement("div");
    backdrop.id="shortner-error-modal"; backdrop.className="error-modal-backdrop";
    backdrop.innerHTML='<div class="error-modal" role="dialog" aria-modal="true"><div class="error-modal-icon">✗</div><div class="error-modal-title">DOMAIN NOT SUPPORTED</div><div class="error-modal-message">Join the Telegram channel to learn how to get the key</div><div class="error-modal-actions"><button type="button" class="error-modal-join">JOIN</button><button type="button" class="error-modal-cancel">CANCEL</button></div></div>';
    root.appendChild(backdrop);
    backdrop.querySelector(".error-modal-join").addEventListener("click",()=>{location.href="https://t.me/+Qjrl3DUTGVU2MWZl";});
    backdrop.querySelector(".error-modal-cancel").addEventListener("click",()=>backdrop.remove());
  }
  function showNotice(title,text,icon="✓",ms=900){
    showToast(title,text,icon==="!"?"error":"success");
  }
  function page(id){
    document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
    requestAnimationFrame(()=>document.getElementById(id).classList.add("active"));
  }
  
  function getDeviceId(){
    let id=localStorage.getItem(DEVICE_STORAGE_KEY);
    if(!id){
      const seed=[screen.width+"x"+screen.height,screen.colorDepth,Intl.DateTimeFormat().resolvedOptions().timeZone,navigator.language,navigator.userAgent,navigator.hardwareConcurrency||"na",Date.now(),Math.random()].join("###");
      id="WEB_"+Array.from(new TextEncoder().encode(seed)).map(b=>b.toString(16).padStart(2,"0")).join("").slice(0,64);
      localStorage.setItem(DEVICE_STORAGE_KEY,id);
    }
    return id;
  }
  
  async function verifyLicense(licenseKey){
    try{
      const response=await fetch(LICENSE_API_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({licenseKey,hwid:getDeviceId(),scriptName:SCRIPT_NAME})});
      const responseJson=await response.json();
      const data=responseJson?.result?.data;
      if(!data)return {allowed:false,message:"Invalid server response"};
      if(data.allowed)return {allowed:true,data};
      return {allowed:false,reason:data.reason,message:data.message||"License access denied"};
    }catch(error){
      return {allowed:false,message:"Network error: "+(error.message||"Unable to connect")};
    }
  }
  
  function targetSequence(){
    showNotice("KEY VERIFIED","Access confirmed","✓",420);
    setTimeout(()=>{
      showNotice("TARGET DETECTED","Destination is ready","≈",520);
      setTimeout(()=>page("timePage"),150);
    },390);
  }
  
  document.getElementById("verify").addEventListener("click",async()=>{
    const btn=document.getElementById("verify");
    const key=document.getElementById("license").value.trim();
    btn.classList.remove("animating");
    void btn.offsetWidth;
    btn.classList.add("animating");
    setTimeout(()=>btn.classList.remove("animating"),600);
    if(!key){showToast("ERROR","Please enter Access Key","error");return;}
    btn.disabled=true;
    btn.textContent="VERIFYING...";
    const result=await verifyLicense(key);
    if(result.allowed){
      btn.textContent="VERIFIED";
      showToast("SUCCESS",result.data?.message||"Key verified successfully");
      setTimeout(()=>{btn.disabled=false;btn.textContent="VERIFY ACCESS";targetSequence();},850);
    }else{
      const reason=result.reason?"Reason: "+result.reason:"";
      showNotice("ACCESS DENIED",(result.message||"License validation failed")+(reason?" • "+reason:""),"!",2400);
      btn.disabled=false;
      btn.textContent="VERIFY ACCESS";
    }
  });
  document.getElementById("license").addEventListener("keydown",e=>{if(e.key==="Enter")document.getElementById("verify").click();});
  document.getElementById("community").addEventListener("click",()=>{location.href="https://t.me/+Qjrl3DUTGVU2MWZl";});
  
  const minutesInput=document.getElementById("minutes");
  const secondsInput=document.getElementById("seconds");
  document.querySelectorAll(".time-btn").forEach(btn=>btn.addEventListener("click",()=>{
    document.querySelectorAll(".time-btn").forEach(b=>b.classList.remove("selected"));
    btn.classList.add("selected");
    minutesInput.value="0";
    secondsInput.value=btn.dataset.time;
  }));
  function getDuration(){
    let minutes=parseInt(minutesInput.value,10)||0;
    let seconds=parseInt(secondsInput.value,10)||0;
    minutes+=Math.floor(seconds/60);
    seconds=seconds%60;
    minutesInput.value=minutes;
    secondsInput.value=String(seconds).padStart(2,"0");
    return minutes*60+seconds;
  }
  let timerId=0,endAt=0,totalSec=60;
  function fmt(sec){
    sec=Math.max(0,Math.ceil(sec));
    const minutes=Math.floor(sec/60),seconds=sec%60;
    return String(minutes).padStart(2,"0")+":"+String(seconds).padStart(2,"0");
  }
  
  const processMessages=document.getElementById("processMessages");
  let processMessageTimer=0,processMessageRunning=false,processMessageQueue=[],processMessageBusy=false;
  function pumpProcessingMessages(){
    if(!processMessageRunning||processMessageBusy||!processMessageQueue.length)return;
    processMessageBusy=true;
    const text=processMessageQueue.shift();
    const msg=document.createElement("div");
    msg.className="process-msg";
    msg.textContent=text;
    processMessages.appendChild(msg);
    requestAnimationFrame(()=>msg.classList.add("show"));
    processMessageTimer=setTimeout(()=>{
      msg.classList.remove("show");
      msg.classList.add("leaving");
      setTimeout(()=>{
        if(msg.isConnected)msg.remove();
        processMessageBusy=false;
        pumpProcessingMessages();
      },700);
    },1400);
  }
  function showProcessingMessage(text){
    if(!processMessageRunning)return;
    processMessageQueue.push(text);
    pumpProcessingMessages();
  }
  function startProcessingMessages(){stopProcessingMessages();processMessageRunning=true;}
  function stopProcessingMessages(){processMessageRunning=false;clearTimeout(processMessageTimer);processMessageTimer=0;processMessageQueue=[];processMessageBusy=false;processMessages.innerHTML="";}
  function originalLog(icon,text){
    // Keep the original operation intact while presenting the reference UI's generic status text.
    showToast("PROCESSING","Establishing Connection");
  }
  
  let pendingDestination=null;
  let requestFinished=false;
  let timerFinished=false;
  let redirectStarted=false;
  function getCurrentDomain(){
    const host=location.host.toLowerCase();
    return SUPPORTED_DOMAINS.find(d=>host.includes(d))||null;
  }
  function parseDestination(text){
    let dest=null;
    text.trim().split("\n").forEach(line=>{
      try{
        const j=JSON.parse(line);
        dest=j?.json?.[2]?.[0]?.[0]?.destinationLink||j?.json?.[2]?.[0]?.[0]?.url||dest;
      }catch(e){}
    });
    return dest;
  }
  
  async function requestDestination(){
    const domain=getCurrentDomain();
    if(!domain)throw new Error("DOMAIN NOT SUPPORTED: "+location.host);
    originalLog("🛰️","CONNECTING TO "+domain.toUpperCase()+"...");
    originalLog("⏳","Please Wait We Will Feace The Letest Data");
    const proto=location.protocol;
    const sessionRes=await fetch(`${proto}//${domain}/api/session-info`,{credentials:"include"});
    if(!sessionRes.ok)throw new Error("Session request failed with HTTP "+sessionRes.status);
    const sessionData=await sessionRes.json();
    originalLog("✅","Data Found");
    originalLog("📥","Data Collect");
    if(!sessionData.sessionToken)throw new Error("Token Error: sessionToken was not returned");
    originalLog("🛠️","Working");
    originalLog("🔐","TOKEN: "+sessionData.sessionToken.substring(0,15)+"...");
    originalLog("🔗","ESTABLISHING BYPASS TUNNEL...");
    const input=encodeURIComponent(JSON.stringify({"0":{"json":{"token":sessionData.sessionToken,"progress":sessionData.totalStage+1,"stageId":sessionData.stageId}}}));
    originalLog("🧬","INJECTING BYPASS PAYLOAD...");
    const bypassRes=await fetch(`${proto}//${domain}/api/trpc/linkSession.nextStage?batch=1&input=${input}`,{credentials:"include",headers:{"trpc-accept":"application/jsonl","x-trpc-source":"nextjs-react"}});
    if(!bypassRes.ok)throw new Error("Destination request failed with HTTP "+bypassRes.status);
    originalLog("📦","PARSING RESPONSE HEADERS...");
    const dest=parseDestination(await bypassRes.text());
    if(!dest)throw new Error("Destination link was not found in the server response");
    originalLog("🎯","REDIRECT TARGET: "+dest.substring(0,40)+"...");
    originalLog("🔑","TOKEN ON: "+dest);
    [
      ["🛡️","BYPASSING CLOUDFLARE WAF..."],
      ["🧬","DECRYPTING DESTINATION HASH..."],
      ["🛰️","STABILIZING UPLINK..."],
      ["✔️","PAYLOAD VERIFIED & EXECUTED"],
      ["🚀","OPTIMIZING CONNECTION ROUTE..."]
    ].forEach(([i,t],n)=>setTimeout(()=>{if(!redirectStarted)originalLog(i,t);},2000*(n+1)));
    return dest;
  }
  
  function redirectIfReady(){
    if(redirectStarted||!timerFinished||!requestFinished||!pendingDestination)return;
    redirectStarted=true;
    showToast("SUCCESS","Redirecting now...");
    setTimeout(()=>{location.href=pendingDestination;},250);
  }
  function updateCountdown(){
    const remain=Math.max(0,endAt-performance.now());
    const left=remain/1000;
    const pct=Math.min(100,Math.max(1,Math.floor((1-left/totalSec)*100)));
    document.getElementById("count").textContent=fmt(left);
    document.getElementById("countRing").style.background=`conic-gradient(#18cfe8 ${pct}%,#5379f5 ${pct}%,rgba(117,164,185,.18) ${pct}%)`;
    document.getElementById("progress").style.width=pct+"%";
    document.getElementById("progressText").textContent="PROCESSING "+pct+"%";
    if(remain>0)timerId=requestAnimationFrame(updateCountdown);
    else{
      document.getElementById("count").textContent="00:00";
      document.getElementById("countRing").style.background="conic-gradient(#18cfe8 100%,#5379f5 100%,rgba(117,164,185,.18) 100%)";
      document.getElementById("progress").style.width="100%";
      document.getElementById("progressText").textContent="PROCESSING 100%";
      timerFinished=true;
      redirectIfReady();
    }
  }
  
  document.getElementById("start").addEventListener("click",async()=>{
    const btn=document.getElementById("start");
    btn.classList.remove("animating");void btn.offsetWidth;btn.classList.add("animating");
    setTimeout(()=>btn.classList.remove("animating"),600);
    const sec=getDuration();
    if(sec<=0){showToast("INVALID TIME","Please select or input valid time","error");return;}
    totalSec=sec;endAt=performance.now()+sec*1000;pendingDestination=null;requestFinished=false;timerFinished=false;redirectStarted=false;
    page("countPage");startProcessingMessages();cancelAnimationFrame(timerId);updateCountdown();
    originalLog("⚡","INITIALIZING FT BYPASS CORE...");
    originalLog("📡","TARGET DETECTED: "+location.host.toUpperCase());
    originalLog("🛡️","ANALYZING SECURITY PROTOCOLS...");
    originalLog("🔍","SCANNING FOR API VULNERABILITIES...");
    try{
      pendingDestination=await requestDestination();
      requestFinished=true;
      redirectIfReady();
    }catch(error){
      requestFinished=true;
      cancelAnimationFrame(timerId);
      stopProcessingMessages();
      const reason=error.message||"Unknown error";
      if(reason.startsWith("DOMAIN NOT SUPPORTED")){
        showDomainUnsupportedPage();
      }else{
        showToast("PROCESS ERROR",reason,"error");
      }
    }
  });
  document.getElementById("back").addEventListener("click",()=>{stopProcessingMessages();cancelAnimationFrame(timerId);page("accessPage");});
  document.getElementById("reset").addEventListener("click",()=>{stopProcessingMessages();cancelAnimationFrame(timerId);minutesInput.value="";secondsInput.value="";document.getElementById("progress").style.width="0%";document.getElementById("countRing").style.background="conic-gradient(#18cfe8 0%,#5379f5 0%,rgba(117,164,185,.18) 0%)";document.getElementById("progressText").textContent="PROCESSING 0%";document.getElementById("count").textContent="00:00";page("timePage");});
  
  let lastRipple=0;
  function ripple(x,y){
    const now=performance.now();if(now-lastRipple<55)return;lastRipple=now;
    const r=document.createElement("span");r.className="ripple";r.style.left=x+"px";r.style.top=y+"px";document.body.appendChild(r);
    for(let i=0;i<3;i++){
      const d=document.createElement("span");d.className="drop";d.style.left=x+"px";d.style.top=y+"px";
      const angle=Math.random()*Math.PI*2,distance=18+Math.random()*18;
      d.style.setProperty("--dx",Math.cos(angle)*distance+"px");d.style.setProperty("--dy",Math.sin(angle)*distance+"px");
      document.body.appendChild(d);setTimeout(()=>d.remove(),480);
    }
    setTimeout(()=>r.remove(),520);
  }
  addEventListener("pointerdown",e=>ripple(e.clientX,e.clientY),{passive:true});

  // Added touch feedback effect.
  let lastTouch = 0;
  function bubbleTouch(x, y){
    const now = performance.now();
    if(now - lastTouch < 35) return;
    lastTouch = now;

    const count = 22;
    for(let i = 0; i < count; i++){
      const bubble = document.createElement("span");
      bubble.style.position = "fixed";
      bubble.style.left = x + "px";
      bubble.style.top = y + "px";
      bubble.style.width = (3 + Math.random() * 7) + "px";
      bubble.style.height = bubble.style.width;
      bubble.style.borderRadius = "50%";
      bubble.style.pointerEvents = "none";
      bubble.style.zIndex = "2147483648";
      bubble.style.background = "radial-gradient(circle at 30% 25%,rgba(255,255,255,.95),rgba(80,215,235,.48) 42%,rgba(80,125,245,.18))";
      bubble.style.border = "1px solid rgba(255,255,255,.65)";
      bubble.style.boxShadow = "0 0 5px rgba(55,200,230,.25),inset 0 0 3px rgba(255,255,255,.8)";

      const angle = Math.random() * Math.PI * 2;
      const distance = 35 + Math.random() * 85;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const duration = 650 + Math.random() * 500;

      bubble.animate([
        {transform:"translate(-50%,-50%) scale(.2)",opacity:0},
        {transform:"translate(-50%,-50%) scale(1)",opacity:.9,offset:.18},
        {transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(.35)`,opacity:0}
      ], {duration,easing:"cubic-bezier(.16,.72,.22,1)",fill:"forwards"});

      document.body.appendChild(bubble);
      setTimeout(() => bubble.remove(), duration + 50);
    }

    const center = document.createElement("span");
    center.style.position = "fixed";
    center.style.left = x + "px";
    center.style.top = y + "px";
    center.style.width = "12px";
    center.style.height = "12px";
    center.style.borderRadius = "50%";
    center.style.pointerEvents = "none";
    center.style.zIndex = "2147483648";
    center.style.border = "1px solid rgba(70,205,230,.6)";
    center.style.boxShadow = "0 0 10px rgba(65,205,230,.25)";
    center.animate([
      {transform:"translate(-50%,-50%) scale(.2)",opacity:.8},
      {transform:"translate(-50%,-50%) scale(3)",opacity:0}
    ], {duration:500,easing:"ease-out",fill:"forwards"});
    document.body.appendChild(center);
    setTimeout(() => center.remove(), 550);
  }

  addEventListener("pointerdown", e => bubbleTouch(e.clientX, e.clientY), {passive:true});
})();
