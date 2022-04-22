import { Readable, readable } from "svelte/store";
import type { addNotification } from "svelte-notifications/index";

export const takeExtension = (pp: string) => {
  try {
    return pp.match(/\.([0-9a-z]+)$/i)[1];
  } catch {
    return "unknown";
  }
};

export const fileNameWithoutExtension = (pp: string) => {
  const fileName = pp.split("\\").pop().split("/").pop();
  const parts = fileName.match(/(.*)\.([0-9a-z]+)$/i);
  if (null === parts) {
    return fileName;
  } else {
    return parts[1];
  }
};

export async function sleep(duration: number): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, duration));
}

export function getNotify({ addNotification }) {
  const buildOptions = (color, msg) => ({
    text: msg,
    removeAfter: 5000,
    position: "bottom-right",
    color: color,
  });
  return {
    dynamic: (id: string, store: Readable<any>) => {
      return addNotification({
        id,
        text: "placeholder",
        position: "bottom-right",
        dynamic: store,
      });
    },
    notify: (msg: string) => addNotification(buildOptions("", msg)),
    info: (msg: string) => addNotification(buildOptions("info", msg)),
    success: (msg: string) => addNotification(buildOptions("success", msg)),
    warning: (msg: string) => addNotification(buildOptions("warning", msg)),
    error: (msg: string) => addNotification(buildOptions("error", msg)),
  };
}

export const md = readable(true, (set) => {
  let stop = () => {};

  if (typeof window !== undefined) {
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    const setMatches = () => set(mediaQuery.matches);
    setMatches();
    mediaQuery.addEventListener("change", setMatches);
    stop = () => mediaQuery.removeEventListener("change", setMatches);
  }
  return stop;
});
