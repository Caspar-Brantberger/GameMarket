"use client";


import { useState } from "react";
import mockListings from "@/data/mockListings";
import ListingGrid from "@/features/listings/components/ListingGrid";
import ListingFilters from "@/features/listings/components/ListingFilters";
import { filterListings, type ListingFilter } from "@/features/listings/utils/filterListings";

export default function ListingsPage() {

    const  [filters, setFilters] = useState<ListingFilter>({});

    const filteredListings = filterListings(mockListings, filters);

    return(
        <main className="min-h-screen bg-black px-6 py-10 text-white">
            <section  className="mx-auto max-w-6xl space-y-8">
                <div>
                    <p className="text-sm text-gray-500">GameMarket</p>

            <h1 className="mt-2 text-3xl font-bold">All listings</h1>

            <p className="mt-2 text-gray-400">
            Browse all available game listings.
            </p>

                </div>
                <ListingFilters filters={filters} onChange={setFilters} />
                <p className="text-sm text-gray-400">
                    Showing {filteredListings.length} of {mockListings.length} listings
                </p>
                <ListingGrid listings={filteredListings} />

                {filteredListings.length === 0 && (
                    <p className="text-center text-gray-500">No listings match your filters.</p>
                )}
            </section>
        </main>
    );
}