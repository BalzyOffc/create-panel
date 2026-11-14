export const config = { runtime: 'edge' };

const PANEL = (process.env.PANEL_URL || '').replace(/\/+$/, '');
const API_KEY = process.env.PTERO_API_KEY || '';
const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TG_CHAT = process.env.TELEGRAM_CHAT_ID || '';

export default async function handler(req) {
  if (req.method !== 'POST') return new Response('OK');
  let update;
  try { update = await req.json(); } catch { return new Response('OK'); }

  const chatId = update.callback_query?.message?.chat?.id || update.message?.chat?.id;
  if (String(chatId) !== String(TG_CHAT)) {
    await answerCallback(update.callback_query?.id, 'Akses ditolak.');
    return new Response('OK');
  }

  if (update.message?.text) {
    const text = update.message.text.trim();
    if (text === '/start' || text === '/help') {
      await sendMessage(
        `Perintah bot:\n\n` +
        `/suspend <id> — matiin server\n` +
        `/unsuspend <id> — nyalain server\n` +
        `/delete <id> — hapus server\n` +
        `/ban <user_id> — matiin semua server user\n` +
        `/unban <user_id> — nyalain semua server user\n` +
        `/stats — ringkasan panel\n` +
        `/servers — 10 server terbaru\n` +
        `/users — 10 user terbaru`
      );
      return new Response('OK');
    }
    const [cmd, arg] = text.split(/\s+/);
    try {
      if (cmd === '/suspend' && arg) { await suspendServer(arg, true); await sendMessage(`Server ${arg} dimatiin.`); }
      else if (cmd === '/unsuspend' && arg) { await suspendServer(arg, false); await sendMessage(`Server ${arg} dinyalain.`); }
      else if (cmd === '/delete' && arg) { await delServer(arg); await sendMessage(`Server ${arg} dihapus.`); }
      else if (cmd === '/ban' && arg) { await banUser(arg, true); await sendMessage(`User ${arg} dibanned.`); }
      else if (cmd === '/unban' && arg) { await banUser(arg, false); await sendMessage(`User ${arg} di-unban.`); }
      else if (cmd === '/stats') { await sendMessage(await stats()); }
      else if (cmd === '/servers') { await sendMessage(await listServers()); }
      else if (cmd === '/users') { await sendMessage(await listUsers()); }
    } catch (e) { await sendMessage('Gagal: ' + e.message); }
    return new Response('OK');
  }

  if (update.callback_query) {
    const data = update.callback_query.data || '';
    const [action, id] = data.split(':');
    try {
      if (action === 'suspend' && id) { await suspendServer(id, true); await answerCallback(update.callback_query.id, 'Server dimatiin'); }
      else if (action === 'unsuspend' && id) { await suspendServer(id, false); await answerCallback(update.callback_query.id, 'Server dinyalain'); }
      else if (action === 'delete' && id) { await delServer(id); await answerCallback(update.callback_query.id, 'Server dihapus'); }
      else if (action === 'ban' && id) { await banUser(id, true); await answerCallback(update.callback_query.id, 'User dibanned'); }
      else if (action === 'unban' && id) { await banUser(id, false); await answerCallback(update.callback_query.id, 'User di-unban'); }
      else { await answerCallback(update.callback_query.id, 'Pilih perintah'); }
    } catch (e) { await answerCallback(update.callback_query.id, 'Gagal: ' + e.message); }
  }

  return new Response('OK');
}

async function apiCall(path, options = {}) {
  if (!PANEL || !API_KEY) throw new Error('Panel belum diatur.');
  const res = await fetch(PANEL + '/api/application' + path, {
    ...options,
    headers: {
      'Authorization': 'Bearer ' + API_KEY,
      'Accept': 'Application/vnd.pterodactyl.v1+json',
      'Content-Type': 'application/json',
    }
  });
  const text = await res.text();
  let data = {}; try { data = text ? JSON.parse(text) : {}; } catch {}
  if (!res.ok) throw new Error(data.errors?.[0]?.detail || data.message || 'Kode ' + res.status);
  return data;
}

async function suspendServer(id, suspend) {
  return apiCall('/servers/' + id + '/suspend', { method: 'POST', body: JSON.stringify({ suspended: suspend }) });
}
async function delServer(id) { return apiCall('/servers/' + id, { method: 'DELETE' }); }
async function banUser(id, ban) {
  const s = await apiCall('/servers?per_page=100');
  const servers = (s.data || []).map(x => x.attributes).filter(x => x.user === Number(id));
  for (const srv of servers) await suspendServer(srv.id, ban);
  return servers.length;
}
async function stats() {
  const [s, u] = await Promise.all([apiCall('/servers?per_page=1'), apiCall('/users?per_page=1')]);
  return `Ringkasan panel\nServer: ${s.meta?.pagination?.total ?? '?'}\nUser: ${u.meta?.pagination?.total ?? '?'}`;
}
async function listServers() {
  const d = await apiCall('/servers?per_page=10');
  const rows = (d.data || []).map(x => x.attributes).filter(Boolean);
  if (!rows.length) return 'Belum ada server.';
  return '10 server terbaru:\n' + rows.map(s => `ID ${s.id} — ${s.name} — ${s.limits?.memory} MB`).join('\n');
}
async function listUsers() {
  const d = await apiCall('/users?per_page=10');
  const rows = (d.data || []).map(x => x.attributes).filter(Boolean);
  if (!rows.length) return 'Belum ada user.';
  return '10 user terbaru:\n' + rows.map(u => `ID ${u.id} — ${u.username} — ${u.email}`).join('\n');
}
async function sendMessage(text) {
  if (!TG_TOKEN || !TG_CHAT) return;
  await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TG_CHAT, text })
  });
}
async function answerCallback(id, text) {
  if (!TG_TOKEN || !id) return;
  await fetch(`https://api.telegram.org/bot${TG_TOKEN}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callback_query_id: id, text, show_alert: false })
  });
                                                 }
