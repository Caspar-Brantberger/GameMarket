"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { GameListing } from "@/types/listing";

type UserProfile = {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt?: string;
};

export default function ProfilePage() {
    const router = useRouter();

    const [user, setUser] = useState<UserProfile | null>(null);
    const [myListings, setMyListings] = useState<GameListing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
    async function loadProfile() {
    try {
        setLoading(true);
        setError("");

        const [authResponse, listingsResponse] =
        await Promise.all([
            fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
            {
                credentials: "include",
            }
            ),
            fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/listings`
            ),
        ]);

        if (authResponse.status === 401) {
        router.replace("/login");
        return;
        }

        if (!authResponse.ok) {
        throw new Error("Could not load profile");
        }

        if (!listingsResponse.ok) {
        throw new Error("Could not load listings");
        }

        const authData: { user: UserProfile } =
        await authResponse.json();

        const listingsData: GameListing[] =
        await listingsResponse.json();

        setUser(authData.user);

        setMyListings(
        listingsData.filter(
            (listing) =>
            listing.sellerId === authData.user.id
        )
        );
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

    loadProfile();
    }, [router]);

    

    async function handleDeleteListing(listingId: string) {
    const confirmed = window.confirm(
        "Are you sure you want to delete this listing?"
    );

    if (!confirmed) {
        return;
    }

    try {
        setError("");

        const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/listings/${listingId}`,
        {
            method: "DELETE",
            credentials:"include",
        }
        );

        if(response.status === 401){
            router.replace("/login");
            return;
        }

        
        const data = await response.json().catch(() => null);

        if (!response.ok) {
    
        throw new Error(
            data?.message ??
            data?.error ??
            "Could not delete listing"
        );
        }

        setMyListings((currentListings) =>
        currentListings.filter(
            (listing) => listing.id !== listingId
        )
        );
    } catch (error) {
        setError(
        error instanceof Error
            ? error.message
            : "Could not delete listing"
        );
        }
    }

    async function handleDeleteProfile() { 

        if (!user) { 
            return; 
        } 

        const confirmed = window.confirm( "Are you sure you want to delete your profile?" ); 

        if (!confirmed) { 
            return; 
        } try { 
            setError(""); 
            const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}`, 
                { 
                    method: "DELETE", credentials: "include",
                }); 
                
                if (response.status === 401) { 
                    router.replace("/login"); 
                    return; 
                } 
                
                const data = await response .json() .catch(() => null); 

                    if (response.status === 403) {
                throw new Error(
                data?.message ??
                "You are not allowed to delete this profile"
                );
                }

                if (!response.ok) { 
                    throw new Error( data?.message ?? data?.error ?? "Could not delete profile" ); 
                } 

                window.location.replace("/"); 

            } catch (error) { 
                setError( error instanceof Error ? error.message : "Could not delete profile" 

                ); 
            } 
        }

    if (loading) {
    return (
        <main className="min-h-screen bg-black px-6 py-10 text-white">
        <p>Loading profile...</p>
        </main>
    );
    }

    if (!user) {
    return (
        <main className="min-h-screen bg-black px-6 py-10 text-white">
        <p className="text-red-400">
            Could not load profile.
        </p>
        </main>
    );
    }

    return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
        <section className="mx-auto max-w-5xl space-y-10">
        <div>
            <h1 className="text-3xl font-bold">Profile</h1>

            <p className="mt-2 text-gray-400">
            Manage your profile and listings.
            </p>
        </div>

        {error && (
            <p className="rounded-lg border border-red-700 bg-red-950 p-4 text-red-300">
            {error}
            </p>
        )}

        <section className="rounded-xl border border-gray-700 bg-gray-900 p-6">
            <h2 className="text-2xl font-semibold">
            Profile information
            </h2>

            <div className="mt-5 space-y-3 text-gray-300">
            <p>
                <span className="font-semibold text-white">
                Username:
                </span>{" "}
                {user.username}
            </p>

            <p>
                <span className="font-semibold text-white">
                Email:
                </span>{" "}
                {user.email}
            </p>

            <p>
                <span className="font-semibold text-white">
                Member since:
                </span>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
            </p>
            </div>

            <div className="mt-6 flex gap-3">
            <Link
                href="/profile/edit"
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium hover:bg-blue-500"
            >
                Update profile
            </Link>

            <button
                type="button"
                onClick={handleDeleteProfile}
                className="rounded-lg bg-red-600 px-4 py-2 font-medium hover:bg-red-500"
            >
                Delete profile
            </button>
            </div>
        </section>

        <section className="space-y-5">
            <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
                My listings
            </h2>

            <Link
                href="/create"
                className="rounded-lg bg-green-500 px-4 py-2 font-medium text-black hover:bg-green-400"
            >
                Create listing
            </Link>
            </div>

            {myListings.length === 0 ? (
            <div className="rounded-xl border border-gray-700 bg-gray-900 p-6 text-center text-gray-400">
                You have not created any listings yet.
            </div>
                ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {myListings.map((listing) => (
                <article
                    key={listing.id}
                    className="overflow-hidden rounded-xl border border-gray-700 bg-gray-900"
                >
                    <img
                    src={
                        listing.imageUrl ||
                        "/images/No.jpg"
                    }
                    alt={listing.title}
                    onError={(event) => {
                        event.currentTarget.src =
                        "/images/No.jpg";
                    }}
                    className="h-48 w-full object-cover"
                    />

                    <div className="space-y-3 p-4">
                    <h3 className="text-lg font-semibold">
                        {listing.title}
                    </h3>

                    <p className="text-sm text-gray-400">
                        {listing.platform} · {listing.condition}
                    </p>

                    <p className="font-semibold">
                        {Number(listing.price).toFixed(2)} $
                    </p>

                    <div className="flex flex-wrap gap-2">
                        <Link
                        href={`/listings/${listing.id}`}
                        className="rounded-md border border-gray-600 px-3 py-2 text-sm hover:bg-gray-800"
                        >
                        View
                        </Link>

                        <Link
                        href={`/listings/${listing.id}/edit`}
                        className="rounded-md bg-blue-600 px-3 py-2 text-sm hover:bg-blue-500"
                        >
                        Update
                        </Link>

                        <button
                        type="button"
                        onClick={() =>
                            handleDeleteListing(listing.id)
                        }
                        className="rounded-md bg-red-600 px-3 py-2 text-sm hover:bg-red-500"
                        >
                        Delete
                        </button>
                    </div>
                    </div>
                </article>
                ))}
            </div>
            )}
        </section>
        </section>
    </main>
    );
}
