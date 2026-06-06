import type {LoginRequest, RegisterRequest, AuthResponse} from "../types/auth";
import {createUser, getUserByEmail,getUserById,getAllUsers,updateUser,deleteUser} from "../repositories/userRepository";


export function registerUser(data: RegisterRequest): AuthResponse {
    const existingUser = getUserByEmail(data.email);

    if (existingUser) {
        throw new Error("Email already in use");
    }

    const user = createUser({
        username: data.username,
        email: data.email,
        passwordHash: data.password, // In a real app, hash the password!
    });
    return { user };
}

export function loginUser(data: LoginRequest): AuthResponse {

    const user = getUserByEmail(data.email);
    
    if(!user){
        throw new Error("Invalid email or password");
    }
    const isPasswordValid = user.passwordHash === data.password; // In a real app, compare hashed passwords!
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    if(user.passwordHash !== data.password){
        throw new Error("Invalid email or password");
    }
    const { passwordHash, ...publicUser } = user;
    return { user: publicUser };
}

export function logoutUser() {
    // In a real application, you would handle token invalidation or session management here.
    // For this mock implementation, we simply do nothing.
    return {message: "User logged out successfully",};
}
    


