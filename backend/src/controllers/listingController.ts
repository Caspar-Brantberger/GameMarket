import type { Request, Response } from "express";
import {createNewListing, getAllListings, getListing, updateExistingListing, deleteExistingListing} from "../services/listingService";

export async function getListings(req: Request, res: Response) {
    try {
        const listings = await getAllListings();
        res.json(listings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching listings", error });
    }
}

export async function getListingById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    try {
        const listing = await getListing(id);
        if (listing) {
            res.json(listing);
        } else {
            res.status(404).json({ message: "Listing not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching listing", error });
    }
}

export async function createListing(req: Request, res: Response) {
    const listingData = req.body;
    try {
        const newListing = await createNewListing(listingData);
        res.status(201).json(newListing);
    } catch (error) {
        res.status(500).json({ message: "Error creating listing", error });
    }
}

export async function updateListing(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedListing = await updateExistingListing(id, updatedData);

        if (updatedListing) {
            res.json(updatedListing);
        } else {
            res.status(404).json({ message: "Listing not found" });
        }
        }   catch (error) {
        res.status(500).json({ message: "Error updating listing", error });
    }
}


export async function deleteListing(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    try {
    const wasDeleted = await deleteExistingListing(id);

    if (!wasDeleted) {
        return res.status(404).json({ message: "Listing not found" });
    }

    return res.json({ message: "Listing deleted successfully" });
    } catch (error) {
    return res.status(500).json({ message: "Error deleting listing", error });
    }
}
