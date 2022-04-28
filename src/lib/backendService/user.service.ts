import { debounce, trim } from "lodash";
import {
  CurrentAccessToken,
  CurrentUserId,
  CurrentUsername,
} from "../../components/userProfile/stores";

const displayNameToEmail = (name) => `${trim(name)}@dev.dev`;

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

async function authUser(
  endpoint: string,
  chg: UserAuthInput
): Promise<ServerAuthResponse> {
  const q = await fetch(import.meta.env.VITE_DEV_DB_URL + endpoint, {
    method: "POST",
    body: JSON.stringify({
      username: chg.displayName,
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

export const createUser = debounce(
  async (dmp: string, pwd: string) => {
    const auth = await authUser(
      "/api/users/",
      new UserAuthInput({ displayName: dmp, password: pwd })
    );
    CurrentUsername.set(auth.displayName);
    CurrentUserId.set(auth.id);
    CurrentAccessToken.set(auth.accessToken);
  },
  1000,
  { trailing: true }
);

export const authDebugUser = debounce(
  () => {
    CurrentUsername.set("debugUser");
    CurrentUserId.set(1000);
    CurrentAccessToken.set("");
  },
  1000,
  { leading: true }
);

export const loginUser = debounce(
  async (dmp: string, pwd: string) => {
    const auth = await authUser(
      "/accounts/api/jwt/create",
      new UserAuthInput({ displayName: dmp, password: pwd })
    );
    CurrentUsername.set(auth.displayName);
    CurrentUserId.set(auth.id);
    CurrentAccessToken.set(auth.accessToken);
  },
  1000,
  { leading: true }
);

export const logout = debounce(
  async () => {
    CurrentUsername.set("");
    CurrentUserId.set(0);
    CurrentAccessToken.set("");
  },
  1000,
  { leading: true }
);
