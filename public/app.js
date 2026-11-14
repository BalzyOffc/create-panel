const S = window.SYSTEM;
const $ = id => document.getElementById(id);
const CFG_KEY = 'balzy_cfg';

/* ================= ICONS ================= */
const ICO = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  server: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  login: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>',
  rocket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>',
  egg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8 2 4 8 4 14a8 8 0 0 0 16 0c0-6-4-12-8-12z"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
};

/* ================= STATE ================= */
const state = {
  user: null,
  selectedPlan: null,
  selectedEgg: null,
  eggs: [],
  loginAttempts: 0,
  lockoutUntil: 0,
  pages: { users: 1, servers: 1 },
};

/* ================= CFG ================= */
function loadCfg(){
  try {
    const raw = localStorage.getItem(CFG_KEY);
    if(raw) return JSON.parse(raw);
  } catch{}
  return { panel: '', key: '', tgToken: '', tgChat: '' };
}
function saveCfg(cfg){ localStorage.setItem(CFG_KEY, JSON.stringify(cfg)); }

/* ================= HELPERS ================= */
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function notif(msg, type='ok'){
  const el = document.createElement('div');
  el.className = 'notif ' + type;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity='0'; el.style.transition='opacity .3s'; setTimeout(()=>el.remove(),300); }, 3500);
}
function logSecurity(event, detail){
  try {
    const arr = JSON.parse(localStorage.getItem('balzy_alerts') || '[]');
    arr.unshift({ ts: new Date().toISOString(), event, detail });
    localStorage.setItem('balzy_alerts', JSON.stringify(arr.slice(0, 100)));
  } catch{}
}
/* ================= CONSOLE LOG ================= */
function cLog(msg, type = 'info'){
  const box = $('consoleBox');
  if(!box) return;
  box.style.display = 'block';
  $('consoleActions').style.display = 'flex';
  const now = new Date();
  const ts = now.toTimeString().slice(0,8);
  const line = document.createElement('div');
  line.className = 'line';
  line.innerHTML = `<span class="ts">[${ts}]</span><span class="${type}">${escapeHtml(msg)}</span>`;
  box.appendChild(line);
  box.scrollTop = box.scrollHeight;
}
function cStep(msg){ cLog('▶ ' + msg, 'step'); }
function cOk(msg){ cLog('✓ ' + msg, 'ok'); }
function cErr(msg){ cLog('✗ ' + msg, 'err'); }
function cWarn(msg){ cLog('! ' + msg, 'warn'); }
function cClear(){
  const box = $('consoleBox');
  if(box){ box.innerHTML = ''; box.style.display = 'none'; }
  const act = $('consoleActions');
  if(act) act.style.display = 'none';
}
/* ================= API ================= */
async function api(path, options={}){
  const cfg = loadCfg();
  const url = S.WORKER_PROXY + '?path=' + encodeURIComponent(path);
  const headers = {
    'Content-Type': 'application/json',
    'X-Panel-Url': cfg.panel || '',
    'X-Api-Key': cfg.key || '',
    'X-Username': state.user?.username || 'guest',
    ...(options.headers||{}),
  };
  if(state.user?.role === 'admin') headers['X-Admin-Pin'] = S.ADMIN_PIN;
  let res;
  try { res = await fetch(url, { ...options, headers }); }
  catch(e){ throw new Error('Gagal terhubung ke server.'); }
  const raw = await res.text();
  let data = {};
  try { data = raw ? JSON.parse(raw) : {}; } catch {}
  if(!res.ok){
    const detail = data.errors?.map(e=>e.detail||e.code).join('\n') || data.message || data.error || ('Kode ' + res.status);
    throw new Error(detail);
  }
  return data;
}

/* ================= BOOT ================= */
(function boot(){
  renderShell();
  const sess = sessionStorage.getItem('balzy_session');
  if(sess){ state.user = JSON.parse(sess); enterApp(); }
})();

/* ================= SHELL ================= */
function renderShell(){
  $('app').innerHTML = `
  <div class="login-wrap" id="loginScreen">
    <div class="login-box">
      <div class="logo">B</div>
      <h2>${escapeHtml(S.APP_NAME)}</h2>
      <p>Masuk buat ngatur server kamu</p>
      <div class="field"><label>Username</label><input id="loginUser" placeholder="username" autocomplete="username"></div>
      <div class="field"><label>Password</label><input id="loginPass" type="password" placeholder="password" autocomplete="current-password"></div>
      <button class="btn" id="loginBtn">${ICO.login} Masuk</button>
<div id="loginError" class="status" style="display:none;margin-top:12px"></div>
<div style="margin-top:22px;text-align:center;color:#5a5a68;font-size:11px;letter-spacing:1.5px;font-weight:700">
  BALZY OFFICIAL
</div>
      <div class="hint" style="margin-top:10px;text-align:center">Belum punya akun? <a href="#" id="toRegister" style="color:#ff9ca5">Daftar dulu</a></div>
    </div>
  </div>
  <div class="app" id="mainApp" style="display:none">
    <aside class="sidebar" id="sidebar">
      <div class="brand"><div class="logo">B</div><div class="brand-text"><h1>${escapeHtml(S.APP_NAME)}</h1><p>Server Creator</p></div></div>
      <div class="nav-label">Menu</div>
      <button class="nav-item active" data-page="dashboard">${ICO.home}<span>Beranda</span></button>
      <button class="nav-item" data-page="create">${ICO.plus}<span>Bikin Server</span></button>
      <button class="nav-item" data-page="myservers">${ICO.server}<span>Server Gue</span></button>
      <button class="nav-item" data-page="buy">${ICO.cart}<span>Beli Panel</span></button>
      <div class="nav-label" data-admin>Admin</div>
      <button class="nav-item" data-page="admin-users" data-admin>${ICO.users}<span>Daftar User</span></button>
      <button class="nav-item" data-page="admin-servers" data-admin>${ICO.chart}<span>Semua Server</span></button>
      <button class="nav-item" data-page="admin-suspicious" data-admin>${ICO.alert}<span>Server Aneh</span> <span class="nav-badge" id="suspBadge" style="display:none">0</span></button>
      <button class="nav-item" data-page="admin-alerts" data-admin>${ICO.bell}<span>Riwayat Masalah</span></button>
      <button class="nav-item" data-page="admin-settings" data-admin>${ICO.key}<span>Setelan Panel</span></button>
      <div style="flex:1"></div>
      <div class="nav-divider"></div>
      <button class="nav-item" id="logoutBtn">${ICO.logout}<span>Keluar</span></button>
    </aside>
    <main class="main">
      <div class="topbar">
        <div style="display:flex;align-items:center;gap:12px">
          <button class="toggle-sidebar" id="toggleSidebar">${ICO.menu}</button>
          <div><h2 id="pageTitle">Beranda</h2><p id="pageSub">Selamat datang</p></div>
        </div>
        <div class="user-chip"><div class="av" id="avatarInitial">A</div><span id="userName">admin</span><span class="pill red" id="userRole">ADMIN</span></div>
      </div>
      <div id="pages"></div>
    </main>
  </div>`;
  bindShell();
}
function bindShell(){
  $('loginBtn').addEventListener('click', doLogin);
  $('loginPass').addEventListener('keydown', e => { if(e.key==='Enter') doLogin(); });
  $('toRegister').addEventListener('click', doRegister);
  $('logoutBtn').addEventListener('click', () => { sessionStorage.clear(); location.reload(); });
  $('toggleSidebar').addEventListener('click', () => $('sidebar').classList.toggle('open'));
  document.querySelectorAll('.nav-item[data-page]').forEach(n => n.addEventListener('click', () => navTo(n.dataset.page)));
}

