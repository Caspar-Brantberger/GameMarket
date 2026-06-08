import prisma from "../lib/prisma";
import type { PublicUser } from "../types/user";

type CreateUserData = {
  username: string;
  email: string;
  passwordHash: string;
};

type UpdateUserData = {
  username?: string;
  email?: string;
};

const publicUserSelect = {
  id: true,
  username: true,
  email: true,
  createdAt: true,
  updatedAt: true,
} as const;

export async function createUser(
  userData: CreateUserData
): Promise<PublicUser> {
  return prisma.user.create({
    data: userData,
    select: publicUserSelect,
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function getAllUsers(): Promise<PublicUser[]> {
  return prisma.user.findMany({
    select: publicUserSelect,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function updateUser(
  id: string,
  updatedData: UpdateUserData
): Promise<PublicUser | undefined> {
  try {
    return await prisma.user.update({
      where: { id },
      data: updatedData,
      select: publicUserSelect,
    });
  } catch {
    return undefined;
  }
}

export async function deleteUser(id: string): Promise<boolean> {
  try {
    await prisma.user.delete({
      where: { id },
    });

    return true;
  } catch {
    return false;
  }
}

