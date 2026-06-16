"use client";

import { useState,useEffect } from "react";
import type {GamePlatform, ListingCondition,GameListing} from "@/types/listing";
import Link from "next/dist/client/link";
import { useRouter } from "next/navigation";

export default function CreateListingPage() {
    const router = useRouter();


    //const [sellerId, setSellerId] = useState("");
    const [checkingLogin, setCheckingLogin] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [platform, setPlatform] = useState<GamePlatform>("PC");
    const [condition, setCondition] = useState<ListingCondition>("Used");
    const [imageUrl, setImageUrl] = useState("");
    const [genre, setGenre] = useState("");
    const [location, setLocation] = useState("");

    function mapPlatform(platform: GamePlatform){
        const platformMap = {
        PC: "PC",
        PlayStation: "PLAYSTATION",
        Xbox: "XBOX",
        "Nintendo Switch": "NINTENDO_SWITCH",
        Mobile: "MOBILE",
    } as const;

    return platformMap[platform];

    }

    function mapCondition(condition: ListingCondition){
    const conditionMap = {

        New: "NEW",
        Used: "USED",
        "Like New": "LIKE_NEW",
        Refurbished: "REFURBISHED",
        Damaged: "DAMAGED",
    } as const;

    return conditionMap[condition];
        
    }

    useEffect(() => {
        async function checkAuthentication(){
            try{
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, { 
                        credentials: "include", 
                    }
                );
                if(!response.ok){
                    router.replace("/login")
                    return;
                }
            }catch{
                router.replace("/login");

            }finally{
                setCheckingLogin(false);
            }

        }
        checkAuthentication();
    },[router]);

    async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {

        const file = e.target.files?.[0];
        
        if(!file){
            setImageUrl("");
            return;
        }

        if(!file.type.includes("jpeg") && !file.type.includes("png") && !file.type.includes("jpg")){
            alert("Please select a valid image file (jpg, jpeg, png)");
            setImageUrl("");
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);

    }
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

            try {
    setSubmitting(true);

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/listings`,
        {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            description,
            price: Number(price),
            platform: mapPlatform(platform),
            condition: mapCondition(condition),
            imageUrl: imageUrl.trim() || "/images/No.jpg",
            genre,
            location,
            status: "AVAILABLE",
        }),
        }
    );

    const data = await response.json();

    if (response.status === 401) {
        router.replace("/login");
        return;
    }

    if (!response.ok) {
        throw new Error(
        data.message ?? data.error ?? "Could not create listing"
        );
    }

    alert("Listing created successfully!");
    router.push("/listings");
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

        return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
        Checking login ...
        <section className="mx-auto max-w-3xl space-y-8">
        <div>
            <Link
        href="/listings"
        className="mb-4 inline-flex items-center rounded-lg border border-gray-600 bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:border-gray-400 hover:bg-gray-800 hover:shadow-lg"
        >
            ← Back to Listings
            </Link>
            
            <h1 className="text-3xl font-bold">Create listing</h1>
            <p className="mt-2 text-gray-400">
            Create a new game listing and publish it on GameMarket.
            </p>
        </div>

        <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-xl border border-gray-700 bg-gray-900 p-6"
        >
            <div>
            <label className="block text-sm font-medium">Title</label>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter title of the game"
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
            />
            </div>

            <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Describe the game and condition..."
                className="mt-1 min-h-28 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
            />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
            <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                min="0"
                step="0.01"
                required
                placeholder="299"
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Platform</label>
                <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as GamePlatform)}
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                >
                <option value="PC">PC</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Xbox">Xbox</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
                <option value="Mobile">Mobile</option>
                </select>
            </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
            <div>
                <label className="block text-sm font-medium">Genre</label>
                <input
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="RPG"
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Condition</label>
                <select
                value={condition}
                onChange={(e) =>
                    setCondition(e.target.value as ListingCondition)
                }
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                >
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Like New">Like New</option>
                <option value="Refurbished">Refurbished</option>
                <option value="Damaged">Damaged</option>
                </select>
            </div>
            </div>

            <div>
            <label className="block text-sm font-medium">Location</label>
            <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="City, Country"
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
            />
            </div>

            <div>
    <label
    htmlFor="imageUrl"
    className="block text-sm font-medium"
    >
    Game image URL
    </label>

    <input
    id="imageUrl"
    type="url"
    value={imageUrl}
    onChange={(e) => setImageUrl(e.target.value)}
    placeholder="https://example.com/game-cover.jpg"
    className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
    />

    <p className="mt-2 text-sm text-gray-400">
    Leave empty to use the default GameMarket image.
    </p>

    <img
    src={imageUrl.trim() || "/images/No.jpg"}
    alt="Listing preview"
    onError={(event) => {
        event.currentTarget.src = "/images/No.jpg";
    }}
    className="mt-4 h-64 w-full rounded-xl object-cover"
    />
    </div>

            

            {error && (
            <p className="rounded-md border border-red-700 bg-red-950 p-3 text-sm text-red-300">
            {error}
            </p>
            )}

            <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-green-500 px-4 py-2 font-medium text-black transition hover:bg-green-400 hover:shadow-lg"
            >
            {submitting ? "Create listing..." : "Create listing"}
            </button>
        </form>
        </section>
    </main>

    );
    }