/* ================= LOGIN ================= */
/* ================= LOGIN ================= */
function doLogin(){
  const u = $('loginUser').value.trim();
  const p = $('loginPass').value;

  // pastikan elemen error ada; kalau belum, buat otomatis
  let msg = $('loginError');
  if(!msg){
    msg = document.createElement('div');
    msg.id = 'loginError';
    msg.className = 'status';
    msg.style.display = 'none';
    const loginBtn = $('loginBtn');
    if(loginBtn && loginBtn.parentNode){
      loginBtn.parentNode.insertBefore(msg, loginBtn.nextSibling);
    }
  }

  // lockout sementara
  if(Date.now() < state.lockoutUntil){
    const sisa = Math.ceil((state.lockoutUntil - Date.now())/1000);
    msg.textContent = `Kebanyakan nyoba. Tunggu ${sisa} detik lagi.`;
    msg.className = 'status err';
    msg.style.display = 'block';
    return;
  }

  // cek admin (bisa lebih dari satu)
  const isAdminLogin =
    (u === S.ADMIN_USER  && p === S.ADMIN_PASS)  ||
    (u === S.ADMIN_USER2 && p === S.ADMIN_PASS2) ||
    (u === S.ADMIN_USER3 && p === S.ADMIN_PASS3);

  if(isAdminLogin){
    state.user = { id: 1, username: u, role: 'admin', email: 'admin@balzy.local' };
    sessionStorage.setItem('balzy_session', JSON.stringify(state.user));
    state.loginAttempts = 0;
    msg.style.display = 'none';
    enterApp();
    notif('Masuk sebagai admin.');
    return;
  }

  // cek user biasa
  let users = [];
  try { users = JSON.parse(localStorage.getItem('balzy_users') || '[]'); } catch{}
  const found = users.find(x => x.username === u && x.password === p);
  if(found){
    state.user = { id: found.id, username: found.username, role: 'user', email: found.email };
    sessionStorage.setItem('balzy_session', JSON.stringify(state.user));
    state.loginAttempts = 0;
    msg.style.display = 'none';
    enterApp();
    notif('Masuk. Halo, ' + found.username);
    return;
  }

  // gagal
  state.loginAttempts++;
  msg.textContent = `Salah. Percobaan ${state.loginAttempts}/${S.MAX_LOGIN_ATTEMPTS}.`;
  msg.className = 'status err';
  msg.style.display = 'block';

  if(state.loginAttempts >= S.MAX_LOGIN_ATTEMPTS){
    state.lockoutUntil = Date.now() + S.LOCKOUT_MS;
    msg.textContent = 'Akun dikunci sementara karena kebanyakan nyoba.';
    logSecurity('BRUTE_FORCE', `Username: ${u} | Percobaan: ${state.loginAttempts}`);
    notif('Ada percobaan masuk mencurigakan.', 'err');
  }
}
function doRegister(e){
  e.preventDefault();
  const u = prompt('Username baru:');
  if(!u) return;
  const p = prompt('Password (minimal 6 karakter):');
  if(!p || p.length < 6) return alert('Password minimal 6 karakter.');
  const em = prompt('Email:') || '';
  let users = [];
  try { users = JSON.parse(localStorage.getItem('balzy_users') || '[]'); } catch{}
  if(users.some(x => x.username === u)) return alert('Username sudah dipakai.');
  users.push({ id: Date.now(), username: u, password: p, email: em, created: new Date().toISOString() });
  localStorage.setItem('balzy_users', JSON.stringify(users));
  alert('Akun jadi. Silakan masuk.');
}

/* ================= ENTER APP ================= */
function enterApp(){
  $('loginScreen').style.display = 'none';
  $('mainApp').style.display = 'flex';
  $('userName').textContent = state.user.username;
  $('avatarInitial').textContent = state.user.username[0].toUpperCase();
  $('userRole').textContent = state.user.role === 'admin' ? 'ADMIN' : 'USER';
  $('userRole').className = 'pill ' + (state.user.role === 'admin' ? 'red' : 'blue');
  document.querySelectorAll('[data-admin]').forEach(el => {
    el.style.display = state.user.role === 'admin' ? '' : 'none';
  });
  renderPages();
  navTo('dashboard');
  refreshSuspBadge();
}

