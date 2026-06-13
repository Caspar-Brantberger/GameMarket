
import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../middleware/requireAuth";

import {
    getUserProfile,
    getAllUserProfiles,
    updateUserProfile,
    deleteUserAccount,
} from "../services/userService";

import type { User } from "../types/user";

type UserParams = {
    id: string;
};

export async function getUsers(
    req: Request,
    res: Response
) {
    try {
    const users = await getAllUserProfiles();

    return res.status(200).json(users);
    } catch (error) {
    return res.status(500).json({
        message: "Error fetching users",
        error: error instanceof Error ? error.message : "Unknown error",
    });
    }
}

export async function getUserById(
    req: Request<UserParams>,
    res: Response
) {
    try {
    const { id } = req.params;
    const user = await getUserProfile(id);

    return res.status(200).json(user);
    }  catch (error) {
    return res.status(404).json({
        message:
        error instanceof Error
            ? error.message
            : "User not found",
    });
    }
}

export async function updateUser(
    req: AuthenticatedRequest<UserParams>,
    res: Response
) {
    try {
    const { id } = req.params;

    if (!req.userId) {
        return res.status(401).json({
        message: "Authentication required",
        });
    }

    if (req.userId !== id) {
        return res.status(403).json({
        message: "You are not allowed to update this user",
        });
    }

    const updatedData =
        req.body as Partial<Pick<User, "username" | "email">>;

    const updatedUser = await updateUserProfile(
        id,
        updatedData
    );

    return res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
    });
    } catch (error) {
    return res.status(404).json({
        message:
        error instanceof Error
            ? error.message
            : "User not found",
    });
    }
}

export async function deleteUser(
    req: AuthenticatedRequest<UserParams>,
    res: Response
) {
    try {
    const { id } = req.params;

    if (!req.userId) {
        return res.status(401).json({
        message: "Authentication required",
        });
    }

    if (req.userId !== id) {
        return res.status(403).json({
        message: "You are not allowed to delete this user",
        });
    }

    await deleteUserAccount(id);

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    return res.status(200).json({
        message: "User deleted successfully",
    });
    } catch (error) {
    return res.status(404).json({
        message:
        error instanceof Error
            ? error.message
            : "User not found",
    });
    }
}

