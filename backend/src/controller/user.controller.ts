import { Request, Response } from "express";
import logger from "../utils/logger";
import createUser from "../service/createUser";
import authenticateUser from "../service/authUser";
import { signAccessToken, signRefreshToken } from "../utils/signToken";
import getUserData from "../service/getUserData";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const userInstance = await createUser(req.body);

    //Signing Jwts
    signAccessToken(res, userInstance.email);
    await signRefreshToken(res, userInstance.email);

    res.status(200).json(userInstance);
  } catch (error: any) {
    logger.error(error);
    res.status(400).json({ name: error.name, message: error.message });
  }
}

export async function loginUserHandler(req: Request, res: Response) {
  try {
    const userInstance = await authenticateUser(req.body);

    //Signing Jwts
    signAccessToken(res, userInstance.email);
    await signRefreshToken(res, userInstance.email);

    res.status(200).json(userInstance);
  } catch (error: any) {
    logger.error(error);
    res.status(400).json({ name: error.name,type: error.type ,message: error.message });
  }
}

export async function getUserHandler(req: Request, res: Response) {
  try {
    //@ts-ignore
    const email: string = req.userEmail;
    const userInstance = await getUserData(email);

    res.status(200).json(userInstance);
  } catch (error: any) {
    logger.error(error);
    res.status(400).json({ name: error.name, message: error.message });
  }
}

export async function logoutUserHandler(req: Request, res: Response) {
  try {
    //Clearing Cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.sendStatus(200);
  } catch (error: any) {
    logger.error(error);
    res.status(400).json({ name: error.name, message: error.message });
  }
}
