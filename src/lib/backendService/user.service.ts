import { derived, writable } from "svelte/store";
import { debounce, isEmpty, trim } from "lodash";
import { localStorage, persist } from "@macfja/svelte-persistent-store";

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

interface IAuthRequest {
  email: string;
  password: string;
}

interface IUserInfo {
  readonly displayName: string;
  readonly id: number;
}

export class UserAuthInput implements IAuthRequest {
  readonly displayName: string;
  readonly password: string;

  constructor({
    displayName,
    password,
  }: {
    displayName: string;
    password: string;
  }) {
    this.displayName = displayName;
    this.password = password;
  }

  get email() {
    return displayNameToEmail(this.displayName);
  }
}

class ServerAuthResponse implements IUserInfo {
  readonly displayName: string;
  readonly id: number;
  readonly accessToken: string;

  constructor(resp: {
    user: { email: string; id: number };
    accessToken: string;
  }) {
    this.displayName = resp.user.email.split("@")[0];
    this.id = resp.user.id;
    this.accessToken = resp.accessToken;
  }
}

export const CurrentUser = persist(writable(""), localStorage(), "CurrentUser");

export const CurrentUserId = persist(
  writable(0),
  localStorage(),
  "CurrentUserId"
);

export const CurrentAccessToken = persist(
  writable(""),
  localStorage(),
  "CurrentUserAccessToken"
);

export const isAuthenticated = derived(CurrentUser, (user) => {
  return user.length > 0;
});

export const CurrentUserInfo = derived(CurrentUserId, (id) => ({
  id: id,
}));

async function authUser(
  endpoint: string,
  chg: UserAuthInput
): Promise<ServerAuthResponse> {
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
    return new ServerAuthResponse(await q.json());
  } else {
    throw await q.json();
  }
}

export const createUser = async (dmp: string, pwd: string) => {
  return await authUser(
    "/api/users/",
    new UserAuthInput({ displayName: dmp, password: pwd })
  );
};

export const loginUser = async (dmp: string, pwd: string) => {
  const auth = await authUser(
    "/login",
    new UserAuthInput({ displayName: dmp, password: pwd })
  );
  CurrentUser.set(auth.displayName);
  CurrentUserId.set(auth.id);
  CurrentAccessToken.set(auth.accessToken);
};

export const logout = async () => {
  CurrentUser.set("");
  CurrentUserId.set(0);
  CurrentAccessToken.set("");
};
