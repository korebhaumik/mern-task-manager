import { Response } from "express";
import config from "config";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { client } from "./connect";

//signAccessToken fnc
export function signAccessToken(res: Response, id: string) {
  const PRIVATE_KEY = config.get<string>("PRIVATE_KEY");
  const token = jwt.sign({ id }, PRIVATE_KEY, { expiresIn: "10s" });
  res.cookie("accessToken", token, {
    httpOnly: true,
    // maxAge: 10000, //10 sec
    // maxAge: 3600000, // 1 hr
    maxAge: 172800000, // 2days
  });
}

//signRefreshToken fnc
export async function signRefreshToken(res: Response, email: string): Promise<void> {
    const refreshToken = uuidv4();
    await client.set(email, refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 172800000, // 2days
      // secure: true,
    });
}
