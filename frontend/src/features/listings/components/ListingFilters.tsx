import type { ListingFilter as ListingFiltersType } from "../utils/filterListings";


type ListingFiltersProps = {
    filters: ListingFiltersType;
    onChange: (filters: ListingFiltersType) => void;
};

export default function ListingFilters({ 
    filters, 
    onChange }: 
    ListingFiltersProps) {
        function updateFilter(name: keyof ListingFiltersType, value: string | number | undefined) {
            onChange({
                ...filters,
                [name]: value,
            });
        }

    return (
        <section className="mb-6 rounded-xl border border-gray-700 bg-gray-900 p-4">
            <div className= "grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                <input 
                    value={filters.searchText || ""}
                    onChange={(e) => updateFilter("searchText", e.target.value)}
                    placeholder="Search by title"
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input 
                    value={filters.maxPrice || ""}
                    onChange={(e) => updateFilter("maxPrice", e.target.value)}
                    placeholder="Max Price"
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input 
                    value={filters.genre || ""}
                    onChange={(e) => updateFilter("genre", e.target.value)}
                    placeholder="Genre"
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input 
                    value={filters.location || ""}
                    onChange={(e) => updateFilter("location", e.target.value)}
                    placeholder="Location"
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input 
                    value={filters.status || ""}
                    onChange={(e) => updateFilter("status", e.target.value)}
                    placeholder="Status"
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    value={filters.platform || ""}
                    onChange={(e) => updateFilter("platform", e.target.value)}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <option value="">All Platforms </option>
                <option value="PC">PC </option>
                <option value="PlayStation">PlayStation </option>
                <option value="Xbox">Xbox </option>
                <option value="Nintendo Switch">Nintendo Switch </option>
                <option value="Mobile">Mobile </option>
                </select>

                <select
                    value={filters.condition || ""}
                    onChange={(e) => updateFilter("condition", e.target.value)}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <option value="">All Conditions </option>
                <option value="New">New </option>
                <option value="Used">Used </option>
                <option value="Like New">Like New </option>
                <option value="Refurbished">Refurbished </option>
                <option value="Damaged">Damaged </option>
                </select>

                <select
            value={filters.status || ""}
            onChange={(e) => updateFilter("status", e.target.value || undefined)}
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <option value="">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Pending">Pending</option>
            </select>
                

            </div>
        </section>
    );

}