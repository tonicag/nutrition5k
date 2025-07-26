import cors from "cors";
import "dotenv/config";
import express from "express";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import routes from "./routes";
import rateLimiter from "./middlewares/rate-limit";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(rateLimiter);

// Authentication middleware
// app.use(apiKeyAuthenticator);

// Health check endpoint
app.get("/", (req, res) => {
    res.json({
        message: "Nutrition API Server",
        version: "1.0.0",
        status: "healthy",
        timestamp: new Date().toISOString(),
    });
});

// API routes
app.use("/api", routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(
        `Model Service URL: ${process.env.MODEL_SERVICE_URL || "http://localhost:5000"}`
    );
});
