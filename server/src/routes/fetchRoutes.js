import { Router } from "express";
import {
  fetchUserFriends,
  fetchMessages,
  findAndFetchUserFriends,
  addFriend
} from "../controllers/fetch-controller.js";
import verifyUser from "../middlewares/auth-middleware.js";

const fetchRoutes = Router();

fetchRoutes.post("/user-friends", verifyUser, fetchUserFriends);

fetchRoutes.post("/user-messages", verifyUser, fetchMessages);

fetchRoutes.post("/user-friend", verifyUser, findAndFetchUserFriends);

fetchRoutes.post("/add-friend", verifyUser, addFriend)

export default fetchRoutes;
