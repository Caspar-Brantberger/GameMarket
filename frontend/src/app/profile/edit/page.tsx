"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


type UserProfile = {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt?: string;
};

type FieldErrors = {
    username?: string[];
    email?: string[];
};

export default function EditProfilePage() {
    const router = useRouter();

    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    useEffect(() => {
    async function loadUser() {

        try {
            setLoading(true);
            setError("");

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
            {
                credentials: "include",
            }
        );
        if (response.status === 401){
            router.replace("/login");
            return;
        }

        if(!response.ok){
            throw new Error("Could not load profile");
        }

        const data: { user: UserProfile } = await response.json();

        if (!response.ok) {
            throw new Error("Could not load profile");
        }

        setUserId(data.user.id);
        setUsername(data.user.username);
        setEmail(data.user.email);
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

    loadUser();
    }, [router]);

    async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
    ) {
    event.preventDefault();
    setError("");
    setFieldErrors({})

    if (!userId) {
        setError("Could not identify the current user.");
        return;
    }

    try {
        setSubmitting(true);

        const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
        {
            method: "PUT",
            credentials:"include",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            username: username.trim(),
            email: email.trim(),
            }),
        }
        );

        const data = await response.json().catch(() => null);

        if(response.status === 401){
            router.replace("/login")
            return;
        }

        if(response.status === 400 && data?.details){
            setFieldErrors(data.details);
            return;
        }
        if(response.status === 403){
            throw new Error(
                data.message ?? 
                "You are not allowed to update this profile");
        }

        if (!response.ok) {
        throw new Error(
            data.message ??
            data.error ??
            "Could not update profile"
        );
        }


        router.replace("/profile");
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
        <p>Loading profile...</p>
        </main>
    );
    }

    return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
        <section className="mx-auto max-w-2xl space-y-8">
        <div>
            <Link
            href="/profile"
            className="text-blue-400 hover:underline"
            >
            &larr; Back to profile
            </Link>

            <h1 className="mt-4 text-3xl font-bold">
            Update profile
            </h1>

            <p className="mt-2 text-gray-400">
            Update your username and email address.
            </p>
        </div>

        <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-xl border border-gray-700 bg-gray-900 p-6"
        >
            <div>
            <label
                htmlFor="username"
                className="block text-sm font-medium"
            >
                Username
            </label>

            <input
                id="username"
                value={username}
                onChange={(event) =>
                setUsername(event.target.value)
                }
                required
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
            />

            {fieldErrors.username?.[0] && (
            <p className="mt-1 text-sm text-red-400">
            {fieldErrors.username[0]}
            </p>
            )}

            </div>

            <div>
            <label
                htmlFor="email"
                className="block text-sm font-medium"
            >
                Email
            </label>

            <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                setEmail(event.target.value)
                }
                required
                className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white"
            />
            
            {fieldErrors.email?.[0] && (
            <p className="mt-1 text-sm text-red-400">
            {fieldErrors.email[0]}
            </p>
            )}

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