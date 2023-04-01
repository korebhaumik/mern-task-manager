import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import jwt from "jsonwebtoken";
import config from "config";
import { signAccessToken, signRefreshToken } from "../utils/signToken";
import logger from "../utils/logger";
import { client } from "../utils/connect";

///Schema
export const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      res.status(400).json(error);
    }
  };
 
//Types
type CookieType = {
  accessToken: string;
  refreshToken: string;
};
type TokenPayloadType = {
  id: string;
  iat: number;
  exp: number;
};

const PRIVATE_KEY = config.get<string>("PRIVATE_KEY");
const PRIVATE_REFRESH_KEY = config.get<string>("PRIVATE_REFRESH_KEY");

export function validateCookie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { accessToken, refreshToken }: CookieType = req.cookies;
    //Verify Access Token
    jwt.verify( accessToken, PRIVATE_KEY, async(error: jwt.VerifyErrors | null, decoded) => {
      if (!error) {
          const { id } = decoded as TokenPayloadType;
          //@ts-ignore
          req.userEmail = id;
          return next();

        } else if (error?.name === "TokenExpiredError") {
          const {id} = jwt.decode(accessToken) as TokenPayloadType;
          const realRefreshToken = await client.get(id);
          if(realRefreshToken === refreshToken){
            //Sign new cookies
            signAccessToken(res, id);
            await signRefreshToken(res, id);
            logger.info("Tokens upadated");
            //@ts-ignore
            req.userEmail = id;
            return next();
          }
          throw {type: "token", message:"Refresh Token Expired aur invalid!!"};
        } else {
          throw error;
        }
      }
    );
  } catch (error: any) {
    res.status(400).json({ name: error.name, message: error.message });
  }
}


