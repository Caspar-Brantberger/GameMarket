import type { GameListing } from "../types/listing";

// This is a placeholder for the actual database operations
// In a real application, you would replace this with actual database queries
const listings: GameListing[] = [
    {
    id: "1",
    title: "Batman: Arkham Knight",
    description: "I am Batman!",
    price: 19.99,
    platform: "PC",
    imageUrl: "/images/batman.jpg",
    genre: "Science Fiction",
    condition: "New",
    sellerId: "seller-1",
    sellerName: "Superman",
    sellerEmail: "superman@example.com",
    status: "Available",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    location: "Texas",
    },
];

export function findAllListings(): GameListing[] {
    return listings;
}

export function findListingById(id: string): GameListing | undefined {
    return listings.find(listing => listing.id === id);
}

export function createListing(
    listingData: Omit<GameListing, "id" | "createdAt" | "updatedAt">
): GameListing {
    const now = new Date().toISOString();

    const newListing: GameListing = {
    id: crypto.randomUUID(),
    ...listingData,
    createdAt: now,
    updatedAt: now,
    };

    listings.push(newListing);
    return newListing;
}

export function updateListing(id: string, updatedListing: Partial<GameListing>): GameListing | undefined {
    const listing = findListingById(id);
    if (listing) {
        Object.assign(listing, updatedListing, { updatedAt: new Date().toISOString() });
        return listing;
    }
    return undefined;
}

export function deleteListing(id: string): boolean {
    const index = listings.findIndex(listing => listing.id === id);
    if (index !== -1) {
        listings.splice(index, 1);
        return true;
    }
    return false;
}