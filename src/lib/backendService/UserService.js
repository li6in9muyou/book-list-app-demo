import { derived, writable } from "svelte/store";
import { isEmpty } from "lodash/lang.js";
import { debounce } from "lodash/function.js";
import { subscribe } from "svelte/internal";
import { split } from "lodash";

export const checkEmailExists = debounce(async (email) => {
  const query = import.meta.env.VITE_DEV_DB_URL + `/api/users?email=${email}`;
  const querySet = await (await fetch(query)).json();
  return isEmpty(querySet);
}, 500);

export function successToken(obj) {
  return obj.user !== undefined && obj.accessToken !== undefined;
}

export function persistUser(obj) {
  const { user: userInfo, accessToken } = obj;
  if (userInfo === undefined || accessToken === undefined) {
  }
  CurrentAccessToken.set(accessToken);
  CurrentUserInfo.set(userInfo);
}

export async function createUser(eml, pwd) {
  const q = await fetch(import.meta.env.VITE_DEV_DB_URL + `/api/users/`, {
    method: "POST",
    body: JSON.stringify({
      email: eml,
      password: pwd,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await q.json();
}

export async function loginUser(eml, pwd) {
  const q = await fetch(import.meta.env.VITE_DEV_DB_URL + "/login", {
    method: "POST",
    body: JSON.stringify({
      email: eml,
      password: pwd,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await q.json();
}

export const CurrentUserInfo = writable({}, (set) => {
  set(JSON.parse(localStorage.getItem("userInfo")));
});

export const CurrentAccessToken = writable("", (set) => {
  set(JSON.parse(localStorage.getItem("accessToken")));
});

export const redirectUrl = writable("/");

subscribe(CurrentUserInfo, (value) => {
  localStorage.setItem("userInfo", JSON.stringify(value));
});

subscribe(CurrentAccessToken, (value) => {
  localStorage.setItem("accessToken", JSON.stringify(value));
});

export const CurrentUser = derived(CurrentUserInfo, (cu) => {
  if (cu == null) {
    return "";
  } else {
    return split(cu.email, "@")[0];
  }
});

export const isAuthenticated = derived(CurrentUserInfo, (cu) => cu !== null);
