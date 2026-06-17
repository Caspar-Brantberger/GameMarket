import { Router } from "express";
import {
    getListings,
    createListing,
    getListingById,
    updateListing,
    deleteListing,
} from "../controllers/listingController";

import { requireAuth } from "../middleware/requireAuth";
import rateLimit from "express-rate-limit";
import { createListingSchema, updateListingSchema } from "../validation/listingSchemas"; 
import { validateBody } from "../middleware/validateBody";

const router = Router();

const createListingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
    limit: 20,
});

router.get("/", getListings);
router.get("/:id", getListingById);

router.post("/",createListingLimiter, requireAuth,validateBody(createListingSchema), createListing);
router.put("/:id", requireAuth,validateBody(updateListingSchema) ,updateListing);
router.delete("/:id", requireAuth, deleteListing);

export default router;