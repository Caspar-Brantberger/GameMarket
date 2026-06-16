import { Router } from "express";
import { register, login, logout,getCurrentUser } from "../controllers/authController";
import { requireAuth } from "../middleware/requireAuth";
import rateLimit from "express-rate-limit";

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
    error: "Too many attempts. Please try again later.",
    },
});


router.post("/register",authLimiter ,register);
router.post("/login",authLimiter, login);
router.post("/logout", logout);
router.get("/me", requireAuth, getCurrentUser);

export default router;