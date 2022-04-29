import { derived, get, writable } from "svelte/store";
import { localStorage, persist } from "@macfja/svelte-persistent-store";
import jwt_decode from "jwt-decode";

export const CurrentUsername = persist(
  writable(""),
  localStorage(),
  "CurrentUser"
);

export const CurrentUserId = persist(
  writable(0),
  localStorage(),
  "CurrentUserId"
);

async function fetchAccessTokenWithRefresh(refresh: string): Promise<Token> {
  const endpoint = "/accounts/api/jwt/refresh";
  const q = await fetch(import.meta.env.VITE_DEV_DB_URL + endpoint, {
    method: "POST",
    body: JSON.stringify({
      refresh,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const obj = await q.json();

  if (q.ok) {
    return { refresh, access: obj.access };
  } else {
    throw { ...obj, message: obj.detail };
  }
}

export const CurrentRefreshToken = persist(
  writable(""),
  localStorage(),
  "CurrentRefreshToken"
);

let __access = "";

export async function CurrentAccessToken() {
  const { exp } = jwt_decode(get(CurrentRefreshToken));
  if (Date.now() > exp) {
    console.log("refresh");
    __access = (await fetchAccessTokenWithRefresh(get(CurrentRefreshToken)))
      .access;
  }
  console.log("no need to refresh");
  return __access;
}

export const CurrentUserInfo = derived(
  [CurrentUserId, CurrentUsername],
  (s) => ({
    id: s[0],
    username: s[1],
  })
);

export const isAuthenticated = derived(CurrentUsername, (user) => {
  return user.length > 0;
});

export interface Token {
  access: string;
  refresh: string;
}
