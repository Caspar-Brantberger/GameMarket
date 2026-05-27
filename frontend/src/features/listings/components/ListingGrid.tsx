import type { GameListing } from "@/types/listing";
import ListingCard from "./ListingCard";

type ListingGridProps = {
    listings: GameListing[];
};

export default function ListingGrid({ listings }: ListingGridProps) {
    return (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
            ))}
        </section>
    );
}