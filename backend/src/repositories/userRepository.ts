import type {User, PublicUser} from "../types/user";

const users: User[] = [
    {
    id: "user-1",
    username: "caspar",
    email: "caspar@example.com",
    passwordHash: "password123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    },

];

function toPublicUser(user: User): PublicUser {
    const {passwordHash, ...publicUser} = user;
    return publicUser;
}

export const createUser = (userData: Omit<User, "id" | "createdAt" | "updatedAt">): PublicUser => {
    
    const newUser: User = {

        id: `user-${Date.now()}`,
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    return toPublicUser(newUser);
};

export const getUserByEmail = (email: string): User | undefined => {
    return users.find(user => user.email === email);
};

export const getUserById = (id: string): User | undefined => {
    return users.find(user => user.id === id);
};

export const getAllUsers = (): PublicUser[] => {
    return users.map(toPublicUser);
};


export const updateUser = (
    id: string,
    updatedData: Partial<Pick<User, "username" | "email">>
): PublicUser | undefined => {
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) return undefined;

    const updatedUser: User = {
    ...users[userIndex],
    ...updatedData,
    updatedAt: new Date().toISOString(),
    };

    users[userIndex] = updatedUser;

    return toPublicUser(updatedUser);
};

export const deleteUser = (id: string): boolean => {

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) return false;
    users.splice(userIndex, 1);
    return true;
};

