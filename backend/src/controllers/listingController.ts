import type { Request, Response } from "express";

export function getListings(req: Request, res: Response) {
    res.json({
    message: "Get all listings",
    });
}

export function getListingById(req: Request, res: Response) {
    const { id } = req.params;

    res.json({
    message: `Get listing with id ${id}`,
    });
}

export function createListing(req: Request, res: Response) {
    res.status(201).json({
    message: "Create listing",
    data: req.body,
    });
}

export function updateListing(req: Request, res: Response) {
    const { id } = req.params;

    res.json({
    message: `Update listing with id ${id}`,
    data: req.body,
    });
}

export function deleteListing(req: Request, res: Response) {
    const { id } = req.params;

    res.json({
    message: `Delete listing with id ${id}`,
    });
}