/* ================= PAGES ================= */
function renderPages(){
  $('pages').innerHTML = `
  <div class="page active" id="page-dashboard">
    <div class="grid3" style="margin-bottom:16px">
      <div class="stat"><div class="ico">${ICO.server}</div><div class="num" id="statServers">-</div><div class="lbl">Server Gue</div></div>
      <div class="stat"><div class="ico">${ICO.users}</div><div class="num" id="statUsers">-</div><div class="lbl">Total User</div></div>
      <div class="stat"><div class="ico">${ICO.check}</div><div class="num" id="statApi">-</div><div class="lbl">Status Panel</div></div>
    </div>
    <div class="card"><h3>${ICO.rocket} Yang Sering Dipakai</h3>
      <div class="actions" style="margin-top:0">
        <button class="btn" onclick="navTo('create')">${ICO.plus} Bikin Server Baru</button>
        <button class="btn secondary" onclick="checkApiStatus()">${ICO.refresh} Cek Panel</button>
        <button class="btn secondary" onclick="navTo('myservers')">${ICO.server} Server Gue</button>
      </div>
      <div id="apiStatusBox" class="status" style="margin-top:12px">Ngecek status panel...</div>
    </div>
    <div class="card"><h3>${ICO.bell} Catatan</h3>
      <div class="hint" style="line-height:1.8">
        • Server user dibatasi 1–10 GB.<br>
        • Admin bebas atur resource.<br>
        • Ada masalah keamanan? Bot Telegram bakal kasih tau.<br>
        • Suspend, hapus, ban user bisa langsung dari Telegram.
      </div>
    </div>
  </div>

  <div class="page" id="page-create">
  <div class="card"><h3>${ICO.server} 1. Pilih Paket</h3>
    <div class="grid3" id="planGrid"></div>
    <div class="hint" style="margin-top:10px" id="planHint">Paket 10 GB otomatis full 10 GB.</div>
    <div id="adminCustomPlan" style="display:none;margin-top:12px">
      <div class="fields">
        <div class="field"><label>RAM (MB) — bebas</label><input id="customMem" type="number" min="512" value="2048"></div>
        <div class="field"><label>Disk (MB) — bebas</label><input id="customDisk" type="number" min="512" value="2048"></div>
        <div class="field"><label>CPU (%) — bebas</label><input id="customCpu" type="number" min="50" value="200"></div>
      </div>
      <button class="btn secondary small" id="applyCustomPlan" style="margin-top:10px">${ICO.check} Pakai Resource Custom</button>
    </div>
  </div>

  <div class="card"><h3>${ICO.user} 2. Data Akun Panel</h3>
    <div class="fields">
      <div class="field"><label>Username</label><input id="cUsername" placeholder="username" autocomplete="off"></div>
      <div class="field"><label>Email</label><input id="cEmail" type="email" placeholder="user@email.com" autocomplete="off"></div>
      <div class="field full"><label>Password</label>
        <div style="display:flex;gap:8px">
          <input id="cPassword" type="text" placeholder="Minimal 8 karakter" autocomplete="off" style="flex:1">
          <button class="btn secondary" id="genPassBtn" type="button" title="Generate password">${ICO.refresh}</button>
        </div>
      </div>
    </div>
  </div>

  <div class="card"><h3>${ICO.egg} 3. Pilih Nest</h3>
    <div id="nestList"><div class="hint">Muat daftar nest...</div></div>
    <button class="btn secondary small" id="reloadNestsBtn" style="margin-top:8px">${ICO.refresh} Muat Ulang Nest</button>
  </div>

  <div class="card"><h3>${ICO.egg} 4. Pilih Egg</h3>
    <div id="eggList"><div class="hint">Pilih nest dulu.</div></div>
  </div>

  <div class="card"><h3>${ICO.egg} 5. Versi Runtime</h3>
    <div id="eggVars"><div class="hint">Pilih egg dulu.</div></div>
  </div>

  <div class="card"><h3>${ICO.server} 6. Pilih Node</h3>
    <div id="nodeList"><div class="hint">Muat daftar node...</div></div>
    <button class="btn secondary small" id="reloadNodesBtn" style="margin-top:8px">${ICO.refresh} Muat Ulang Node</button>
  </div>

  <div class="card"><h3>${ICO.key} 7. Pilih Allocation</h3>
    <div id="allocList"><div class="hint">Pilih node dulu.</div></div>
  </div>

  <div class="card"><h3>${ICO.egg} 8. Nama Server</h3>
    <div class="fields"><div class="field full"><label>Nama Server</label><input id="cServerName" value="Balzy Server"></div></div>
  </div>

  <div class="card"><h3>${ICO.rocket} Proses</h3>
    <div class="console-box" id="consoleBox" style="display:none"></div>
    <div class="console-actions" id="consoleActions" style="display:none">
      <button class="btn secondary small" id="copyConsoleBtn">${ICO.copy} Salin Console</button>
      <button class="btn secondary small" id="clearConsoleBtn">${ICO.trash} Bersihkan</button>
    </div>
  </div>

  <div class="actions">
    <button class="btn" id="createServerBtn">${ICO.rocket} Bikin Sekarang</button>
    <button class="btn secondary" onclick="navTo('dashboard')">${ICO.back} Kembali</button>
  </div>

  <div id="createResult" class="result"><h4>${ICO.check} Server jadi</h4><pre id="createResultText"></pre>
    <button class="btn secondary small" id="copyResultBtn">${ICO.copy} Copy Detail</button></div>
</div>

  <div class="page" id="page-myservers"><div class="card"><h3>${ICO.server} Server Gue</h3>
    <div class="actions" style="margin-top:0;margin-bottom:12px">
      <button class="btn secondary" onclick="loadMyServers()">${ICO.refresh} Refresh</button>
      <button class="btn secondary" onclick="navTo('dashboard')">${ICO.back} Kembali</button>
    </div>
    <div id="myServersWrap"><div class="status" style="margin-top:0">Muat...</div></div></div></div>

  <div class="page" id="page-buy"><div class="card"><h3>${ICO.cart} Beli Panel</h3>
    <div class="hint" style="margin-bottom:14px">Mau resource lebih gede? Chat admin aja.</div>
    <div class="grid3">
      <div class="plan-card"><div class="title">Starter</div><div class="price">Rp 2.000<small>/bulan</small></div><ul><li>2 GB RAM</li><li>5 GB Disk</li><li>1 Server</li></ul></div>
      <div class="plan-card"><div class="title">Pro</div><div class="price">Rp 5.000<small>/bulan</small></div><ul><li>5 GB RAM</li><li>15 GB Disk</li><li>3 Server</li></ul></div>
      <div class="plan-card"><div class="title">Ultimate</div><div class="price">Rp 8.000<small>/bulan</small></div><ul><li>10 GB RAM</li><li>30 GB Disk</li><li>5 Server</li></ul></div>
    </div>
    <div class="actions">
      <a class="btn green" href="https://t.me/habalzy" target="_blank">${ICO.send} Chat Admin</a>
      <button class="btn secondary" onclick="navTo('dashboard')">${ICO.back} Kembali</button>
    </div>
  </div></div>

  <div class="page" id="page-admin-users"><div class="card"><h3>${ICO.users} Daftar User</h3>
    <div class="actions" style="margin-top:0;margin-bottom:12px">
      <button class="btn secondary" onclick="loadAdminUsers(1)">${ICO.refresh} Refresh</button>
      <button class="btn secondary" onclick="navTo('dashboard')">${ICO.back} Kembali</button>
    </div>
    <div id="adminUsersWrap"><div class="status" style="margin-top:0">Klik Refresh.</div></div>
    <div class="pager" id="adminUsersPager" style="display:none">
      <button id="auPrev">← Sebelumnya</button><span id="auPageInfo">Halaman 1</span><button id="auNext">Berikutnya →</button>
    </div></div></div>

  <div class="page" id="page-admin-servers"><div class="card"><h3>${ICO.chart} Semua Server</h3>
    <div class="actions" style="margin-top:0;margin-bottom:12px">
      <button class="btn secondary" onclick="loadAdminServers(1)">${ICO.refresh} Refresh</button>
      <button class="btn secondary" onclick="navTo('dashboard')">${ICO.back} Kembali</button>
    </div>
    <div id="adminServersWrap"><div class="status" style="margin-top:0">Klik Refresh.</div></div>
    <div class="pager" id="adminServersPager" style="display:none">
      <button id="asPrev">← Sebelumnya</button><span id="asPageInfo">Halaman 1</span><button id="asNext">Berikutnya →</button>
    </div></div></div>

  <div class="page" id="page-admin-suspicious"><div class="card"><h3>${ICO.alert} Server Aneh</h3>
    <div class="hint" style="margin-bottom:12px">Server yang kelihatan janggal bakal muncul di sini.</div>
    <div class="actions" style="margin-top:0;margin-bottom:12px">
      <button class="btn secondary" onclick="scanSuspicious()">${ICO.search} Cek Sekarang</button>
      <button class="btn secondary" onclick="navTo('dashboard')">${ICO.back} Kembali</button>
    </div>
    <div id="suspiciousWrap"><div class="status" style="margin-top:0">Klik Cek Sekarang.</div></div></div></div>

  <div class="page" id="page-admin-alerts"><div class="card"><h3>${ICO.bell} Riwayat Masalah</h3>
    <div class="actions" style="margin-top:0;margin-bottom:12px">
      <button class="btn secondary" onclick="loadAlerts()">${ICO.refresh} Refresh</button>
      <button class="btn secondary" onclick="clearAlerts()">${ICO.trash} Hapus Semua</button>
      <button class="btn secondary" onclick="navTo('dashboard')">${ICO.back} Kembali</button>
    </div>
    <div id="alertsWrap"><div class="status" style="margin-top:0">Belum ada catatan.</div></div></div></div>

  <div class="page" id="page-admin-settings"><div class="card"><h3>${ICO.key} Setelan Panel</h3>
    <div class="hint" style="margin-bottom:12px">Isi data panel di sini. Cuma tersimpan di browser ini.</div>
    <div class="fields">
      <div class="field full"><label>Alamat Panel</label><input id="cfgPanel" placeholder="https://panel.domain.com"></div>
      <div class="field full"><label>API Key Panel</label><input id="cfgKey" type="password" placeholder="ptla_..."></div>
      <div class="field full"><label>Token Bot Telegram</label><input id="cfgTgToken" type="password" placeholder="123456:ABC..."></div>
      <div class="field full"><label>Chat ID Telegram</label><input id="cfgTgChat" placeholder="-100123456789"></div>
    </div>
    <div class="actions">
      <button class="btn" id="saveCfgBtn">${ICO.check} Simpan</button>
      <button class="btn secondary" id="testCfgBtn">${ICO.refresh} Cek Koneksi</button>
      <button class="btn secondary" onclick="navTo('dashboard')">${ICO.back} Kembali</button>
    </div>
    <div id="cfgStatus" class="status">Belum diisi.</div>
  </div></div>`;

  bindPageEvents();
  renderPlans();
  fillCfgForm();
}

