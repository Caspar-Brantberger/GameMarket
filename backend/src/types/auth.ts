import {PublicUser} from "./user";

export type RegisterRequest = {
    username: string;
    email: string;
    password: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type AuthResponse = {
    user: PublicUser;
    token?:string;
};
