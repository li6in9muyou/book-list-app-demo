export const takeExtension = (pp) => {
  try {
    return pp.match(/\.([0-9a-z]+)$/i)[1];
  } catch {
    return "unknown";
  }
};

export const fileNameWithoutExtension = (pp) => {
  const fileName = pp.split("\\").pop().split("/").pop();
  const parts = fileName.match(/(.*)\.([0-9a-z]+)$/i);
  if (null === parts) {
    return fileName;
  } else {
    return parts[1];
  }
};

export async function sleep(duration) {
  await new Promise((resolve) => setTimeout(resolve, duration));
}

export function getNotify(addNotification) {
  const buildOptions = (color, msg) => ({
    text: msg,
    removeAfter: 5000,
    position: "bottom-right",
    color: color,
  });
  return {
    notify: (msg) => addNotification(buildOptions("", msg)),
    info: (msg) => addNotification(buildOptions("info", msg)),
    success: (msg) => addNotification(buildOptions("success", msg)),
    warning: (msg) => addNotification(buildOptions("warning", msg)),
    error: (msg) => addNotification(buildOptions("error", msg)),
  };
}
