"use client"
import type { GameListing } from "@/types/listing";
import ListingGrid from "@/features/listings/components/ListingGrid";
import {useEffect,useState} from "react";

export default function HomePage() {
    const [listings, setListings] = useState<GameListing[]>([]);
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
            error instanceof Error ? error.message : "Something went wrong"
        );
        } finally {
        setLoading(false);
        }
    }

    loadListings();
    }, []);

    const latestListings = listings.slice(0, 6);

    if (loading) {
    return <main className="p-10">Loading listings...</main>;
    }

    if (error) {
    return <main className="p-10 text-red-600">{error}</main>;
    }
    return (
        <main className="container mx-auto px-4 py-8">
            <section className="mx-auto max-w-6xl space-y-8">
        <div>
        <p className="text-sm font-medium text-gray-500">GameMarket</p>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Buy and sell used video games
            </h1>
                <p className="mt-3 max-w-2xl text-gray-600">
            Browse game listings by platform, price, condition and location.
            </p>
        </div>

        <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Latest listings
            </h2>
                {latestListings.length > 0 ? (
            <ListingGrid listings={latestListings} />
            ) : (
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500">
                No listings available yet.
            </div>
            )}

            
        </div>
            </section>
        </main>
    );
}
