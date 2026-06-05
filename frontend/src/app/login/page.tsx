"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // Here you would normally send the login data to your backend API
        console.log("Logging in with:", { email});
        alert("Login successful! (This is a mock implementation.)");
    }

    const loginData = {
        email,
        password,
    };

    console.log("Current login data:", loginData);

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
                            className="mt-1 block w-full bg-gray-800 text-gray-300 placeholder:text-gray-500 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full bg-gray-800 text-gray-300 placeholder:text-gray-500 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Login
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