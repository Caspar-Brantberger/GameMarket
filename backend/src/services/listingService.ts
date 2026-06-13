import {
    findAllListings,
    findListingById,
    createListing,
    updateListing,
    deleteListing,
    type CreateListingData,
    type UpdateListingData,
} from "../repositories/listingRepository";

export async function getAllListings() {
    return findAllListings();
}

export async function getListing(id: string) {
    return findListingById(id);
}

export async function createNewListing(
    listing: CreateListingData
) {
    return createListing(listing);
}

export async function updateExistingListing(
    id: string,
    updatedData: UpdateListingData
) {
    return updateListing(id, updatedData);
}

export async function deleteExistingListing(
    id: string
): Promise<boolean> {
    return deleteListing(id);
}