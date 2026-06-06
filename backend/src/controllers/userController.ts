import type{Request, Response} from "express";
import { getUserProfile, getAllUserProfiles, updateUserProfile, deleteUserAccount } from "../services/userService";
import type {User} from "../types/user";

export function getUsers(req: Request, res: Response) {
    try {
    const users = getAllUserProfiles();

    return res.json(users);
    } catch (error) {
    return res.status(500).json({
        message: "Error fetching users",
        error,
    });
    }
}

export function getUserById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    try {
    const user = getUserProfile(id);

    return res.json(user);
    } catch (error) {
    return res.status(404).json({
        message: error instanceof Error ? error.message : "User not found",
    });
    }
}

export function updateUser(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const updatedData = req.body as Partial<Pick<User, "username" | "email">>;

    try {
    const updatedUser = updateUserProfile(id, updatedData);

    return res.json({
        message: "User updated successfully",
        ...updatedUser,
    });
    } catch (error) {
    return res.status(404).json({
        message: error instanceof Error ? error.message : "User not found",
    });
    }
}

export function deleteUser(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    try {
    deleteUserAccount(id);

    return res.json({
        message: "User deleted successfully",
    });
    } catch (error) {
    return res.status(404).json({
        message: error instanceof Error ? error.message : "User not found",
    });
    }
}
