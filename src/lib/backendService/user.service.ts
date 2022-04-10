import { derived, Readable, Writable, writable } from "svelte/store";
import { split, trim } from "lodash/string";
import { isEmpty } from "lodash";
import { subscribe } from "svelte/internal";
import { debounce } from "lodash/function.js";

class UserInfo {
  id: number;
  email: string;

  get displayName() {
    return split(this.email, "@")[0];
  }

  static displayNameToEmail = (name) => `${trim(name)}@dev.dev`;

  constructor(id = 2000, displayName = "") {
    this.id = id;
    this.email = `${displayName}@dev.dev`;
  }
}

class EmptyUserInfo extends UserInfo {
  id = 0;
  email = "";
}

export let CurrentUserInfo: Writable<UserInfo>;
export let CurrentAccessToken: Writable<string>;
export let CurrentUser: Readable<string>;

if (import.meta.env.DEV) {
  CurrentUserInfo = writable(new UserInfo(1000, "li6q"));
} else {
  CurrentUserInfo = writable(new UserInfo());
}

CurrentUser = derived<Writable<UserInfo>, string>(
  CurrentUserInfo,
  (cu) => cu.displayName
);
CurrentAccessToken = writable("");
export const isAuthenticated = derived<Readable<string>, boolean>(
  CurrentUser,
  (user) => user.length > 0
);

export const displayNameToEmail = (name) => `${trim(name)}@dev.dev`;

export const checkDisplayNameDoNotExists = debounce(async (displayName) => {
  const query =
    import.meta.env.VITE_DEV_DB_URL +
    `/api/users?email=${displayNameToEmail(displayName)}`;
  const querySet = await (await fetch(query)).json();
  return isEmpty(querySet);
}, 500);

export function persistUser(obj) {
  const { user: userInfo, accessToken } = obj;
  if (userInfo === undefined || accessToken === undefined) {
  }
  CurrentAccessToken.set(accessToken);
  CurrentUserInfo.set(userInfo);
}

export async function createUser(dpm, pwd) {
  const q = await fetch(import.meta.env.VITE_DEV_DB_URL + `/api/users/`, {
    method: "POST",
    body: JSON.stringify({
      email: displayNameToEmail(dpm),
      password: pwd,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await q.json();
}

export async function loginUser(dpm, pwd) {
  const q = await fetch(import.meta.env.VITE_DEV_DB_URL + "/login", {
    method: "POST",
    body: JSON.stringify({
      email: displayNameToEmail(dpm),
      password: pwd,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await q.json();
}

subscribe(CurrentUserInfo, (value) => {
  localStorage.setItem("userInfo", JSON.stringify(value));
});

subscribe(CurrentAccessToken, (value) => {
  localStorage.setItem("accessToken", JSON.stringify(value));
});

export function successToken(obj) {
  return obj.user !== undefined && obj.accessToken !== undefined;
}

export const logout = async () => {
  CurrentUserInfo.set(new EmptyUserInfo());
  CurrentAccessToken.set("");
};
