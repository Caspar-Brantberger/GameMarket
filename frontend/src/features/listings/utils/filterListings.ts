import type{ GameListing } from "@/types/listing";

export type ListingFilter = {
    platform?: string;
    maxPrice?: number;
    genre?: string;
    condition?: string;
    status?: string;
    location?: string;
};