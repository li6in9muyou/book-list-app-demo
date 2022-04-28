import { Session } from "svelte-session-manager";
import { derived, writable } from "svelte/store";
import { localStorage, persist } from "@macfja/svelte-persistent-store";

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

export const CurrentAccessToken = writable("");

export const CurrentRefreshToken = persist(
  writable(""),
  localStorage(),
  "CurrentRefreshToken"
);

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

export const CurrentSession = new Session(localStorage);
