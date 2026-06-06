import { getAllUsers, getUserById, updateUser, deleteUser } from "../repositories/userRepository";
import { AuthResponse } from "../types/auth";
import type { User } from "../types/user";

export function getUserProfile(userId: string): AuthResponse {
    const user = getUserById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const { passwordHash, ...publicUser } = user;
    return { user: publicUser };
}


export function getAllUserProfiles(): AuthResponse[] {
    const users = getAllUsers();
    return users.map(user => ({ user }));
}

export function updateUserProfile(userId: string, data: Partial<Pick<User, "username" | "email">>): AuthResponse {
    const updatedUser = updateUser(userId, data);
    if (!updatedUser) {
        throw new Error("User not found");
    }
    return { user: updatedUser };
}

export function deleteUserAccount(userId: string): void {
    const user = getUserById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const success = deleteUser(userId);
    if (!success) {
        throw new Error("Failed to delete user");
    }
}