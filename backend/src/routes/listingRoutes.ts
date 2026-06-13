import { Router } from "express";
import {
    getListings,
    createListing,
    getListingById,
    updateListing,
    deleteListing,
} from "../controllers/listingController";

import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.get("/", getListings);
router.get("/:id", getListingById);

router.post("/", requireAuth, createListing);
router.put("/:id", requireAuth, updateListing);
router.delete("/:id", requireAuth, deleteListing);

export default router;