import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

function getSecrets() {
  const access = process.env.ACCESS_TOKEN_SECRET;
  const refresh = process.env.REFRESH_TOKEN_SECRET;
  if (!access || !refresh) {
    throw new Error(
      "Missing JWT secrets. Ensure ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET are set."
    );
  }
  return { access, refresh };
}

export const signAccessToken = (userId: string, opts?: jwt.SignOptions) => {
  const { access } = getSecrets();
  const signOpts: jwt.SignOptions = { expiresIn: "15m", ...(opts || {}) };
  return jwt.sign({ userId }, access, signOpts);
};

export const signRefreshToken = (userId: string, opts?: jwt.SignOptions) => {
  const { refresh } = getSecrets();
  const signOpts: jwt.SignOptions = { expiresIn: "7d", ...(opts || {}) };
  return jwt.sign({ userId }, refresh, signOpts);
};

export const verifyAccessToken = (token: string) => {
  const { access } = getSecrets();
  return jwt.verify(token, access) as JwtPayload;
};

export const verifyRefreshToken = (token: string) => {
  const { refresh } = getSecrets();
  return jwt.verify(token, refresh) as JwtPayload;
};