function bindPageEvents(){
  $('reloadNestsBtn')?.addEventListener('click', loadNests);
  $('reloadNodesBtn')?.addEventListener('click', loadNodes);
  $('genPassBtn')?.addEventListener('click', () => {
    $('cPassword').value = generatePassword();
    notif('Password digenerate.');
  });
  $('createServerBtn')?.addEventListener('click', createServer);
  $('copyResultBtn')?.addEventListener('click', () => {
    navigator.clipboard.writeText($('createResultText').textContent);
    notif('Detail disalin.');
  });
  $('copyConsoleBtn')?.addEventListener('click', () => {
    const box = $('consoleBox');
    if(!box) return;
    const text = Array.from(box.querySelectorAll('.line'))
      .map(l => l.textContent)
      .join('\n');
    navigator.clipboard.writeText(text);
    notif('Console disalin.');
  });
  $('clearConsoleBtn')?.addEventListener('click', cClear);
  $('applyCustomPlan')?.addEventListener('click', () => {
    state.selectedPlan = {
      gb: 'custom', label: 'Custom',
      mem: Number($('customMem').value) || 2048,
      disk: Number($('customDisk').value) || 2048,
      cpu: Number($('customCpu').value) || 200,
    };
    notif('Pakai resource custom.');
  });
  $('auPrev')?.addEventListener('click', () => loadAdminUsers(state.pages.users - 1));
  $('auNext')?.addEventListener('click', () => loadAdminUsers(state.pages.users + 1));
  $('asPrev')?.addEventListener('click', () => loadAdminServers(state.pages.servers - 1));
  $('asNext')?.addEventListener('click', () => loadAdminServers(state.pages.servers + 1));
  $('saveCfgBtn')?.addEventListener('click', saveCfgForm);
  $('testCfgBtn')?.addEventListener('click', testCfgForm);
}

