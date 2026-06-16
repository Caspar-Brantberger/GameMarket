"use client"
import Link from 'next/link';
import {useEffect,useState} from "react";
import {useRouter} from "next/navigation"

type CurrentUser= {
    id:string;
    username: string;
    email: string;
};


export default function Header() {

    const router = useRouter();
    const [currentUser,SetCurrentUser] = useState<CurrentUser | null>(null);


    useEffect(() => {
        let isMounted = true;

    async function fetchCurrentUser() {
    try {
        const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
        {
            credentials: "include",
        }
        );

        if (!isMounted) {
        return;
        }

        if (response.status === 401) {
        SetCurrentUser(null);
        return;
        }

        if (!response.ok) {
        throw new Error("Could not load current user");
        }

        const data: { user: CurrentUser } =
        await response.json();

        if (isMounted) {
        SetCurrentUser(data.user);
        }
    } catch (error) {
        console.error("Could not load current user:", error);

        if (isMounted) {
        SetCurrentUser(null);
        }
    }
    }

    void fetchCurrentUser();

    return () => {
    isMounted = false;
    };
}, []);


    async function handleLogout() {

    try {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {
        method: "POST",
        credentials: "include",
        }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(
        data?.message ??
            data?.error ??
            "Could not log out"
        );
    }

    SetCurrentUser(null);
    router.replace("/login");
    router.refresh();
    } catch (error) {
    console.error("Logout request failed:", error);

    alert(
        error instanceof Error
        ? error.message
        : "Could not log out"
    );
    }
}

        return (
    <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">GameMarket</h1>

        <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="hover:underline">
            Home
            </Link>

            <Link href="/listings" className="hover:underline">
            Listings
            </Link>

            <Link href="/create" className="hover:underline">
            Create Listing
            </Link>

            {currentUser ? (
            <>
                <Link href="/profile" className="hover:underline">
                Profile
                </Link>

                <span className="text-gray-300">
                Logged in as:{" "}
                <span className="font-semibold text-white">
                    {currentUser.username}
                </span>
                </span>

                <button
                type="button"
                onClick={handleLogout}
                className="hover:underline"
                >
                Logout
                </button>
            </>
            ) : (
            <>
                <Link href="/login" className="hover:underline">
                Login
                </Link>

                <Link href="/register" className="hover:underline">
                Register
                </Link>
            </>
            )}
        </nav>
        </div>
    </header>
    );
}