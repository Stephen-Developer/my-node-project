import { UserModel } from "../models/userModel";
import { UserService } from "./userService";
import { UserController } from "../controllers/userController";
import { UserRouter } from "../routes/userRoutes";
import { pool } from "../db";

//Authentication Service Instances
export const UserModelInstance = new UserModel(pool);
export const UserServiceInstance = new UserService(UserModelInstance);
export const UserControllerInstance = new UserController(UserServiceInstance);
export const UserRouterInstance = new UserRouter(UserControllerInstance);