export type GamePlatform = 

"PC" 
| "PlayStation" 
| "Xbox" 
| "Nintendo Switch" 
| "Mobile";

export type ListingCondition = 

"New" 
| "Used" 
| "Like New" 
| "Refurbished" 
| "Damaged";

export type ListingStatus = 
"Available" 
| "Sold" 
| "Pending";

export type Seller = {
    id:string;
    username: string;
    email: string;
};

export type GameListing = {
    id: string;
    title: string;
    description: string;
    price: number;
    platform: GamePlatform;
    imageUrl: string;
    genre?: string;
    condition: ListingCondition;
    sellerId: string;
    seller?: Seller;
    status: ListingStatus;
    createdAt: string;
    updatedAt: string;
    location: string;
};
