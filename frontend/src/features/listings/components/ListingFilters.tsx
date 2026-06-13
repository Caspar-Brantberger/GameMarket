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
                    value={filters.maxPrice ?? ""}
                    onChange={(e) => updateFilter("maxPrice", e.target.value === "" ? undefined : Number(e.target.value))}
                    type="number"
                    min="0"
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
                <option value="PLAYSTATION">PlayStation </option>
                <option value="XBOX">Xbox </option>
                <option value="NINTENDO_SWITCH">Nintendo Switch </option>
                <option value="MOBILE">Mobile </option>
                </select>

                <select
                    value={filters.condition || ""}
                    onChange={(e) => updateFilter("condition", e.target.value)}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <option value="">All Conditions </option>
                <option value="NEW">New </option>
                <option value="USED">Used </option>
                <option value="LIKE NEW">Like New </option>
                <option value="REFURBISHED">Refurbished </option>
                <option value="DAMAGED">Damaged </option>
                </select>

                <select
            value={filters.status || ""}
            onChange={(e) => updateFilter("status", e.target.value || undefined)}
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <option value="">All Statuses</option>
            <option value="AVAILABLE">Available</option>
            <option value="SOLD">Sold</option>
            <option value="PENDING">Pending</option>
            </select>
                

            </div>
        </section>
    );

}