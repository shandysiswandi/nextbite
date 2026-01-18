export const API_PATH = {
  identity: {
    login: "/api/v1/identity/login",
    loginMfa: "/api/v1/identity/login/2fa",
    refresh: "/api/v1/identity/refresh",

    register: "/api/v1/identity/register",
    registerResend: "/api/v1/identity/register/resend",
    registerVerify: "/api/v1/identity/register/verify",

    logout: "/api/v1/identity/logout",
    logoutAll: "/api/v1/identity/logout-all",

    password: {
      forgot: "/api/v1/identity/password/forgot",
      reset: "/api/v1/identity/password/reset",
      change: "/api/v1/identity/password/change",
    },

    mfa: {
      totp: {
        setup: "/api/v1/identity/mfa/totp/setup",
        confirm: "/api/v1/identity/mfa/totp/confirm",
      },
      backupCode: "/api/v1/identity/mfa/backup-code",
    },

    me: {
      profile: "/api/v1/identity/profile",
      settingsMfa: "/api/v1/identity/profile/settings/mfa",
      permissions: "/api/v1/identity/profile/permissions",
    },

    users: "/api/v1/identity/users",
    usersImport: "/api/v1/identity/users-import",
    usersExport: "/api/v1/identity/users-export",
  },
} as const;
