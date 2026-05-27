import type { GameListing } from "../types/listing";

const mockListings: GameListing[] = [
    {
        id: "1",
        title: "Game Title 1",
        description: "Game description 1",
        price: 19.99,
        platform: "PC",
        imageUrl: "/images/game1.jpg",
        condition: "New",
        sellerId: "seller1",
        sellerName: "Seller 1",
        status: "Available",
        createdAt: "2021-01-01T00:00:00Z",
        updatedAt: "2021-01-01T00:00:00Z",
        location: "City 1",
        genre: "Science Fiction"
    },
    {
        id: "2",
        title: "Game Title 2",
        description: "Game description 2",
        price: 29.99,
        platform: "PlayStation",
        imageUrl: "/images/game2.jpg",
        condition: "Used",
        sellerId: "seller2",
        sellerName: "Seller 2",
        status: "Available",
        createdAt: "2022-02-02T00:00:00Z",
        updatedAt: "2022-02-02T00:00:00Z",
        location: "City 2",
        genre: "shooter"
    },
    {
        id: "3",
        title: "Game Title 3",
        description: "Game description 3",
        price: 39.99,
        platform: "PlayStation",
        imageUrl: "/images/game2.jpg",
        condition: "Used",
        sellerId: "seller3",
        sellerName: "Seller 3",
        status: "Available",
        createdAt: "2023-03-02T00:00:00Z",
        updatedAt: "2023-03-02T00:00:00Z",
        location: "City 3",
        genre: "Drama"
    },
        {
        id: "4",
        title: "Game Title 4",
        description: "Game description 4",
        price: 49.99,
        platform: "PlayStation",
        imageUrl: "/images/game2.jpg",
        condition: "Used",
        sellerId: "seller4",
        sellerName: "Seller 4",
        status: "Available",
        createdAt: "2024-04-02T00:00:00Z",
        updatedAt: "2024-04-02T00:00:00Z",
        location: "City 4",
        genre: "RPG"
    },
        {
        id: "5",
        title: "Game Title 5",
        description: "Game description 5",
        price: 59.99,
        platform: "PlayStation",
        imageUrl: "/images/game2.jpg",
        condition: "Used",
        sellerId: "seller5",
        sellerName: "Seller 5",
        status: "Available",
        createdAt: "2025-05-02T00:00:00Z",
        updatedAt: "2025-05-02T00:00:00Z",
        location: "City 5",
        genre: "Adventure"
    },
        {
        id: "6",
        title: "Game Title 6",
        description: "Game description 6",
        price: 69.99,
        platform: "PlayStation",
        imageUrl: "/images/game2.jpg",
        condition: "Used",
        sellerId: "seller6",
        sellerName: "Seller 6",
        status: "Available",
        createdAt: "2026-06-02T00:00:00Z",
        updatedAt: "2026-06-02T00:00:00Z",
        location: "City 6",
        genre: "Action"
    }

];

export default mockListings;