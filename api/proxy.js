export const config = { runtime: 'edge' };

const ENV_PANEL = (process.env.PANEL_URL || '').replace(/\/+$/, '');
const ENV_KEY = process.env.PTERO_API_KEY || '';
const ADMIN_PIN = process.env.ADMIN_PIN || '';
const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TG_CHAT = process.env.TELEGRAM_CHAT_ID || '';
const APP_URL = process.env.APP_URL || '';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,DELETE,PUT,PATCH,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Pin, X-Panel-Url, X-Api-Key, X-Username',
};

const USER_MAX_MB = 10240;
const USER_MIN_MB = 1024;

export default async function handler(req) {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });

  const PANEL = (req.headers.get('x-panel-url') || ENV_PANEL).replace(/\/+$/, '');
  const API_KEY = req.headers.get('x-api-key') || ENV_KEY;
  if (!PANEL || !API_KEY) return json({ error: 'Panel belum diatur.' }, 500);

  const url = new URL(req.url);
  const path = url.searchParams.get('path');
  if (!path || !path.startsWith('/')) return json({ error: 'Parameter path tidak valid.' }, 400);

  const adminPin = req.headers.get('x-admin-pin') || '';
  const isAdmin = ADMIN_PIN && adminPin === ADMIN_PIN;

  // ===== IDENTITAS REQUEST =====
  const username = req.headers.get('x-username') || 'guest';
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    req.headers.get('cf-connecting-ip') ||
    'unknown';
  const userAgent = req.headers.get('user-agent') || '-';

  // ===== ATURAN AKSES =====
  if (!isAdmin) {
    let blocked = false;
    let reason = '';

    if (req.method === 'GET' && path.startsWith('/users')) {
      blocked = true;
      reason = 'Coba lihat daftar user';
    }
    else if (req.method === 'DELETE' && (path.startsWith('/users') || path.startsWith('/servers'))) {
      blocked = true;
      reason = 'Coba hapus ' + (path.startsWith('/users') ? 'user' : 'server');
    }
    else if (req.method === 'POST' && /^\/servers\/\d+\/suspend/.test(path)) {
      blocked = true;
      reason = 'Coba suspend/unsuspend server';
    }
    else if ((req.method === 'PATCH' || req.method === 'PUT') && path.startsWith('/users')) {
      blocked = true;
      reason = 'Coba ubah data user';
    }

    if (blocked) {
      await notify(
        `🚨 *Akses ditolak*\n` +
        `Alasan: ${reason}\n` +
        `Method: ${req.method}\n` +
        `Path: ${path}\n` +
        `User: ${username}\n` +
        `IP: ${ip}\n` +
        `UA: ${userAgent.slice(0, 80)}\n` +
        `Waktu: ${new Date().toLocaleString('id-ID')}`,
        true
      );
      return json({ error: 'Akses ditolak.' }, 403);
    }
  }

  // ===== VALIDASI RESOURCE SAAT BUAT SERVER =====
  if (req.method === 'POST' && path === '/servers' && !isAdmin) {
    let body;
    try { body = await req.clone().json(); } catch {}
    if (body?.limits) {
      const mem = Number(body.limits.memory || 0);
      const disk = Number(body.limits.disk || 0);
      if (mem < USER_MIN_MB || mem > USER_MAX_MB) {
        await notify(
          `⚠️ *Percobaan lewat batas resource*\n` +
          `RAM diminta: ${mem} MB (batas ${USER_MIN_MB}-${USER_MAX_MB})\n` +
          `Nama server: ${body.name || '-'}\n` +
          `User: ${username}\n` +
          `IP: ${ip}\n` +
          `Waktu: ${new Date().toLocaleString('id-ID')}`,
          true
        );
        return json({ error: `RAM harus ${USER_MIN_MB}-${USER_MAX_MB} MB.` }, 400);
      }
      if (disk < USER_MIN_MB || disk > USER_MAX_MB) {
        await notify(
          `⚠️ *Percobaan lewat batas resource*\n` +
          `Disk diminta: ${disk} MB (batas ${USER_MIN_MB}-${USER_MAX_MB})\n` +
          `Nama server: ${body.name || '-'}\n` +
          `User: ${username}\n` +
          `IP: ${ip}\n` +
          `Waktu: ${new Date().toLocaleString('id-ID')}`,
          true
        );
        return json({ error: `Disk harus ${USER_MIN_MB}-${USER_MAX_MB} MB.` }, 400);
      }
      if (Number(body.limits.cpu || 0) > 1000) body.limits.cpu = 1000;
    }
  }

  // ===== TERUSKAN KE PANEL =====
  const target = PANEL + '/api/application' + path;
  const init = {
    method: req.method,
    headers: {
      'Authorization': 'Bearer ' + API_KEY,
      'Accept': 'Application/vnd.pterodactyl.v1+json',
      'Content-Type': 'application/json',
    },
  };
  if (req.method !== 'GET' && req.method !== 'HEAD') init.body = await req.text();

  let res;
  try { res = await fetch(target, init); }
  catch (e) {
    await notify(`❌ *Panel tidak bisa dihubungi*\n${e.message}\nUser: ${username}\nIP: ${ip}`, false);
    return json({ error: 'Panel tidak bisa dihubungi.' }, 502);
  }

  const text = await res.text();

  // ===== NOTIFIKASI EVENT PENTING =====
  if (res.ok && req.method === 'POST') {
    try {
      const data = JSON.parse(text);
      if (path === '/servers' && data.attributes) {
        const a = data.attributes;
        await notify(
          `🖥️ *Server baru dibuat*\n` +
          `Nama: ${a.name}\n` +
          `ID: ${a.id}\n` +
          `RAM: ${a.limits?.memory} MB\n` +
          `Disk: ${a.limits?.disk} MB\n` +
          `User: ${username}\n` +
          `IP: ${ip}`,
          false
        );
      }
      if (path === '/users' && data.attributes) {
        const a = data.attributes;
        await notify(
          `👤 *Akun panel baru*\n` +
          `Username: ${a.username}\n` +
          `Email: ${a.email}\n` +
          `Dibuat oleh: ${username}\n` +
          `IP: ${ip}`,
          false
        );
      }
    } catch {}
  }

  if (res.ok && req.method === 'DELETE') {
    await notify(
      `🗑️ *Data dihapus*\n` +
      `Path: ${path}\n` +
      `Oleh: ${username}\n` +
      `IP: ${ip}`,
      true
    );
  }

  return new Response(text, {
    status: res.status,
    headers: { ...CORS, 'Content-Type': res.headers.get('content-type') || 'application/json' },
  });
}