/* ================= NAV ================= */
function navTo(page){
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const target = $('page-' + page);
  if(target) target.classList.add('active');
  const nav = document.querySelector(`.nav-item[data-page="${page}"]`);
  if(nav) nav.classList.add('active');
  const titles = {
    dashboard: ['Beranda', 'Selamat datang'],
    create: ['Bikin Server', 'Pilih paket & isi data'],
    myservers: ['Server Gue', 'Daftar server punya lo'],
    buy: ['Beli Panel', 'Upgrade resource'],
    'admin-users': ['Daftar User', 'Semua user panel'],
    'admin-servers': ['Semua Server', 'Semua server panel'],
    'admin-suspicious': ['Server Aneh', 'Deteksi server janggal'],
    'admin-alerts': ['Riwayat Masalah', 'Catatan keamanan'],
    'admin-settings': ['Setelan Panel', 'Atur koneksi panel'],
  };
  const t = titles[page] || ['Balzy', ''];
  $('pageTitle').textContent = t[0];
  $('pageSub').textContent = t[1];
  $('sidebar').classList.remove('open');
  if(page === 'myservers') loadMyServers();
  if(page === 'admin-users') loadAdminUsers(1);
  if(page === 'admin-servers') loadAdminServers(1);
  if(page === 'admin-alerts') loadAlerts();
  if(page === 'create') { renderPlans(); loadEggs(); }
}

/* ================= PLANS ================= */
function renderPlans(){
  const grid = $('planGrid');
  if(!grid) return;
  grid.innerHTML = S.PLANS.map(p => `
    <div class="plan-card" data-gb="${p.gb}">
      <div class="title">${p.label}</div>
      <div class="price">${p.mem} MB <small>RAM</small></div>
      <ul><li>RAM ${p.mem} MB</li><li>Disk ${p.disk} MB</li><li>CPU ${p.cpu}%</li></ul>
    </div>`).join('');
  grid.querySelectorAll('.plan-card').forEach(c => {
    c.addEventListener('click', () => {
      grid.querySelectorAll('.plan-card').forEach(x => x.classList.remove('selected'));
      c.classList.add('selected');
      state.selectedPlan = S.PLANS.find(x => x.gb === Number(c.dataset.gb));
    });
  });
  const custom = $('adminCustomPlan');
  if(custom){
    if(state.user?.role === 'admin'){
      custom.style.display = 'block';
      $('planHint').textContent = 'Admin: pilih paket di atas atau isi custom.';
    } else {
      custom.style.display = 'none';
      $('planHint').textContent = 'Paket 10 GB otomatis full 10 GB.';
    }
  }
}

/* ================= EGGS ================= */
async function loadEggs(){
  const wrap = $('eggList');
  if(!wrap) return;
  wrap.innerHTML = '<div class="hint">Muat daftar egg...</div>';
  try {
    const d = await api('/nests?per_page=100');
    const nests = (d.data || []).map(x => x.attributes).filter(Boolean);
    if(!nests.length) throw new Error('Nggak ada nest.');
    let all = [];
    for(const n of nests){
      try {
        const ed = await api('/nests/' + n.id + '/eggs?per_page=100');
        (ed.data || []).map(x => x.attributes).filter(Boolean).forEach(e => {
          all.push({ nest: n.id, egg: e.id, name: e.name, desc: e.description || '' });
        });
      } catch{}
    }
    state.eggs = all;
    if(!all.length){ wrap.innerHTML = '<div class="hint">Nggak ada egg.</div>'; return; }
    wrap.innerHTML = all.map((e,i) => `
      <div class="egg-option" data-idx="${i}">
        <span class="egg-ico">${ICO.egg}</span>
        <div style="flex:1"><div class="egg-name">${escapeHtml(e.name)}</div>
          <div class="egg-desc">Nest ${e.nest} · Egg ${e.egg}</div></div>
      </div>`).join('');
    wrap.querySelectorAll('.egg-option').forEach(el => {
      el.addEventListener('click', () => {
        wrap.querySelectorAll('.egg-option').forEach(x => x.classList.remove('selected'));
        el.classList.add('selected');
        state.selectedEgg = state.eggs[Number(el.dataset.idx)];
      });
    });
  } catch(e){
    wrap.innerHTML = '<div class="status err" style="margin-top:0">' + escapeHtml(e.message) + '</div>';
  }
}

