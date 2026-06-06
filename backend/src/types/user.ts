export type User = {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    createdAt: string;
    updatedAt: string;

};

export type PublicUser = Omit<User, "passwordHash">;
