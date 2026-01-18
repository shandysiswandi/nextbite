export const PERMISSION = {
  management: {
    users: "identity:management:users",
    iam: "identity:management:rbac",
  },
} as const;

export const ACTION = {
  read: "read",
  create: "create",
  update: "update",
  delete: "delete",
  import: "import",
  export: "export",
} as const;
