"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type {
    GamePlatform,
    ListingCondition,
} from "@/types/listing";

type ListingStatus = "Available" | "Sold" | "Pending";

type ApiListing = {
    id: string;
    title: string;
    description: string;
    price: number | string;
    platform: string;
    imageUrl: string;
    genre?: string;
    condition: string;
    sellerId: string;
    status: string;
    location: string;
};

type CurrentUser = {
    id: string;
    username: string;
    email: string;
};

export default function EditListingPage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const listingId = params.id;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [platform, setPlatform] = useState<GamePlatform>("PC");
    const [condition, setCondition] =
    useState<ListingCondition>("Used");
    const [status, setStatus] =
    useState<ListingStatus>("Available");
    const [imageUrl, setImageUrl] = useState("");
    const [genre, setGenre] = useState("");
    const [location, setLocation] = useState("");

    const [sellerId, setSellerId] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    function mapPlatformToApi(value: GamePlatform) {
    const platformMap = {
        PC: "PC",
        PlayStation: "PLAYSTATION",
        Xbox: "XBOX",
        "Nintendo Switch": "NINTENDO_SWITCH",
        Mobile: "MOBILE",
    } as const;

    return platformMap[value];
    }

    function mapPlatformFromApi(value: string): GamePlatform {
    const platformMap: Record<string, GamePlatform> = {
        PC: "PC",
        PLAYSTATION: "PlayStation",
        XBOX: "Xbox",
        NINTENDO_SWITCH: "Nintendo Switch",
        MOBILE: "Mobile",
    };

    return platformMap[value] ?? "PC";
    }

    function mapConditionToApi(value: ListingCondition) {
    const conditionMap = {
        New: "NEW",
        Used: "USED",
        "Like New": "LIKE_NEW",
        Refurbished: "REFURBISHED",
        Damaged: "DAMAGED",
    } as const;

    return conditionMap[value];
    }

    function mapConditionFromApi(
    value: string
    ): ListingCondition {
    const conditionMap: Record<string, ListingCondition> = {
        NEW: "New",
        USED: "Used",
        LIKE_NEW: "Like New",
        REFURBISHED: "Refurbished",
        DAMAGED: "Damaged",
    };

    return conditionMap[value] ?? "Used";
    }

    function mapStatusToApi(value: ListingStatus) {
    const statusMap = {
        Available: "AVAILABLE",
        Sold: "SOLD",
        Pending: "PENDING",
    } as const;

    return statusMap[value];
    }

    function mapStatusFromApi(value: string): ListingStatus {
    const statusMap: Record<string, ListingStatus> = {
        AVAILABLE: "Available",
        SOLD: "Sold",
        PENDING: "Pending",
    };

    return statusMap[value] ?? "Available";
    }

    useEffect(() => {
    async function loadListing() {
        const storedUser = localStorage.getItem("currentUser");

        if (!storedUser) {
        router.replace("/login");
        return;
        }

        let currentUser: CurrentUser;

        try {
        currentUser = JSON.parse(storedUser);

        if (!currentUser.id) {
            throw new Error("Invalid user");
        }
        } catch {
        localStorage.removeItem("currentUser");
        router.replace("/login");
        return;
        }

        try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/listings/${listingId}`
        );

        const data: ApiListing = await response.json();

        if (!response.ok) {
            throw new Error("Could not load listing");
        }

        if (data.sellerId !== currentUser.id) {
            setError("You can only edit your own listings.");
            return;
        }

        setTitle(data.title);
        setDescription(data.description);
        setPrice(String(data.price));
        setPlatform(mapPlatformFromApi(data.platform));
        setCondition(mapConditionFromApi(data.condition));
        setStatus(mapStatusFromApi(data.status));
        setImageUrl(data.imageUrl ?? "");
        setGenre(data.genre ?? "");
        setLocation(data.location);
        setSellerId(data.sellerId);
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

    loadListing();
    }, [listingId, router]);

    async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
    ) {
    event.preventDefault();
    setError("");

    if (!sellerId) {
        setError("Could not identify the listing owner.");
        return;
    }

    try {
        setSubmitting(true);

        const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/listings/${listingId}`,
        {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            title: title.trim(),
            description: description.trim(),
            price: Number(price),
            platform: mapPlatformToApi(platform),
            condition: mapConditionToApi(condition),
            status: mapStatusToApi(status),
            imageUrl:
                imageUrl.trim() ||
                "/images/placeholder-game.jpg",
            genre: genre.trim(),
            location: location.trim(),
            sellerId,
            }),
        }
        );

        const data = await response.json();

        if (!response.ok) {
        throw new Error(
            data.message ??
            data.error ??
            "Could not update listing"
        );
        }

        window.location.replace(`/listings/${listingId}`);
    } catch (error) {
        setError(
        error instanceof Error
            ? error.message
            : "Something went wrong"
        );
    } finally {
        setSubmitting(false);
    }
    }

    if (loading) {
        return (
        <main className="min-h-screen bg-black px-6 py-10 text-white">
        <p>Loading listing...</p>
        </main>
    );
    }

    if (error && !sellerId) {
    return (
        <main className="min-h-screen bg-black px-6 py-10 text-white">
        <section className="mx-auto max-w-2xl space-y-4">
            <p className="text-red-400">{error}</p>

            <Link
            href="/profile"
            className="text-blue-400 hover:underline"
            >
            &larr; Back to profile
            </Link>
        </section>
        </main>
    );
    }

    return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
        <section className="mx-auto max-w-3xl space-y-8">
        <div>
            <Link
            href="/profile"
            className="text-blue-400 hover:underline"
            >
            &larr; Back to profile
            </Link>

            <h1 className="mt-4 text-3xl font-bold">
            Update listing
            </h1>

            <p className="mt-2 text-gray-400">
            Edit the information for your listing.
            </p>
        </div>

        <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-xl border border-gray-700 bg-gray-900 p-6"
        >
            <div>
            <label
                htmlFor="title"
                className="block text-sm font-medium"
            >
                Title
            </label>

            <input
                id="title"
                value={title}
                onChange={(event) =>
                setTitle(event.target.value)
                }
                required
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2"
            />
            </div>

            <div>
            <label
                htmlFor="description"
                className="block text-sm font-medium"
            >
                Description
            </label>

            <textarea
                id="description"
                value={description}
                onChange={(event) =>
                setDescription(event.target.value)
                }
                required
                className="mt-1 min-h-28 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2"
            />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
            <div>
                <label
                htmlFor="price"
                className="block text-sm font-medium"
                >
                Price
                </label>

                <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(event) =>
                    setPrice(event.target.value)
                }
                required
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2"
                />
            </div>

            <div>
                <label
                htmlFor="platform"
                className="block text-sm font-medium"
                >
                Platform
                </label>

                <select
                id="platform"
                value={platform}
                onChange={(event) =>
                    setPlatform(
                    event.target.value as GamePlatform
                    )
                }
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2"
                >
                <option value="PC">PC</option>
                <option value="PlayStation">
                    PlayStation
                </option>
                <option value="Xbox">Xbox</option>
                <option value="Nintendo Switch">
                    Nintendo Switch
                </option>
                <option value="Mobile">Mobile</option>
                </select>
            </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
            <div>
                <label
                htmlFor="genre"
                className="block text-sm font-medium"
                >
                Genre
                </label>

                <input
                id="genre"
                value={genre}
                onChange={(event) =>
                    setGenre(event.target.value)
                }
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2"
                />
            </div>

            <div>
                <label
                htmlFor="condition"
                className="block text-sm font-medium"
                >
                Condition
                </label>

                <select
                id="condition"
                value={condition}
                onChange={(event) =>
                    setCondition(
                    event.target.value as ListingCondition
                    )
                }
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2"
                >
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Like New">Like New</option>
                <option value="Refurbished">
                    Refurbished
                </option>
                <option value="Damaged">Damaged</option>
                </select>
            </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
            <div>
                <label
                htmlFor="status"
                className="block text-sm font-medium"
                >
                Status
                </label>

                <select
                id="status"
                value={status}
                onChange={(event) =>
                    setStatus(
                    event.target.value as ListingStatus
                    )
                }
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2"
                >
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Sold">Sold</option>
                </select>
            </div>

            <div>
                <label
                htmlFor="location"
                className="block text-sm font-medium"
                >
                Location
                </label>

                <input
                id="location"
                value={location}
                onChange={(event) =>
                    setLocation(event.target.value)
                }
                required
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2"
                />
            </div>
            </div>

            <div>
            <label
                htmlFor="imageUrl"
                className="block text-sm font-medium"
            >
                Image URL
            </label>

            <input
                id="imageUrl"
                type="url"
                value={imageUrl}
                onChange={(event) =>
                setImageUrl(event.target.value)
                }
                placeholder="https://example.com/game.jpg"
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2"
            />

            <img
                src={
                imageUrl.trim() ||
                "/images/No.jpg"
                }
                alt="Listing preview"
                onError={(event) => {
                event.currentTarget.src =
                    "/images/No.jpg";
                }}
                className="mt-4 h-64 w-full rounded-xl object-cover"
            />
            </div>

            {error && (
            <p className="rounded-md border border-red-700 bg-red-950 p-3 text-sm text-red-300">
                {error}
            </p>
            )}

            <div className="flex gap-3">
            <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {submitting
                ? "Updating..."
                : "Save changes"}
            </button>

            <Link
                href="/profile"
                className="rounded-lg border border-gray-600 px-4 py-2 font-medium hover:bg-gray-800"
            >
                Cancel
            </Link>
            </div>
        </form>
        </section>
    </main>
    );
}