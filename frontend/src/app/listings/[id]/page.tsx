import mockListings from "@/data/mockListings";
import Link from "next/link";

type ListingPageProps = {
    params: Promise<{
    id: string;
    }>;
};

type ListingDetails = {
    id: string;
    title: string;
    description: string;
    price: number | string;
    platform: string;
    genre: string;
    condition: string;
    status: string;
    imageUrl: string;
    location: string;
    seller?: {
    id: string;
    username: string;
    email: string;
    };
};

export default async function ListingPageDetails({
    params,
}: ListingPageProps) {
    const { id } = await params;

    const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/listings/${id}`,
    {
        cache: "no-store",
    }
    );

    if (!response.ok) {
    return (
    <main className="container mx-auto p-4 text-center text-white">
        <p>Listing not found</p>

        <Link href="/listings" className="text-blue-500 hover:underline">
        &larr; Back to Listings
        </Link>
    </main>
    );
}
const listing: ListingDetails = await response.json();

    return (
    <main className="min-h-full flex flex-col text-white">
        <section className="bg-gray-800 text-white p-4">
        <div className="container mx-auto p-4 space-y-4">
            <Link href="/listings" className="text-blue-500 hover:underline">
            &larr; Back to Listings
            </Link>

            <h1 className="text-2xl font-bold">{listing.title}</h1>

            <img
            src={listing.imageUrl}
            alt={listing.title}
            className="my-4 max-h-[500px] w-full rounded-xl object-cover"
            />

            <p className="text-lg font-semibold">
            {Number(listing.price).toFixed(2)} kr
            </p>

            <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-gray-900 px-3 py-1">
                {listing.platform}
            </span>

            <span className="rounded-full bg-gray-900 px-3 py-1">
                {listing.genre}
            </span>

            <span className="rounded-full bg-gray-900 px-3 py-1">
                {listing.condition}
            </span>

            <span className="rounded-full bg-gray-900 px-3 py-1">
                {listing.status}
            </span>
            </div>

            <p className="text-gray-300">{listing.description}</p>

            <div className="rounded-xl border border-gray-700 bg-gray-900 p-4">
            <h2 className="font-semibold">Seller information</h2>

            <p className="mt-2 text-gray-300">
                Seller: {listing.seller?.username ?? "Unknown seller"}
            </p>

            <p className="text-gray-300">
                Email: {listing.seller?.email ?? "No email available"}
            </p>

            <p className="text-gray-300">Location: {listing.location}</p>
            </div>

            {listing.seller?.email && (
            <a
                href={`mailto:${listing.seller.email}?subject=Interested in ${encodeURIComponent(
                listing.title
                )}`}
                className="inline-block rounded-lg bg-white px-4 py-2 font-medium text-gray-900 transition hover:-translate-y-0.5 hover:bg-gray-200 hover:shadow-lg active:translate-y-0"
            >
                Contact seller
            </a>
            )}
        </div>
        </section>
    </main>
    );
}
