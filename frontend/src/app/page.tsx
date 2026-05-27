import mockListings from "@/data/mockListings";
import ListingGrid from "@/features/listings/components/ListingGrid";

export default function HomePage() {
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

            <ListingGrid listings={mockListings} />
        </div>
            </section>
        </main>
    );
}