/* ============================================================
   KIRIM PESAN KE TELEGRAM
   ============================================================ */
async function notify(text, withButtons = false) {
  if (!TG_TOKEN || !TG_CHAT) return;
  try {
    const body = { chat_id: TG_CHAT, text, parse_mode: 'Markdown' };
    if (withButtons && APP_URL) {
      body.reply_markup = {
        inline_keyboard: [
          [
            { text: '⏸️ Suspend', callback_data: 'menu:suspend' },
            { text: '🗑️ Hapus', callback_data: 'menu:delete' },
          ],
          [
            { text: '🚫 Ban User', callback_data: 'menu:ban' },
            { text: '✅ Unban', callback_data: 'menu:unban' },
          ],
          [{ text: '📊 Buka Panel', url: APP_URL }],
        ],
      };
    } else if (withButtons) {
      body.reply_markup = {
        inline_keyboard: [
          [
            { text: '⏸️ Suspend', callback_data: 'menu:suspend' },
            { text: '🗑️ Hapus', callback_data: 'menu:delete' },
          ],
          [
            { text: '🚫 Ban User', callback_data: 'menu:ban' },
            { text: '✅ Unban', callback_data: 'menu:unban' },
          ],
        ],
      };
    }
    await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {}
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status, headers: { ...CORS, 'Content-Type': 'application/json' }
  });
  }
