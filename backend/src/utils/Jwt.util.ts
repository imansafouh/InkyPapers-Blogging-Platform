import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET || "your-secret";
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "90d";

export function generateToken(payload: string | Buffer | object): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as SignOptions);
}

export function verifyToken(token: string): string | jwt.JwtPayload {
  return jwt.verify(token, JWT_SECRET);
}
