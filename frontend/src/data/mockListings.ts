import type { GameListing } from "../types/listing";

const mockListings: GameListing[] = [
    {
        id: "1",
        title: "Batman: Arkham Knight",
        description: "I am Batman!",
        price: 19.99,
        platform: "PC",
        imageUrl: "/images/batman.jpg",
        condition: "New",
        sellerId: "seller1",
        sellerName: "Superman",
        status: "Available",
        createdAt: "2021-01-01T00:00:00Z",
        updatedAt: "2021-01-01T00:00:00Z",
        location: "Texas",
        genre: "Science Fiction"
    },
    {
        id: "2",
        title: "Doom Eternal",
        description: "Hell on Earth!",
        price: 29.99,
        platform: "PlayStation",
        imageUrl: "/images/doom.jpg",
        condition: "Used",
        sellerId: "seller2",
        sellerName: "Spiderman",
        status: "Sold",
        createdAt: "2022-02-02T00:00:00Z",
        updatedAt: "2022-02-02T00:00:00Z",
        location: "Södertälje",
        genre: "shooter"
    },
    {
        id: "3",
        title: "The Witcher 3: Wild Hunt",
        description: "I am Geralt of Rivia!",
        price: 39.99,
        platform: "PlayStation",
        imageUrl: "/images/witcher.jpg",
        condition: "Used",
        sellerId: "seller3",
        sellerName: "Loki",
        status: "Pending",
        createdAt: "2023-03-02T00:00:00Z",
        updatedAt: "2023-03-02T00:00:00Z",
        location: "Chicago",
        genre: "Drama"
    },
        {
        id: "4",
        title: "Cyberpunk 2077",
        description: "GTA in the future!",
        price: 49.99,
        platform: "PlayStation",
        imageUrl: "/images/cyberpunk.jpg",
        condition: "Used",
        sellerId: "seller4",
        sellerName: "Thor",
        status: "Available",
        createdAt: "2024-04-02T00:00:00Z",
        updatedAt: "2024-04-02T00:00:00Z",
        location: "California",
        genre: "RPG"
    },
        {
        id: "5",
        title: "Red Dead Redemption 2",
        description: "GTA in the Wild West!",
        price: 59.99,
        platform: "PlayStation",
        imageUrl: "/images/red.jpg",
        condition: "Used",
        sellerId: "seller5",
        sellerName: "Iron Man",
        status: "Pending",
        createdAt: "2025-05-02T00:00:00Z",
        updatedAt: "2025-05-02T00:00:00Z",
        location: "Florida",
        genre: "Adventure"
    },
        {
        id: "6",
        title: "Fallout: New Vegas",
        description: "Simply the best Fallout game!",
        price: 69.99,
        platform: "PlayStation",
        imageUrl: "/images/fallout.jpg",
        condition: "Used",
        sellerId: "seller6",
        sellerName: "Captain America",
        status: "Sold",
        createdAt: "2026-06-02T00:00:00Z",
        updatedAt: "2026-06-02T00:00:00Z",
        location: "New york",
        genre: "Action"
    }

];

export default mockListings;