/* ================= CREATE ================= */
async function createServer(){
  const btn = $('createServerBtn');
  btn.disabled = true;
  $('createResult').style.display = 'none';
  cClear();

  const t0 = Date.now();
  try {
    // ===== VALIDASI FORM =====
    cStep('Validasi form...');
    if(!state.selectedPlan) throw new Error('Pilih paket dulu.');
    if(!state.selectedNest) throw new Error('Pilih nest dulu.');
    if(!state.selectedEgg) throw new Error('Pilih egg dulu.');
    if(!state.selectedNode) throw new Error('Pilih node dulu.');
    if(!state.selectedAllocation) throw new Error('Pilih allocation dulu.');

    const un = $('cUsername').value.trim();
    const em = $('cEmail').value.trim();
    const pw = $('cPassword').value;
    const sn = $('cServerName').value.trim() || 'Balzy Server';
    if(!un || !em || !pw) throw new Error('Username, email, password jangan kosong.');
    if(pw.length < 8) throw new Error('Password minimal 8 karakter.');

    const p = state.selectedPlan;
    if(state.user.role !== 'admin'){
      if(p.mem < 1024 || p.mem > 10240) throw new Error('User cuma boleh 1–10 GB RAM.');
      if(p.disk < 1024 || p.disk > 10240) throw new Error('User cuma boleh 1–10 GB Disk.');
    }
    cOk(`Form valid — paket ${p.label}, RAM ${p.mem} MB`);

    // ===== AMBIL VARIABEL EGG =====
    cStep('Kumpulkan variabel egg...');
    const env = {};
    $('eggVars')?.querySelectorAll('[data-var]').forEach(el => {
      env[el.dataset.var] = el.value;
    });
    if(!Object.keys(env).length){
      (state.selectedEgg.variables || []).forEach(v => { env[v.env_variable] = v.default_value; });
    }
    cOk(`Variabel egg: ${Object.keys(env).length} item`);

    // ===== BUAT AKUN =====
    cStep('Buat akun panel...');
    cLog(`Username: ${un} | Email: ${em}`, 'info');
    const u = await api('/users', { method:'POST', body: JSON.stringify({
      email: em, username: un, first_name: 'Panel', last_name: 'User', password: pw
    })});
    const ownerId = u.attributes?.id;
    if(!ownerId) throw new Error('User ID nggak ketemu di respons.');
    cOk(`Akun dibuat — User ID: ${ownerId}`);

    // ===== BUAT SERVER =====
    cStep('Buat server di panel...');
    cLog(`Nest: ${state.selectedNest.name}`, 'info');
    cLog(`Egg: ${state.selectedEgg.name}`, 'info');
    cLog(`Node: ${state.selectedNode.name}`, 'info');
    cLog(`Allocation: ${state.selectedAllocation.ip}:${state.selectedAllocation.port}`, 'info');

    const payload = {
      name: sn,
      user: ownerId,
      egg: state.selectedEgg.id,
      docker_image: state.selectedEgg.docker_image || 'ghcr.io/parkervcp/yolks:nodejs_20',
      startup: state.selectedEgg.startup || 'node /home/container/index.js',
      environment: env,
      limits: { memory: p.mem, swap: 0, disk: p.disk, io: 500, cpu: p.cpu },
      feature_limits: { databases: 0, backups: 1, allocations: 0 },
      allocation: { default: state.selectedAllocation.id }
    };

    const s = await api('/servers', { method:'POST', body: JSON.stringify(payload) });
    const a = s.attributes || {};
    cOk(`Server dibuat — ID: ${a.id} | Identifier: ${a.identifier || '-'}`);

    // ===== SIMPAN MAPPING =====
    cStep('Simpan mapping owner...');
    let map = {};
    try { map = JSON.parse(localStorage.getItem('balzy_owner_map') || '{}'); } catch{}
    map[a.id] = { ownerId, username: un, email: em };
    localStorage.setItem('balzy_owner_map', JSON.stringify(map));
    cOk('Mapping tersimpan di browser');

    // ===== HASIL =====
    const durasi = ((Date.now() - t0) / 1000).toFixed(1);
    cStep('Selesai dalam ' + durasi + ' detik');
    cOk('SERVER BERHASIL DIBUAT');

    const lines = [
      '═══════════════════════════════',
      '  BALZY PRIVATE SERVER',
      '═══════════════════════════════',
      'PANEL: ' + location.origin,
      '',
      '— AKUN PANEL —',
      'USERNAME: ' + un,
      'EMAIL: ' + em,
      'PASSWORD: ' + pw,
      'USER ID: ' + ownerId,
      '',
      '— SERVER —',
      'NAMA: ' + (a.name || sn),
      'SERVER ID: ' + (a.id || '-'),
      'IDENTIFIER: ' + (a.identifier || '-'),
      '',
      '— KONFIGURASI —',
      'NEST: ' + (state.selectedNest.name || '-'),
      'EGG: ' + (state.selectedEgg.name || '-'),
      'NODE: ' + (state.selectedNode.name || '-'),
      'ALLOCATION: ' + state.selectedAllocation.ip + ':' + state.selectedAllocation.port,
      'RAM: ' + p.mem + ' MB',
      'DISK: ' + p.disk + ' MB',
      'CPU: ' + p.cpu + '%',
      '═══════════════════════════════',
      'Dibuat: ' + new Date().toLocaleString('id-ID')
    ].join('\n');

    $('createResultText').textContent = lines;
    $('createResult').style.display = 'block';
    notif('Server jadi.');

  } catch(e){
    cErr('GAGAL: ' + e.message);
    cLog('Proses dihentikan.', 'warn');
    logSecurity('CREATE_FAILED', e.message);
  } finally {
    btn.disabled = false;
  }
}

/* ================= MY SERVERS ================= */
async function loadMyServers(){
  const wrap = $('myServersWrap');
  if(!wrap) return;
  wrap.innerHTML = '<div class="status" style="margin-top:0">Muat...</div>';
  try {
    let map = {};
    try { map = JSON.parse(localStorage.getItem('balzy_owner_map') || '{}'); } catch{}
    const myIds = new Set(
      Object.entries(map)
        .filter(([_, v]) => v.username === state.user.username || v.email === state.user.email)
        .map(([id]) => Number(id))
    );
    const d = await api('/servers?per_page=100');
    const rows = (d.data||[]).map(x=>x.attributes).filter(Boolean);
    const mine = state.user.role === 'admin' ? rows : rows.filter(s => myIds.has(s.id));
    if(!mine.length){
      wrap.innerHTML = '<div class="status" style="margin-top:0">Belum ada server. <a href="#" onclick="navTo(\'create\');return false" style="color:#ff9ca5">Bikin dulu</a>.</div>';
      return;
    }
    wrap.innerHTML = '<table><thead><tr><th>ID</th><th>Nama</th><th>RAM</th><th>Disk</th><th>CPU</th><th>Status</th></tr></thead><tbody>' +
      mine.map(s => `<tr>
        <td><code>${s.id}</code></td>
        <td><b>${escapeHtml(s.name||'-')}</b><br><span class="hint">${escapeHtml(s.identifier||'')}</span></td>
        <td>${(s.limits?.memory||0)===0?'∞':(s.limits.memory/1024).toFixed(1)+' GB'}</td>
        <td>${(s.limits?.disk||0)===0?'∞':(s.limits.disk/1024).toFixed(1)+' GB'}</td>
        <td>${(s.limits?.cpu||0)===0?'∞':s.limits.cpu+'%'}</td>
        <td><span class="pill ${s.status==='active'?'green':'gray'}">${s.status||'active'}</span></td>
      </tr>`).join('') + '</tbody></table>';
  } catch(e){ wrap.innerHTML = '<div class="status err" style="margin-top:0">' + escapeHtml(e.message) + '</div>'; }
}

