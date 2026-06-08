import type {Request, Response} from "express";
import type {LoginRequest,RegisterRequest} from "../types/auth";
import {registerUser, loginUser, logoutUser} from "../services/authService";

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
        res.status(200).json(authResponse);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

export  async function logout(req: Request, res: Response) {
    try {
    const response =  await logoutUser();

    return res.status(200).json(response);
    } catch (error) {
    return res.status(400).json({
        error: (error as Error).message,
    });
    }
}
