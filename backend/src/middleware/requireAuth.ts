import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
    userId: string;
};

export interface AuthenticatedRequest<
    Params = Record<string, string>
> extends Request<Params> {
    userId?: string;
}

export function requireAuth(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    try {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({
        error: "Authentication required",
        });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    req.userId = decoded.userId;

    next();
    } catch {
    return res.status(401).json({
        error: "Invalid or expired token",
    });
    }
}