/* ================= ADMIN USERS ================= */
async function loadAdminUsers(page=1){
  const wrap = $('adminUsersWrap');
  if(!wrap) return;
  wrap.innerHTML = '<div class="status" style="margin-top:0">Muat...</div>';
  try {
    const d = await api('/users?per_page=' + S.PER_PAGE + '&page=' + page);
    const rows = (d.data||[]).map(x=>x.attributes).filter(Boolean);
    const meta = d.meta?.pagination || {};
    state.pages.users = meta.current_page || page;
    const total = meta.total_pages || 1;
    if(!rows.length){ wrap.innerHTML = '<div class="status" style="margin-top:0">Nggak ada user.</div>'; $('adminUsersPager').style.display='none'; return; }
    wrap.innerHTML = '<table><thead><tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Server</th><th>Aksi</th></tr></thead><tbody>' +
      rows.map(u => `<tr>
        <td><code>${u.id}</code></td>
        <td><b>${escapeHtml(u.username||'-')}</b></td>
        <td>${escapeHtml(u.email||'-')}</td>
        <td>${u.root_admin ? '<span class="pill red">ROOT</span>' : '<span class="pill gray">user</span>'}</td>
        <td>${u.server_count ?? '-'}</td>
        <td><button class="btn secondary small" onclick="delUser(${u.id})">${ICO.trash}</button></td>
      </tr>`).join('') + '</tbody></table>';
    $('adminUsersPager').style.display = 'flex';
    $('auPageInfo').textContent = `Halaman ${state.pages.users} / ${total}`;
    $('auPrev').disabled = state.pages.users <= 1;
    $('auNext').disabled = state.pages.users >= total;
  } catch(e){ wrap.innerHTML = '<div class="status err" style="margin-top:0">' + escapeHtml(e.message) + '</div>'; }
}
async function delUser(id){
  if(!confirm('Hapus user ID ' + id + '?')) return;
  try { await api('/users/' + id, { method:'DELETE' }); notif('User dihapus.'); loadAdminUsers(state.pages.users); }
  catch(e){ notif('Gagal: ' + e.message, 'err'); }
}

/* ================= ADMIN SERVERS ================= */
async function loadAdminServers(page=1){
  const wrap = $('adminServersWrap');
  if(!wrap) return;
  wrap.innerHTML = '<div class="status" style="margin-top:0">Muat...</div>';
  try {
    const d = await api('/servers?per_page=' + S.PER_PAGE + '&page=' + page);
    const rows = (d.data||[]).map(x=>x.attributes).filter(Boolean);
    const meta = d.meta?.pagination || {};
    state.pages.servers = meta.current_page || page;
    const total = meta.total_pages || 1;
    if(!rows.length){ wrap.innerHTML = '<div class="status" style="margin-top:0">Nggak ada server.</div>'; $('adminServersPager').style.display='none'; return; }
    wrap.innerHTML = '<table><thead><tr><th>ID</th><th>Nama</th><th>Owner</th><th>RAM</th><th>Disk</th><th>CPU</th><th>Status</th><th>Aksi</th></tr></thead><tbody>' +
      rows.map(s => `<tr>
        <td><code>${s.id}</code></td>
        <td><b>${escapeHtml(s.name||'-')}</b></td>
        <td>${s.user ?? '-'}</td>
        <td>${(s.limits?.memory||0)===0?'∞':(s.limits.memory/1024).toFixed(1)+' GB'}</td>
        <td>${(s.limits?.disk||0)===0?'∞':(s.limits.disk/1024).toFixed(1)+' GB'}</td>
        <td>${(s.limits?.cpu||0)===0?'∞':s.limits.cpu+'%'}</td>
        <td><span class="pill ${s.status==='active'?'green':'gray'}">${s.status||'active'}</span></td>
        <td>
          <button class="btn secondary small" onclick="suspendServer(${s.id}, true)">${ICO.pause}</button>
          <button class="btn secondary small" onclick="suspendServer(${s.id}, false)">${ICO.play}</button>
          <button class="btn secondary small" onclick="delServer(${s.id})">${ICO.trash}</button>
        </td>
      </tr>`).join('') + '</tbody></table>';
    $('adminServersPager').style.display = 'flex';
    $('asPageInfo').textContent = `Halaman ${state.pages.servers} / ${total}`;
    $('asPrev').disabled = state.pages.servers <= 1;
    $('asNext').disabled = state.pages.servers >= total;
  } catch(e){ wrap.innerHTML = '<div class="status err" style="margin-top:0">' + escapeHtml(e.message) + '</div>'; }
}
async function suspendServer(id, suspend){
  try { await api('/servers/' + id + '/suspend', { method:'POST', body: JSON.stringify({ suspended: suspend }) });
    notif(suspend ? 'Server dimatiin.' : 'Server dinyalain.'); loadAdminServers(state.pages.servers);
  } catch(e){ notif('Gagal: ' + e.message, 'err'); }
}
async function delServer(id){
  if(!confirm('Hapus server ID ' + id + '?')) return;
  try { await api('/servers/' + id, { method:'DELETE' }); notif('Server dihapus.'); loadAdminServers(state.pages.servers); }
  catch(e){ notif('Gagal: ' + e.message, 'err'); }
}

