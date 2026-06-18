"use client";

import Link from "next/link";
import { useState } from "react";


export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    const [fieldErrors,setFieldErrors] = useState<FieldErrors>({});

    type FieldErrors ={
        username?: string[]; 
        email?: string[]; 
        password?: string[]; 
        confirmPassword?: string[];

    };

        async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setFieldErrors({});

        if(password !== confirmPassword){
            setFieldErrors({
            confirmPassword: ["Passwords do not match"],
                });
            return;
        }
        try{
            setLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                    }),
                }
            );
            const data = await response.json().catch(() => null);

            if(!response.ok){
                if (response.status === 400 && data?.details) {
                setFieldErrors(data.details);
                return;
                }

                throw new Error(data.error ?? data.message ?? "Could not create account");
            }
            console.log("Registered user: ",data.user);
            alert("Account created successfully!");

            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

        

        }catch (error){
            setError(
                error instanceof Error 
                ? error.message 
                : "Something went wrong"
            );
        }finally {
            setLoading(false);
        }

        }
    return(
        <main className="min-h-screen bg-black px-6 py-10 text-white">
            <section className="mx-auto max-w-xl space-y-8">
                <div>

                    <div className="flex flex-col items-start gap-2">
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Already have an account? Login here.
                    </Link>

                    <Link href="/listings" className="text-blue-500 hover:underline">
                        Back to Listings
                    </Link>
                    </div>

                    <h1 className="mt-4 text-3xl font-bold">Create Account</h1>

                    <p className="text-gray-400">
                        Join our community today and start exploring amazing games! 
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full bg-gray-800 text-gray-300 placeholder:text-gray-500 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your username"
                        />

                        {fieldErrors.username?.[0] && (
                        <p className="mt-1 text-sm text-red-400">
                        {fieldErrors.username[0]}
                                </p>
                            )}
                    </div>

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

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full bg-gray-800 text-gray-300 placeholder:text-gray-500 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Confirm your password"
                        />

                        {fieldErrors.confirmPassword?.[0] && (
                        <p className="mt-1 text-sm text-red-400">
                        {fieldErrors.confirmPassword[0]}
                        </p>
                        )}

                    </div>

                    <div>
                        {error && ( <p className="rounded-md border border-red-700 bg-red-950 p-3 text-sm text-red-300">
                            {error}
                        </p>)}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            {loading ? "Creating account...": "Create account"}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );


}
