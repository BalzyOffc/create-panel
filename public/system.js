window.SYSTEM = {
  APP_NAME: 'BALZY PRIVATE SERVER',
  APP_VERSION: '2.1.0',

  ADMIN_USER: 'admin',
  ADMIN_PASS: 'balzyoffc',

// tambahan admin
  ADMIN_USER2: 'balzy',
  ADMIN_PASS2: 'balzyoffc',

  ADMIN_USER3: 'owner',
  ADMIN_PASS3: 'balzyoffc',
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_MS: 5 * 60 * 1000,

  // Hardcode — tidak muncul di UI
  ADMIN_PIN: 'balzyofficial',
  WORKER_PROXY: '/api/proxy',
  APP_URL: 'https://createpterodactyl-balzyoffc.vercel.app',

  PLANS: [
    { gb: 1,  label: '1 GB',  mem: 1024,  disk: 1024,  cpu: 100  },
    { gb: 2,  label: '2 GB',  mem: 2048,  disk: 2048,  cpu: 200  },
    { gb: 3,  label: '3 GB',  mem: 3072,  disk: 3072,  cpu: 300  },
    { gb: 4,  label: '4 GB',  mem: 4096,  disk: 4096,  cpu: 400  },
    { gb: 5,  label: '5 GB',  mem: 5120,  disk: 5120,  cpu: 500  },
    { gb: 10, label: '10 GB', mem: 10240, disk: 10240, cpu: 1000 },
  ],

  PER_PAGE: 20,
  SUSPICIOUS_NAME_REGEX: /test|ddos|brute|spam|hack|exploit|miner|mine/i,
};
