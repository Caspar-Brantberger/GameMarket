import type{ GameListing } from "@/types/listing";

export type ListingFilter = {
    searchText?: string;
    platform?: string;
    maxPrice?: number;
    genre?: string;
    condition?: string;
    status?: string;
    location?: string;
};

export function filterListings(listings: 
    GameListing[], filters: ListingFilter) {

    return listings.filter((listing) => {

        if (filters.searchText && !listing.title.toLowerCase().includes(filters.searchText.toLowerCase())) {
            return false;
        }
        if (filters.platform && listing.platform !== filters.platform) {
            return false;
        }
        if (filters.maxPrice !== undefined && listing.price > filters.maxPrice) {
            return false;
        }
        if(filters.genre && !listing.genre?.toLowerCase().includes(filters.genre.toLowerCase())) {
            return false;
        }
        if (filters.condition && listing.condition !== filters.condition) {
            return false;
        }
        if (filters.status && listing.status !== filters.status) {
            return false;
        }
        if (filters.location && !listing.location.toLowerCase().includes(filters.location.toLowerCase())) {
            return false;
        }
        return true;
    });
}
