export function sanitize(obj: any) {
  if (!obj || typeof obj !== "object") return obj;
  const result: any = {};
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (typeof v === "string") result[k] = v.trim();
    else result[k] = v;
  }
  return result;
}
