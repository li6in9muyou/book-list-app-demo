import { get } from "svelte/store";
import {
  CurrentAccessToken,
  CurrentRefreshToken,
  CurrentUserId,
  CurrentUsername,
} from "./stores";
import { debounce, defaultTo, flatten, flow, join, values } from "lodash";

interface Token {
  access: string;
  refresh: string;
}

export async function fetchToken(
  username: string,
  password: string
): Promise<Token> {
  const endpoint = "/accounts/api/jwt/create";
  const q = await fetch(import.meta.env.VITE_DEV_DB_URL + endpoint, {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const obj = await q.json();

  if (q.ok) {
    return obj;
  } else {
    if (q.status === 401) {
      if (!(await usernameExists(username)).status) {
        throw { message: `${username}还没有注册过` };
      } else {
        throw { message: "用户名和密码不匹配" };
      }
    } else {
      throw { ...obj, message: obj.detail };
    }
  }
}

interface UserProfile {
  id: number;
  username: string;
}

export async function fetchProfile(): Promise<UserProfile> {
  const endpoint = "/accounts/api/users/me/";
  const q = await fetch(import.meta.env.VITE_DEV_DB_URL + endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${get(CurrentAccessToken)}`,
    },
  });
  const obj = await q.json();
  if (!q.ok) {
    throw { ...obj, message: obj.detail };
  }
  return { id: obj.id, username: obj.username };
}

export async function loginUser(username: string, password: string) {
  const obj = await fetchToken(username, password);
  CurrentAccessToken.set(obj.access);
  CurrentRefreshToken.set(obj.refresh);
  const { id, username: u } = await fetchProfile();
  CurrentUserId.set(id);
  CurrentUsername.set(u);
}

export async function createUser(username: string, password: string) {
  const endpoint = "/accounts/api/users/";
  const q = await fetch(import.meta.env.VITE_DEV_DB_URL + endpoint, {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!q.ok) {
    const errors = flow(values, flatten, join)(await q.json());
    throw { message: errors };
  }
  const { id, username: u } = await q.json();
  CurrentUserId.set(id);
  CurrentUsername.set(u);
  const { access, refresh } = await fetchToken(username, password);
  CurrentAccessToken.set(access);
  CurrentRefreshToken.set(refresh);
}

export const usernameExists = debounce(
  async (displayName) => {
    const query =
      import.meta.env.VITE_DEV_DB_URL +
      `/accounts/exists?username=${displayName}`;
    const q = await (await fetch(query)).json();
    return defaultTo(q.status, false);
  },
  1000,
  { leading: true }
);
