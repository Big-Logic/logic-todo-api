import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import csurf from "csurf";
import rateLimit from "express-rate-limit";
import cors from "cors";

// ROUTES IMPORTS
import tasksRoutes from "./routes/tasks/tasksRoutes.mjs";
import meRoutes from "./routes/me/meRoutes.mjs";
import authRoutes from "./routes/auth/authRoutes.mjs";

// Controllers
import errorController from "./controller/errorController.mjs";
import unhandleRouteController from "./controller/unhandleRouteController.mjs";


const app = express();

// Middlewares
app.use(cors());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
}));
app.use(helmet());
app.use(cookieParser());
// app.use(csurf({ cookie: true }));
app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

// API ENDPOINTS
app.use('/api/v1/tasks', tasksRoutes);
app.use('/api/v1/me', meRoutes);
app.use("/api/v1/auth", authRoutes);


app.use("*", unhandleRouteController)

app.use(errorController)

export default app;