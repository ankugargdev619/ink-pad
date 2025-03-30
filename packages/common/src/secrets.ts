import dotenv from "dotenv";
dotenv.config();

export const SERVER_PORT = process.env.SERVER_PORT || 3001;
export const SALT_ROUNDS = process.env.SALT_ROUNDS || 5;
export const JWT_PASS = process.env.JWT_PASS || "JWT_PASS";