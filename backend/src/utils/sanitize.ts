import xss from "xss";

export const sanitizeInput: (input: any) => any = (input: any) => {
  if (typeof input === "string") return xss(input);
  if (Array.isArray(input)) return input.map(sanitizeInput);
  if (typeof input === "object" && input !== null) {
    return Object.fromEntries(
      Object.entries(input).map(([k, v]) => [k, sanitizeInput(v)])
    );
  }
  return input;
};