/* ================= SUSPICIOUS ================= */
async function scanSuspicious(){
  const wrap = $('suspiciousWrap');
  if(!wrap) return;
  wrap.innerHTML = '<div class="status" style="margin-top:0">Ngecek...</div>';
  try {
    const d = await api('/servers?per_page=100');
    const rows = (d.data||[]).map(x=>x.attributes).filter(Boolean);
    const suspicious = [];
    for(const s of rows){
      const mem = s.limits?.memory ?? 0, cpu = s.limits?.cpu ?? 0;
      const name = (s.name||'').toLowerCase();
      const reasons = [];
      if(mem >= 4096 && cpu > 0 && cpu < 50) reasons.push('RAM tinggi CPU rendah');
      if(S.SUSPICIOUS_NAME_REGEX.test(name)) reasons.push('Nama janggal');
      if(mem > 10240) reasons.push('RAM lewat batas user');
      if((s.limits?.disk||0) === 0) reasons.push('Disk unlimited');
      if(reasons.length) suspicious.push({ s, reasons });
    }
    if(!suspicious.length){
      wrap.innerHTML = '<div class="status ok" style="margin-top:0">Nggak ada server aneh.</div>';
      $('suspBadge').style.display='none'; return;
    }
    $('suspBadge').style.display=''; $('suspBadge').textContent = suspicious.length;
    wrap.innerHTML = '<table><thead><tr><th>ID</th><th>Nama</th><th>RAM</th><th>CPU</th><th>Alasan</th><th>Aksi</th></tr></thead><tbody>' +
      suspicious.map(({s, reasons}) => `<tr>
        <td><code>${s.id}</code></td>
        <td><b>${escapeHtml(s.name||'-')}</b></td>
        <td>${(s.limits?.memory||0)===0?'∞':(s.limits.memory/1024).toFixed(1)+' GB'}</td>
        <td>${s.limits?.cpu||0}%</td>
        <td>${reasons.map(r => '<span class="pill warn">'+r+'</span>').join(' ')}</td>
        <td>
          <button class="btn secondary small" onclick="suspendServer(${s.id}, true)">${ICO.pause}</button>
          <button class="btn secondary small" onclick="delServer(${s.id})">${ICO.trash}</button>
        </td>
      </tr>`).join('') + '</tbody></table>';
  } catch(e){ wrap.innerHTML = '<div class="status err" style="margin-top:0">' + escapeHtml(e.message) + '</div>'; }
}
function refreshSuspBadge(){
  try {
    const arr = JSON.parse(localStorage.getItem('balzy_alerts') || '[]');
    const bf = arr.filter(a => a.event === 'BRUTE_FORCE').length;
    if(bf > 0){ $('suspBadge').style.display=''; $('suspBadge').textContent = bf; }
  } catch{}
}

/* ================= ALERTS ================= */
function loadAlerts(){
  const wrap = $('alertsWrap');
  if(!wrap) return;
  let arr = [];
  try { arr = JSON.parse(localStorage.getItem('balzy_alerts') || '[]'); } catch{}
  if(!arr.length){ wrap.innerHTML = '<div class="status" style="margin-top:0">Belum ada catatan.</div>'; return; }
  wrap.innerHTML = '<table><thead><tr><th>Waktu</th><th>Event</th><th>Detail</th></tr></thead><tbody>' +
    arr.map(a => `<tr><td>${new Date(a.ts).toLocaleString('id-ID')}</td>
      <td><span class="pill ${a.event==='BRUTE_FORCE'?'red':'warn'}">${a.event}</span></td>
      <td>${escapeHtml(a.detail)}</td></tr>`).join('') + '</tbody></table>';
}
function clearAlerts(){
  if(!confirm('Hapus semua catatan?')) return;
  localStorage.removeItem('balzy_alerts'); loadAlerts(); $('suspBadge').style.display='none';
}

/* ================= SETTINGS ================= */
function fillCfgForm(){
  const c = loadCfg();
  if($('cfgPanel')) $('cfgPanel').value = c.panel || '';
  if($('cfgKey')) $('cfgKey').value = c.key || '';
  if($('cfgTgToken')) $('cfgTgToken').value = c.tgToken || '';
  if($('cfgTgChat')) $('cfgTgChat').value = c.tgChat || '';
}
function saveCfgForm(){
  saveCfg({
    panel: $('cfgPanel').value.trim().replace(/\/+$/,''),
    key: $('cfgKey').value.trim(),
    tgToken: $('cfgTgToken').value.trim(),
    tgChat: $('cfgTgChat').value.trim(),
  });
  $('cfgStatus').textContent = 'Disimpan.';
  $('cfgStatus').className = 'status ok';
  notif('Setelan disimpan.');
}
async function testCfgForm(){
  saveCfgForm();
  $('cfgStatus').textContent = 'Ngecek koneksi...';
  $('cfgStatus').className = 'status';
  try {
    await api('/users?per_page=1');
    $('cfgStatus').textContent = 'Koneksi berhasil. Panel merespons.';
    $('cfgStatus').className = 'status ok';
  } catch(e){
    $('cfgStatus').textContent = 'Gagal: ' + e.message;
    $('cfgStatus').className = 'status err';
  }
}

/* ================= API STATUS ================= */
async function checkApiStatus(){
  const box = $('apiStatusBox');
  if(!box) return;
  box.textContent = 'Ngecek...'; box.className = 'status';
  try {
    await api('/users?per_page=1');
    box.textContent = 'Panel online. Koneksi lancar.';
    box.className = 'status ok'; $('statApi').textContent = 'ON';
  } catch(e){
    box.textContent = 'Panel offline. ' + e.message;
    box.className = 'status err'; $('statApi').textContent = 'OFF';
  }
}

/* ================= EXPOSE ================= */
Object.assign(window, {
  navTo, checkApiStatus, loadAdminUsers, loadAdminServers, delUser, delServer,
  suspendServer, scanSuspicious, loadAlerts, clearAlerts, loadMyServers,
  loadNests, loadNodes, loadEggsByNest, loadAllocations
});
