import { Router } from "express";
import {
  signInUser,
  signUpUser,
} from "../controllers/authController.js";
import refreshSessionToken from "../controllers/refresh-controller.js";
import logoutUser from "../controllers/logout-controller.js";
import upload from "../util/multerConfig.js";

const authRouter = Router();

authRouter.post("/signin", signInUser);

authRouter.post("/signup", upload.single("avatar"), signUpUser);

// authRouter.post("/signin/verify", signInUserVerify);

// authRouter.post("/signup/verify", signUpUserVerify);

authRouter.post("/refresh", refreshSessionToken);

authRouter.post("/logout", logoutUser);

export default authRouter;
