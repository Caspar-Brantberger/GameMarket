import express from 'express';
import listingRoutes from "./routes/listingRoutes";
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));


app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use("/api/listings", listingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.get("/api/health", (req, res) => {
    res.json({ status: "ok",
        message: "Backend is running smoothly!" 
            });
        });

        export default app;


