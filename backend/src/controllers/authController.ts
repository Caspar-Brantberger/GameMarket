import type {Request, Response} from "express";
import type {LoginRequest,RegisterRequest} from "../types/auth";
import {registerUser, loginUser, logoutUser} from "../services/authService";
import type { AuthenticatedRequest } from "../middleware/requireAuth";
import { getUserById } from "../repositories/userRepository";

export async function register(req: Request, res: Response) {
    try {
        const data: RegisterRequest = req.body;
        const authResponse =  await registerUser(data);
        res.status(201).json(authResponse);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

export async function login(req: Request, res: Response) {
        try {
    const data: LoginRequest = req.body;
    const authResponse = await loginUser(data);

    if (!authResponse.token) {
        throw new Error("Token was not created");
    }

    res.cookie("accessToken", authResponse.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
        user: authResponse.user,
    });
    } catch (error) {
    return res.status(401).json({
        error: (error as Error).message,
    });
    }
}

export  async function logout(req: Request, res: Response) {
    res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    });

    return res.status(200).json({
    message: "User logged out successfully",
    });
}

export async function getCurrentUser(
    req: AuthenticatedRequest,
    res: Response
) {
    try {
    if (!req.userId) {
        return res.status(401).json({
        error: "Authentication required",
        });
    }

    const user = await getUserById(req.userId);

    if (!user) {
        return res.status(404).json({
        error: "User not found",
        });
    }

    const { passwordHash, ...publicUser } = user;

    return res.status(200).json({
        user: publicUser,
    });
    } catch {
    return res.status(500).json({
        error: "Could not fetch current user",
    });
    }
}
