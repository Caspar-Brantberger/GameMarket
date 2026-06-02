"use client";

import { useState } from "react";
import type {GamePlatform, ListingCondition,GameListing} from "@/types/listing";

export default function CreateListingPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [platform, setPlatform] = useState<GamePlatform>("PC");
    const [condition, setCondition] = useState<ListingCondition>("Used");
    const [imageUrl, setImageUrl] = useState("");
    const [genre, setGenre] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("");
    const [sellerName, setSellerName] = useState("");
    const [sellerEmail, setSellerEmail] = useState("");

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {

        const file = e.target.files?.[0];
        
        if(!file){
            setImageUrl("");
            return;
        }

        if(!file.type.includes("jpeg") && !file.type.includes("png") && !file.type.includes("jpg")){
            alert("Please select a valid image file (jpg, jpeg, png)");
            setImageUrl("");
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);

    }
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const newListing: GameListing = {
            id:crypto.randomUUID(),
            title,
            description,
            price,
            platform,
            condition,
            imageUrl: imageUrl || "/images/default-game.jpg",
            genre,
            location,
            status: "Available",
            sellerName,
            sellerEmail,
            sellerId: "mockSellerId",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            
        };

        console.log("New Listing:", newListing);
        alert("Listing created successfully! Check the console for details.");
    }

    //return()
}