"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    type FieldErrors = { 
        email?: string[]; 
        password?: string[]; 
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setError("");
        setFieldErrors({});

        try {
    setLoading(true);

    const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    {
        method: "POST",
        credentials:"include",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email,
        password,
        }),
    }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {

        if(response.status=== 400 && data?.details){
            setFieldErrors(data.details);
            return;
        }

    throw new Error(
        data.error ?? data.message ?? "Invalid email or password"
    );
    }

    alert("Log in successful")
    window.location.href = "/";

    console.log("Logged in user:", data.user);
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
    

    return (
        <main className="min-h-screen bg-black px-6 py-10 text-white">
            <section className="mx-auto max-w-xl space-y-8">
                <div>
                    <h1 className="mt-4 text-3xl font-bold">Login</h1>
                    <p className="text-gray-400">
                        Welcome back! Please enter your details to access your account.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full bg-gray-800 text-gray-300 placeholder:text-gray-500 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                        />

                        {fieldErrors.email?.[0] && (
                        <p className="mt-1 text-sm text-red-400">
                            {fieldErrors.email[0]}
                            </p>
                            )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full bg-gray-800 text-gray-300 placeholder:text-gray-500 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                        />

                        {fieldErrors.password?.[0] && (
                        <p className="mt-1 text-sm text-red-400">
                        {fieldErrors.password[0]}
                        </p>
                        )}

                    </div>
                    {error && (
                    <p className="rounded-md border border-red-700 bg-red-950 p-3 text-sm text-red-300">
                    {error}
                    </p>
                        )}


                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            {loading ? "Logging in...": "Login"}
                        </button>
                    </div>
                </form>

                <div className="flex flex-col items-start gap-2">
                    <Link href="/register" className="text-blue-500 hover:underline">
                        Don't have an account? Register here.
                    </Link>
                </div>
            </section>
        </main>
    );
}