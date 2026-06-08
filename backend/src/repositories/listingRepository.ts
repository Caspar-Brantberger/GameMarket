import prisma from "../lib/prisma";
import type {
    GamePlatform,
    ListingCondition,
    ListingStatus,
} from "../generated/prisma/client";

export type CreateListingData = {
    title: string;
    description: string;
    price: number;
    platform: GamePlatform;
    imageUrl: string;
    genre?: string;
    condition: ListingCondition;
    status?: ListingStatus;
    location: string;
    sellerId: string;
};

export type UpdateListingData = Partial<
    Omit<CreateListingData, "sellerId">
>;

export async function findAllListings() {
    return prisma.listing.findMany({
    include: {
    seller: {
        select: {
            id: true,
            username: true,
            email: true,
        },
        },
    },
    orderBy: {
        createdAt: "desc",
    },
    });
}

export async function findListingById(id: string) {
    return prisma.listing.findUnique({
    where: { id },
    include: {
        seller: {
        select: {
            id: true,
            username: true,
            email: true,
        },
        },
    },
    });
}

export async function createListing(data: CreateListingData) {
    return prisma.listing.create({
    data: {
        title: data.title,
        description: data.description,
        price: data.price,
        platform: data.platform,
        imageUrl: data.imageUrl,
        genre: data.genre,
        condition: data.condition,
        status: data.status ?? "AVAILABLE",
        location: data.location,
        sellerId: data.sellerId,
    },
    include: {
        seller: {
        select: {
            id: true,
            username: true,
            email: true,
        },
        },
    },
    });
}

export async function updateListing(
    id: string,
    data: UpdateListingData
) {
    try {
    return await prisma.listing.update({
        where: { id },
        data,
        include: {
        seller: {
            select: {
            id: true,
            username: true,
            email: true,
            },
        },
        },
    });
    } catch {
    return undefined;
    }
}

export async function deleteListing(id: string): Promise<boolean> {
    try {
    await prisma.listing.delete({
        where: { id },
    });

    return true;
    } catch {
    return false;
    }
}