import { Express, Request, Response } from "express";
import { client } from "./utils/connect";
import {
  addNoteHandler,
  removeNoteHandler,
} from "./controller/notes.controller";
import {
  createUserHandler,
  getUserHandler,
  loginUserHandler,
  logoutUserHandler,
} from "./controller/user.controller";
import { validateRequest, validateCookie } from "./middleware/validator";
import { AddNotesZodSchema, RemoveNotesZodSchema } from "./schema/notes.schema";
import { CreateUserZodSchema, LoginUserZodSchema } from "./schema/user.schema";

export default function routes(app: Express) {
  //heathcheck route
  app.get("/healthCheck", [
    (req: Request, res: Response) => {
      return res.status(200).send("Hello World");
    },
  ]);

  //Redis_test route
  app.post("/test", [
    async (req: Request, res: Response) => {
      const email = req.body.email;
      const password = req.body.password;
      const output = await client.set(email, password);
      const value = await client.get("korebhaumik@gmail.com");
      console.log(value);
      return res
        .status(200)
        .json({ message: "Data Cached successfully!", data: output });
    },
  ]);

  //Create a new user
  app.post("/createUser", [
    validateRequest(CreateUserZodSchema),
    createUserHandler,
  ]);

  //Login a user
  app.post("/loginUser", [
    validateRequest(LoginUserZodSchema),
    loginUserHandler,
  ]);

  //Get user data
  app.get("/getUser", [validateCookie, getUserHandler]);

  //Add a new note
  app.post("/addNote", [
    validateCookie,
    validateRequest(AddNotesZodSchema),
    addNoteHandler,
  ]);

  //Remove a new note
  app.delete("/removeNote/:id", [
    validateCookie,
    validateRequest(RemoveNotesZodSchema),
    removeNoteHandler,
  ]);

  //Logout a user
  app.get("/logoutUser", [logoutUserHandler]);
}
