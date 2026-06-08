import { getAllUsers, getUserById, updateUser, deleteUser } from "../repositories/userRepository";
import type { AuthResponse } from "../types/auth";
import type { User } from "../types/user";

export async function getUserProfile(userId: string): Promise<AuthResponse> {
    const user = await getUserById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const { passwordHash, ...publicUser } = user;
    return { user: publicUser };
}


export async function getAllUserProfiles(): Promise<AuthResponse[]> {
    const users = await getAllUsers();
    return users.map(user => ({ user }));
}

export async function updateUserProfile(userId: string, data: Partial<Pick<User, "username" | "email">>): Promise<AuthResponse> {
    const updatedUser = await updateUser(userId, data);
    if (!updatedUser) {
        throw new Error("User not found");
    }
    return { user: updatedUser };
}

export async function deleteUserAccount(userId: string): Promise<void> {
    const user = await getUserById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    const success = await deleteUser(userId);
    if (!success) {
        throw new Error("Failed to delete user");
    }
}