import Link from 'next/link';

export default function Header() {
    return (

        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">

                <h1 className="text-2xl font-bold">GameMarket</h1>
                <nav className="flex items-center gap-4 text-sm">
                    <Link href="/" className="mr-4 hover:underline">Home</Link>
                    <Link href="/listings" className="mr-4 hover:underline">Listings</Link>
                    <Link href="/create" className="ml-4 hover:underline">Create Listing</Link>
                    <Link href="/profile" className="hover:underline">Profile</Link>
                    <Link href="/login" className="ml-4 hover:underline">Login</Link>
                    <Link href="/register" className="ml-4 hover:underline">Register</Link>
                    <Link href="/logout" className="ml-4 hover:underline">Logout</Link>

                </nav>
            </div>
        </header>
    );
}