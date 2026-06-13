import { Router } from "express";
import { getUsers, getUserById, updateUser, deleteUser } from "../controllers/userController";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.get("/", requireAuth , getUsers);
router.get("/:id", getUserById);
router.put("/:id", requireAuth , updateUser);
router.delete("/:id", requireAuth , deleteUser);

export default router;