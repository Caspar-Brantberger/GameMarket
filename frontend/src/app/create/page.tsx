"use client";

import { useState } from "react";
import type {GamePlatform, ListingCondition,GameListing} from "@/types/listing";
import Link from "next/dist/client/link";

export default function CreateListingPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [platform, setPlatform] = useState<GamePlatform>("PC");
    const [condition, setCondition] = useState<ListingCondition>("Used");
    const [imageUrl, setImageUrl] = useState("");
    const [genre, setGenre] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("");
    const [sellerName, setSellerName] = useState("");
    const [sellerEmail, setSellerEmail] = useState("");

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {

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
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const newListing: GameListing = {
            id:crypto.randomUUID(),
            title,
            description,
            price: Number(price),
            platform,
            condition,
            imageUrl: imageUrl || "/images/default-game.jpg",
            genre,
            location,
            status: "Available",
            sellerName,
            sellerEmail,
            sellerId: "mockSellerId",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            
        };

        console.log("New Listing:", newListing);
        alert("Listing created successfully! Check the console for details.");
    }

        return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
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
            Create a new game listing. For now, it only logs the listing in the console.
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

            <div className="grid gap-5 sm:grid-cols-2">
            <div>
                <label className="block text-sm font-medium">Seller name</label>
                <input
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                required
                placeholder="Cool seller name"
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Seller email</label>
                <input
                value={sellerEmail}
                onChange={(e) => setSellerEmail(e.target.value)}
                type="email"
                placeholder="seller@example.com"
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
                />
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
            <label className="block text-sm font-medium">Game image</label>
            <input
                type="file"
                accept="image/jpeg,image/jpg"
                onChange={handleImageChange}
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
            />

            {imageUrl && (
                <img
                src={imageUrl}
                alt="Preview"
                className="mt-4 h-64 w-full rounded-xl object-cover"
                />
            )}
            </div>

            <button
            type="submit"
            className="rounded-lg bg-green-500 px-4 py-2 font-medium text-black transition hover:bg-green-400 hover:shadow-lg"
            >
            Create listing
            </button>
        </form>
        </section>
    </main>
    );
}