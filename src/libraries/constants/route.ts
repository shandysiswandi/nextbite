export const ROUTE = {
  auth: {
    login: "/login",
    register: "/register",
    verifyEmail: "/verify-email",
    twoFactor: "/two-factor",
    twoFactorApp: "/two-factor/app",
    twoFactorRecovery: "/two-factor/recovery",
    twoFactorWebauthn: "/two-factor/webauthn",
    resetPassword: "/reset-password",
  },
  public: {
    home: "/",
    terms: "/terms",
    privacy: "/privacy",
  },
  console: {
    root: "/console",
    dashboard: "/console/dashboard",
    feature1: {
      page1: "/console/feature1/page1",
      page2: "/console/feature1/page2",
    },
    feature2: {
      page1: "/console/feature2/page1",
      page2: "/console/feature2/page2",
    },
    managements: {
      root: "/console/managements",
      users: "/console/managements/users",
      policies: "/console/managements/policies",
    },
    me: {
      root: "/console/me",
      notifications: "/console/me/notifications",
      settings: "/console/me/settings",
    },
  },
} as const;
