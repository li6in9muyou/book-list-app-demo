export function textSearch<T>(
  query: string,
  hay: T[],
  getKey: (item: T) => string,
  options = { ignoreCase: true, useRegex: false }
): {
  results: T[];
  success: boolean;
  error: { detail: string };
} {
  const { ignoreCase, useRegex } = options;

  let _getKey = getKey;
  let queryRgx: RegExp;

  try {
    if (!useRegex && !ignoreCase) {
      queryRgx = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "");
    } else if (!useRegex && ignoreCase) {
      queryRgx = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    } else if (useRegex && !ignoreCase) {
      queryRgx = new RegExp(query, "");
    } else if (useRegex && ignoreCase) {
      queryRgx = new RegExp(query, "i");
    }
  } catch (e) {
    return {
      results: [],
      success: false,
      error: {
        detail: "正则表达式写错了",
      },
    };
  }

  let predicate = (key: string) => queryRgx.test(key);
  let success = true;
  const ans = hay.filter((item) => {
    const key = _getKey(item);
    try {
      success = true;
      return predicate(key);
    } catch (e) {
      success = false;
      return false;
    }
  });
  return {
    results: ans,
    success: success,
    error: { detail: "" },
  };
}
