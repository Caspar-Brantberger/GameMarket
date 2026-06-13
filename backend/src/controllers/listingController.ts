import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../middleware/requireAuth";

import {
    createNewListing,
    getAllListings,
    getListing,
    updateExistingListing,
    deleteExistingListing,
} from "../services/listingService";

export async function getListings(req: Request, res: Response) {
    try {
    const listings = await getAllListings();

    return res.status(200).json(listings);
    } catch (error) {
    return res.status(500).json({
        message: "Error fetching listings",
    });
    }
}

export async function getListingById(
    req: Request<{ id: string }>,
    res: Response
) {
    try {
    const { id } = req.params;
    const listing = await getListing(id);

    if (!listing) {
        return res.status(404).json({
        message: "Listing not found",
        });
    }

    return res.status(200).json(listing);
    } catch (error) {
    return res.status(500).json({
        message: "Error fetching listing",
    });
    }
}

export async function createListing(
    req: AuthenticatedRequest,
    res: Response
) {
    try {
    if (!req.userId) {
        return res.status(401).json({
        message: "Authentication required",
        });
    }

    const listingData = {
        ...req.body,
        sellerId: req.userId,
    };

    const newListing = await createNewListing(listingData);

    return res.status(201).json(newListing);
    } catch (error) {
    return res.status(400).json({
        message: "Error creating listing",
        error: (error as Error).message,
    });
    }
}

export async function updateListing(
    req: AuthenticatedRequest,
    res: Response
) {
    try {
    const { id } = req.params;

    if (!req.userId) {
        return res.status(401).json({
        message: "Authentication required",
        });
    }

    const existingListing = await getListing(id);

    if (!existingListing) {
        return res.status(404).json({
        message: "Listing not found",
        });
    }

    if (existingListing.sellerId !== req.userId) {
        return res.status(403).json({
        message: "You are not allowed to update this listing",
        });
    }

    
    const { sellerId, ...updatedData } = req.body;

    const updatedListing = await updateExistingListing(id, updatedData);

    if (!updatedListing) {
        return res.status(404).json({
        message: "Listing not found",
        });
    }

    return res.status(200).json(updatedListing);
    } catch (error) {
    return res.status(500).json({
        message: "Error updating listing",
        error: (error as Error).message,
    });
    }
}

export async function deleteListing(
    req: AuthenticatedRequest,
    res: Response
) {
    try {
    const { id } = req.params;

    if (!req.userId) {
        return res.status(401).json({
        message: "Authentication required",
        });
    }

    const existingListing = await getListing(id);

    if (!existingListing) {
        return res.status(404).json({
        message: "Listing not found",
        });
    }

    if (existingListing.sellerId !== req.userId) {
        return res.status(403).json({
        message: "You are not allowed to delete this listing",
        });
    }

    const wasDeleted = await deleteExistingListing(id);

    if (!wasDeleted) {
        return res.status(404).json({
        message: "Listing not found",
        });
    }

    return res.status(200).json({
        message: "Listing deleted successfully",
    });
    } catch (error) {
    return res.status(500).json({
        message: "Error deleting listing",
        error: (error as Error).message,
    });
    }
}
