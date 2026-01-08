import { Router } from "express";
import {
  signInUser,
  signInUserVerify,
  signUpUser,
  signUpUserVerify,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signin", signInUser);

authRouter.post("/signup", signUpUser);

authRouter.post("/signin/verify", signInUserVerify);

authRouter.post("/signup/verify", signUpUserVerify);

export default authRouter;
