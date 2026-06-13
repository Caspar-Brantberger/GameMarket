import type { GameListing } from "@/types/listing";
import Link from "next/link";

type ListingCardProps = {
    listing: GameListing;
};

export default function ListingCard({ listing }: ListingCardProps) {
    return (
        <Link href={`/listings/${listing.id}`} className="block">
        <article className="flex h-full flex-col overflow-hidden rounded-xl border border-grey-600 bg-gray-900 text-white shadow-sm transition hover:-translate-y-1 hover:border-gray-500 hover:shadow-lg">
            <img
                src={listing.imageUrl}
                alt={listing.title}
                className="h-48 w-full object-cover bg-gray-800"
                />

            <div className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-4 ">

                    <h2 className="text-lg font-semibold">{listing.title}
                    </h2>

                    <p className="text-sm text-gray-500">{listing.platform} - {listing.genre}
                    </p>
                </div>

                <p className="text-sm text-gray-500">{listing.description}
                </p>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{listing.condition}
                    </span>
                    <span className="text-sm font-medium text-green-500">${listing.price}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                        {listing.status}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                        {listing.genre}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                        {listing.location}
                    </span>
                </div>

                <p className="mt-auto text-sm text-gray-500">Seller: {listing.seller?.username ?? "Unknown seller"}</p>

            </div>
        </article>
        </Link>
    );
};