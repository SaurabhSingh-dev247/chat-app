import { Router } from "express";
import {
  signInUser,
  signInUserVerify,
  signUpUser,
  signUpUserVerify,
} from "../controllers/authController.js";
import refreshSessionToken from "../controllers/refresh-controller.js";
import logoutUser from "../controllers/logout-controller.js";

const authRouter = Router();

authRouter.post("/signin", signInUser);

authRouter.post("/signup", signUpUser);

authRouter.post("/signin/verify", signInUserVerify);

authRouter.post("/signup/verify", signUpUserVerify);

authRouter.post("/refresh", refreshSessionToken);

authRouter.post("/logout", logoutUser);

export default authRouter;
