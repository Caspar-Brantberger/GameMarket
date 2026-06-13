import type {LoginRequest, RegisterRequest, AuthResponse} from "../types/auth";
import {createUser, getUserByEmail} from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 12;

function createToken(userId: string) {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
    }

    return jwt.sign(
    { userId },
    jwtSecret,
    {
        expiresIn: "1h",
    }
    );
}

export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
    const existingUser = await getUserByEmail(data.email);

    if (existingUser) {
        throw new Error("Email already in use");
    }
    const passwordHash = await bcrypt.hash(
        data.password,
        SALT_ROUNDS
    );

    const user = await createUser({
    username: data.username,
    email: data.email,
    passwordHash,
    });

    return { user };
}

export async function loginUser(
    data: LoginRequest
): Promise<AuthResponse> {
    const user = await getUserByEmail(data.email);

    if (!user) {
    throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
    data.password,
    user.passwordHash
    );

    if (!isPasswordValid) {
    throw new Error("Invalid email or password");
    }

    const { passwordHash, ...publicUser } = user;

    const token = createToken(user.id);

    return {
    user: publicUser,
    token,
    };
}

export function logoutUser() {
    // In a real application, you would handle token invalidation or session management here.
    // For this mock implementation, we simply do nothing.
    return {message: "User logged out successfully",};
}
    


