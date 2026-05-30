import mockListings from "@/data/mockListings";
import ListingGrid from "@/features/listings/components/ListingGrid";

export default function ListingsPage() {
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
                <ListingGrid listings={mockListings} />
            </section>
        </main>
    );
}