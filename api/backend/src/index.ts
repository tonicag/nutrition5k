import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import rateLimiter from "./middlewares/rate-limit";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

// Request logging middleware
if (process.env.NODE_ENV === "production") {
    app.use(morgan("combined")); // Apache combined log format
} else {
    app.use(morgan("dev")); // Colored output for development
}

// Middleware
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
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
