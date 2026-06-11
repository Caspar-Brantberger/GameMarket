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

    function loadCurrentUser() {
        const storedUser = localStorage.getItem("currentUser");

        if(!storedUser){
            SetCurrentUser(null);
            return;
        }
        try{
            const parsedUser = JSON.parse(storedUser);
            SetCurrentUser(parsedUser);
        }catch{
            localStorage.removeItem("currentUser");
            SetCurrentUser(null);
        }
    }
    useEffect(() => {
    const timeoutId = setTimeout(() => {
        loadCurrentUser();
    }, 0);

    return () => clearTimeout(timeoutId);
    }, []);

    async function handleLogout(){
        const storedUser = localStorage.getItem("currentUser");

        if(!storedUser){
            alert("You are not currently logged in.");
            return
        }

        try{
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: "POST",
            });
        }catch(error){
            console.error("Logout request failed", error);
        }finally{
            localStorage.removeItem("currentUser");
            router.push("/login")
            window.location.replace("/login");
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