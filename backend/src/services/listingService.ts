import {
    findAllListings,
    findListingById,
    createListing,
    updateListing,
    deleteListing,
} from "../repositories/listingRepository";

import type { GameListing } from "../types/listing";

export function getAllListings(): GameListing[] {
    return findAllListings();
}

export function getListing(id: string): GameListing | undefined {
    return findListingById(id);
}

export function createNewListing(listing: GameListing): GameListing {
    return createListing(listing);
}

export function updateExistingListing(
    id: string,
    updatedData: Partial<GameListing>
): GameListing | undefined {
    return updateListing(id, updatedData);
}

export function deleteExistingListing(id: string): boolean {
    return deleteListing(id);
}
