/* TecXFRA floating icon + info panel. Included on every Growth Series page.
   Uses the page's own `sb` / `currentUser` for logging; works silently without them. */
(function(){
  if (window.__bgsTecx) return; window.__bgsTecx = true;
  var TRIAL_URL = 'https://www.tecxfra.com/?trial=1&ref=bgs';
  var PAGE = (location.pathname.split('/').pop() || 'app.html').replace('.html','');
  var ON_TECX_PAGE = PAGE === 'tecxfra';

  function log(kind){
    try {
      if (typeof sb === 'undefined' || !sb || typeof currentUser === 'undefined' || !currentUser) return;
      sb.from('tecxfra_events').insert({ user_id: currentUser.id, kind: kind, page: PAGE }).then(function(){}, function(){});
    } catch(e){}
  }
  window.bgsTecxLog = log;
  window.bgsTecxTrial = function(){ log('trial_click'); window.open(TRIAL_URL, '_blank', 'noopener'); };

  // log the full-page visit (once per session) after the page has signed the member in
  if (ON_TECX_PAGE) {
    var n = 0, w = setInterval(function(){ n++; if (typeof currentUser !== 'undefined' && currentUser) { clearInterval(w); try { if (!sessionStorage.getItem('bgs_tx_pv')) { sessionStorage.setItem('bgs_tx_pv','1'); log('page_view'); } } catch(e){ log('page_view'); } } else if (n > 60) clearInterval(w); }, 700);
    return;
  }

  var css = document.createElement('style');
  css.textContent = [
  '.txw-btn{position:fixed;left:16px;bottom:18px;z-index:9990;display:flex;align-items:center;gap:10px;border:0;cursor:pointer;background:#12343f;color:#fff;padding:7px 16px 7px 7px;border-radius:40px;box-shadow:0 8px 24px rgba(18,52,63,.35);font:600 12.5px/1.2 Poppins,sans-serif;}',
  '.txw-btn:focus-visible{outline:3px solid #B08D3F;outline-offset:3px;}',
  '.txw-mark{width:40px;height:40px;border-radius:50%;background:#FAF6EC;display:grid;place-items:center;flex:none;}',
  '.txw-mark svg{width:26px;height:26px;}',
  '.txw-btn small{display:block;font-weight:500;font-size:10.5px;color:#9fd3dc;letter-spacing:.01em;}',
  '.txw-btn.pulse .txw-mark{animation:txwPulse 2.2s ease-out 3;}',
  '@keyframes txwPulse{0%{box-shadow:0 0 0 0 rgba(74,168,184,.7);}100%{box-shadow:0 0 0 16px rgba(74,168,184,0);}}',
  '.txw-panel{position:fixed;left:16px;bottom:78px;z-index:9991;width:min(380px,calc(100vw - 32px));max-height:min(78vh,640px);overflow:auto;background:#FAF6EC;color:#1c1c1c;border:1px solid rgba(0,0,0,.12);border-radius:14px;box-shadow:0 18px 50px rgba(0,0,0,.28);display:none;font-family:Poppins,sans-serif;}',
  '.txw-panel.open{display:block;animation:txwIn .22s ease-out;}',
  '@keyframes txwIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;}}',
  '.txw-head{background:#12343f;color:#fff;padding:18px 20px 16px;border-radius:14px 14px 0 0;position:relative;}',
  '.txw-head b{display:block;font-size:17px;letter-spacing:.01em;}',
  '.txw-head span{font-size:11px;color:#9fd3dc;letter-spacing:.14em;text-transform:uppercase;}',
  '.txw-x{position:absolute;right:12px;top:10px;background:none;border:0;color:#fff;font-size:22px;cursor:pointer;line-height:1;padding:4px 8px;}',
  '.txw-body{padding:18px 20px 20px;}',
  '.txw-body h3{font-size:18px;line-height:1.3;margin:0 0 8px;color:#12343f;}',
  '.txw-body p{font-size:13px;line-height:1.6;color:#5d5a52;margin:0 0 12px;}',
  '.txw-days{display:inline-block;background:#B08D3F;color:#fff;font-weight:700;font-size:11.5px;padding:4px 10px;border-radius:20px;margin-bottom:12px;}',
  '.txw-list{list-style:none;margin:0 0 14px;padding:0;}',
  '.txw-list li{font-size:12.8px;line-height:1.5;padding:6px 0 6px 22px;position:relative;border-bottom:1px solid rgba(0,0,0,.08);}',
  '.txw-list li::before{content:"";position:absolute;left:3px;top:12px;width:8px;height:8px;border-radius:50%;background:#4aa8b8;}',
  '.txw-letters{display:flex;gap:5px;margin:0 0 14px;}',
  '.txw-letters span{flex:1;text-align:center;background:#12343f;color:#fff;font-weight:700;font-size:14px;padding:7px 0;border-radius:6px;}',
  '.txw-letters span.x{background:#c8872e;}',
  '.txw-cta{display:block;width:100%;text-align:center;background:#0F4C5C;color:#fff;border:0;padding:13px 16px;font:700 12.5px Poppins,sans-serif;text-transform:uppercase;letter-spacing:.05em;cursor:pointer;text-decoration:none;border-radius:6px;margin-bottom:8px;}',
  '.txw-cta:hover{background:#0b3a47;}',
  '.txw-cta.ghost{background:transparent;color:#0F4C5C;border:1px solid #0F4C5C;}',
  '.txw-fine{font-size:11px;color:#5d5a52;line-height:1.5;margin:6px 0 0;}',
  '@media (max-width:640px){.txw-btn small{display:none;}.txw-btn{padding:6px;}.txw-panel{left:8px;right:8px;width:auto;bottom:74px;}}',
  '@media (prefers-reduced-motion:reduce){.txw-btn.pulse .txw-mark,.txw-panel.open{animation:none;}}'
  ].join('\n');
  document.head.appendChild(css);

  var MARK = '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="46" r="9" fill="#4aa8b8"/><path d="M50 55 C42 68 44 84 50 96 C56 84 58 68 50 55 Z" fill="#4aa8b8"/><circle cx="47" cy="42" r="6.5" fill="#0c262f" opacity=".35"/></svg>';
  var raise = (PAGE === 'messages' || PAGE === 'lounge') ? 'bottom:86px;' : '';

  var btn = document.createElement('button');
  btn.className = 'txw-btn pulse'; btn.type = 'button'; btn.id = 'txwBtn';
  btn.setAttribute('aria-haspopup','dialog'); btn.setAttribute('aria-expanded','false');
  btn.setAttribute('aria-label','TecXFRA: run your business, 14 days free');
  if (raise) btn.style.cssText = raise;
  btn.innerHTML = '<span class="txw-mark">' + MARK + '</span><span>TecXFRA<small>14 days free for members</small></span>';

  var panel = document.createElement('div');
  panel.className = 'txw-panel'; panel.id = 'txwPanel'; panel.setAttribute('role','dialog'); panel.setAttribute('aria-label','TecXFRA free trial');
  if (raise) panel.style.bottom = '150px';
  panel.innerHTML =
    '<div class="txw-head"><button class="txw-x" type="button" aria-label="Close" id="txwX">&times;</button><b>TecXFRA</b><span>Complete Total Control</span></div>' +
    '<div class="txw-body">' +
      '<div class="txw-days">14 DAYS FREE &middot; SERIES MEMBER PERK</div>' +
      '<h3>The next step: run your business on it.</h3>' +
      '<p>You have learned the playbook. TecXFRA is the business operating system that puts it to work every day, from your phone.</p>' +
      '<div class="txw-letters"><span>T</span><span>e</span><span>C</span><span class="x">X</span><span>F</span><span>R</span><span>A</span></div>' +
      '<ul class="txw-list">' +
        '<li>Today, Expenses, CRM, Execution, Follow-ups, Revenue, Accountability in one place</li>' +
        '<li>21 working modules, WhatsApp follow-ups, POS and invoicing</li>' +
        '<li>An AI assistant that answers from your own live numbers</li>' +
        '<li>Starts with just income and expenses, and grows with you</li>' +
      '</ul>' +
      '<button class="txw-cta" type="button" id="txwTrial">Start my 14-day free trial</button>' +
      '<a class="txw-cta ghost" href="tecxfra.html" id="txwMore">See everything inside</a>' +
      '<p class="txw-fine">Pick your plan, enjoy 14 days, and we remind you by message and email before payment begins. The trial never uses one of the 10 founding slots.</p>' +
    '</div>';

  function open(){ panel.classList.add('open'); btn.setAttribute('aria-expanded','true'); btn.classList.remove('pulse'); log('panel_open'); try{localStorage.setItem('bgs_tx_seen','1');}catch(e){} }
  function close(){ panel.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
  function mount(){
    document.body.appendChild(panel); document.body.appendChild(btn);
    try { if (localStorage.getItem('bgs_tx_seen')) btn.classList.remove('pulse'); } catch(e){}
    btn.addEventListener('click', function(){ panel.classList.contains('open') ? close() : open(); });
    panel.querySelector('#txwX').addEventListener('click', close);
    panel.querySelector('#txwTrial').addEventListener('click', function(){ window.bgsTecxTrial(); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });
    document.addEventListener('click', function(e){ if (!panel.contains(e.target) && !btn.contains(e.target)) close(); });
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
