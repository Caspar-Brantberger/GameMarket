import { Router } from "express";
import { register, login, logout,getCurrentUser } from "../controllers/authController";
import { requireAuth } from "../middleware/requireAuth";
import rateLimit from "express-rate-limit";
import { loginSchema,registerSchema } from "../validation/authSchemas";
import { validateBody } from "../middleware/validateBody";

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


router.post("/register",authLimiter,validateBody(registerSchema) ,register);
router.post("/login",authLimiter,validateBody(loginSchema), login);
router.post("/logout", logout);
router.get("/me", requireAuth, getCurrentUser);

export default router;