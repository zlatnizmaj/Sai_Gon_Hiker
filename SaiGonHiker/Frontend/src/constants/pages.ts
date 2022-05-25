export const LOGIN = "/login";

export const HOME = "/";
export const MANAGE_USER = {
  BASE: "/manage_user",
  CREATE: "/manage_user/create",
  EDIT: "/manage_user/edit/:id",
};

export const EDIT_USER_ID = (id: string | number) =>
  `/manage_user/edit/${id}`;

export const MANAGE_ASSET = {
  BASE: "/manage_asset",
  CREATE: "/manage_asset/create",
  EDIT: "/manage_asset/edit/:id",
};

export const EDIT_ASSET_ID = (id: string | number) =>
  `/manage_asset/edit/${id}`;

export const MANAGE_ASSIGNMENT = {
  BASE: "/manage_assignment",
  CREATE: "/manage_assignment/create",
  EDIT: "/manage_assignment/edit/:id",
};

export const MY_ASSIGNMENT = "/";

export const EDIT_ASSIGNMENT_ID = (id: string | number) =>
  `/manage_assignment/edit/${id}`;

export const NOTFOUND = "/notfound";

export const RETURNING = "/returning";
export const REPORT = "/report";

export const PAGENAME = {
  "/": "Home",
  [MANAGE_USER.BASE]: {
    "/": "Manage User",
    "/create": "Create new User",
    "/edit": "Edit User",
  },
  [MANAGE_ASSET.BASE]: {
    "/": "Manage Asset",
    "/create": "Create new Asset",
    "/edit": "Edit Asset",
  },
  [MANAGE_ASSIGNMENT.BASE]: {
    "/": "Manage Assignment",
    "/create": "Create new Assignment",
    "/edit": "Edit Assignment",
  },
  [RETURNING]: { "/": "Request for Returing" },
  [REPORT]: { "/": "Report" },
};
