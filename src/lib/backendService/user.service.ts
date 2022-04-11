import { derived, Writable, writable } from "svelte/store";
import { split, trim } from "lodash/string";
import { isEmpty } from "lodash";
import { subscribe } from "svelte/internal";
import { debounce } from "lodash/function.js";

interface UserInfo {
  id: number;
  email: string;
  readonly displayName: string;
}

class ImplUserInfo implements UserInfo {
  email: string;
  id: number;

  get displayName() {
    return split(this.email, "@")[0];
  }

  constructor({ id, email }: { id: number; email: string }) {
    if (id && email) {
      this.id = id;
      this.email = email;
    } else {
      throw TypeError("bad type at UserInfo ctor");
    }
  }
}

class EmptyUserInfo implements UserInfo {
  id = 0;
  email = "";
  readonly displayName = "";
}

export let CurrentUserInfo = writable<UserInfo>(new EmptyUserInfo());

CurrentUserInfo.subscribe((value) =>
  console.log("CurrentUserInfo modified:", value)
);

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

const displayNameToEmail = (name) => `${trim(name)}@dev.dev`;

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

export interface UserInfoAndToken {
  accessToken: string;
  user: UserInfo;
  readonly successToken: boolean;
}

export class AuthPayloadFromServer implements UserInfoAndToken {
  accessToken: string;
  user: UserInfo;

  get successToken() {
    return !isEmpty(this.user) && this.accessToken !== "";
  }

  constructor({ user, accessToken }: { user: Object; accessToken: string }) {
    this.accessToken = accessToken;
    this.user = new ImplUserInfo(user as UserInfo);
  }
}

export function persistUser(u: UserInfoAndToken) {
  CurrentAccessToken.set(u.accessToken);
  CurrentUserInfo.set(u.user);
  console.log(u);
}

subscribe(CurrentUserInfo, (value) => {
  localStorage.setItem("userInfo", JSON.stringify(value));
});

subscribe(CurrentAccessToken, (value) => {
  localStorage.setItem("accessToken", JSON.stringify(value));
});

export function restoreUser() {
  const u: UserInfo = JSON.parse(localStorage.getItem("userInfo"));
  const t: string = JSON.parse(localStorage.getItem("accessToken"));
  if (!isEmpty(u) && !isEmpty(t)) {
    CurrentAccessToken.set(t);
    CurrentUserInfo.set(u);
  }
}

interface UserLogInChallenge {
  displayName: any;
  password: any;
}

async function authUser(
  endpoint: string,
  chg: UserLogInChallenge
): Promise<UserInfoAndToken> {
  const q = await fetch(import.meta.env.VITE_DEV_DB_URL + endpoint, {
    method: "POST",
    body: JSON.stringify({
      email: displayNameToEmail(chg.displayName),
      password: chg.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (q.ok) {
    return new AuthPayloadFromServer(await q.json());
  } else {
    throw await q.json();
  }
}

export const createUser = async (chg: UserLogInChallenge) =>
  await authUser("/api/users/", chg);

export const loginUser = async (chg: UserLogInChallenge) =>
  await authUser("/login", chg);

export const logout = async () => {
  CurrentUserInfo.set(new EmptyUserInfo());
  CurrentAccessToken.set("");
};

export const logout = async () => {
  CurrentUser.set("");
  CurrentUserId.set(0);
  CurrentAccessToken.set("");
};
