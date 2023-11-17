import { Router } from "express";
import { login, register, refresh, logout } from "../controllers/user.controller";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/refresh", refresh);
router.post("/logout", logout);
export default router;
