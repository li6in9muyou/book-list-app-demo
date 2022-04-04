import { readable } from "svelte/store";
import { isEmpty } from "lodash/lang.js";
import { debounce } from "lodash/function.js";

export const CurrentUser = readable("li6q");

export const checkEmailExists = debounce(async (email) => {
  const query = import.meta.env.VITE_DEV_DB_URL + `/api/users?email=${email}`;
  const querySet = await (await fetch(query)).json();
  return isEmpty(querySet);
}, 500);

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
}
