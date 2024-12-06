import express from "express";
import { getUser, login, logout, registerUser, updatePassword, updateUser } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/register",registerUser);
router.post("/login",login);
router.get("/logout",isAuthenticated,logout);
router.get("/getuser",isAuthenticated,getUser);
router.put("/update/profile",isAuthenticated,updateUser);
router.put("/update/password",isAuthenticated,updatePassword);

export default router;