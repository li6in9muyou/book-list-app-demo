import { derived, Writable, writable } from "svelte/store";
import { split, trim } from "lodash/string";
import { isEmpty } from "lodash";
import { subscribe } from "svelte/internal";
import { debounce } from "lodash/function.js";

class UserInfo {
  id: number;
  email: string;

  displayName(): string {
    return split(this.email, "@")[0];
  }

  static displayNameToEmail = (name) => `${trim(name)}@dev.dev`;

  constructor(
    obj: { id: number; displayName: string } = { id: 0, displayName: "" }
  ) {
    const { id, displayName } = obj;
    this.id = id;
    this.email = `${displayName}@dev.dev`;
  }
}

class EmptyUserInfo extends UserInfo {
  id = 0;
  email = "";
}

export let CurrentUserInfo = writable(new EmptyUserInfo());

export let CurrentAccessToken = writable("");

export let CurrentUser = derived<Writable<UserInfo>, string>(
  CurrentUserInfo,
  (user) => {
    return user.displayName;
  }
);

export const isAuthenticated = derived<Writable<UserInfo>, boolean>(
  CurrentUserInfo,
  (user) => {
    return user.displayName.length > 0;
  }
);

export const displayNameToEmail = (name) => `${trim(name)}@dev.dev`;

export const checkDisplayNameDoNotExists = debounce(
  async (displayName) => {
    const query =
      import.meta.env.VITE_DEV_DB_URL +
      `/api/users?email=${displayNameToEmail(displayName)}`;
    const querySet = await (await fetch(query)).json();
    return isEmpty(querySet);
  },
  1000,
  { trailing: false }
);

export class UserInfoAndToken {
  accessToken: string;
  user: UserInfo;

  successToken(): boolean {
    return !isEmpty(this.user) && this.accessToken !== "";
  }

  constructor(user: UserInfo, token: string) {
    this.user = user;
    this.accessToken = token;
  }
}

export function persistUser(u: UserInfoAndToken) {
  CurrentAccessToken.set(u.accessToken);
  CurrentUserInfo.set(u.user);
}

subscribe(CurrentUserInfo, (value) => {
  localStorage.setItem("userInfo", JSON.stringify(value));
});

subscribe(CurrentAccessToken, (value) => {
  localStorage.setItem("accessToken", JSON.stringify(value));
});

export function restoreUser() {
  const u = JSON.parse(localStorage.getItem("userInfo"));
  const t = JSON.parse(localStorage.getItem("accessToken"));
  if (!isEmpty(u) && !isEmpty(t)) {
    CurrentAccessToken.set(t);
    CurrentUserInfo.set(new UserInfo());
  }
}

export async function createUser(dpm, pwd): Promise<UserInfoAndToken> {
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
  if (q.ok) {
    const { user, accessToken } = await q.json();
    return new UserInfoAndToken(user, accessToken);
  } else {
    throw await q.json();
  }
}

export async function loginUser(dpm, pwd): Promise<UserInfoAndToken> {
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
  if (q.ok) {
    return (await q.json()) as UserInfoAndToken;
  } else {
    throw await q.json();
  }
}

export const logout = async () => {
  CurrentUserInfo.set(new EmptyUserInfo());
  CurrentAccessToken.set("");
};
