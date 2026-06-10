"use client";

import { useEffect, useState } from "react";
import type { GameListing } from "@/types/listing";
import ListingGrid from "@/features/listings/components/ListingGrid";
import ListingFilters from "@/features/listings/components/ListingFilters";
import {
    filterListings,
    type ListingFilter,
} from "@/features/listings/utils/filterListings";

export default function ListingsPage() {
    const [listings, setListings] = useState<GameListing[]>([]);
    const [filters, setFilters] = useState<ListingFilter>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
    async function loadListings() {
        try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/listings`
        );

        if (!response.ok) {
            throw new Error("Could not fetch listings");
        }

        const data = await response.json();
        setListings(data);
        } catch (error) {
        setError(
            error instanceof Error
            ? error.message
            : "Something went wrong"
        );
        } finally {
        setLoading(false);
        }
    }

    loadListings();
    }, []);

    const filteredListings = filterListings(listings, filters);

    if (loading) {
    return <main className="p-10 text-white">Loading listings...</main>;
    }

    if (error) {
    return <main className="p-10 text-red-400">{error}</main>;
    }

    return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
        <section className="mx-auto max-w-6xl space-y-8">
        <h1 className="text-3xl font-bold">All listings</h1>

        <ListingFilters filters={filters} onChange={setFilters} />

        <p className="text-sm text-gray-400">
            Showing {filteredListings.length} of {listings.length} listings
        </p>
        
        {filteredListings.length > 0 ? (
        <ListingGrid listings={filteredListings} />
        ) : (
        <div className="rounded-xl border border-gray-700 bg-gray-900 p-6 text-center text-gray-400">
        No listings found.
        </div>
        )}

        <ListingGrid listings={filteredListings} />
        </section>
    </main>
    );
}