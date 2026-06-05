import express from 'express';
import listingRoutes from "./routes/listingRoutes";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/listings", listingRoutes);

app.get("/api/health", (req, res) => {
    res.json({ status: "ok",
        message: "Backend is running smoothly!" 
            });
        });

        export default app;


