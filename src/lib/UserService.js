import { readable } from "svelte/store";
import { isEmpty } from "lodash/lang.js";

export const CurrentUser = readable("li6q");

export async function checkEmailExists(email) {
  const query = import.meta.env.VITE_DEV_DB_URL + `/api/users?email=${email}`;
  const querySet = await (await fetch(query)).json();
  return isEmpty(querySet);
}
