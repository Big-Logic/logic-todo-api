import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import csurf from "csurf";
import rateLimit from "express-rate-limit";

// ROUTES IMPORTS
import tasksRoutes from "./routes/tasks/tasksRoutes.mjs";
import meRoutes from "./routes/me/meRoutes.mjs";
import authRoutes from "./routes/auth/authRoutes.mjs";


const app = express();

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
}));
app.use(helmet());
app.use(csurf());
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

// API ENDPOINTS
app.use('/api/v1/tasks', tasksRoutes);
app.use('/api/v1/me', meRoutes);
app.use("/api/v1/auth", authRoutes);


app.use("*", async(req, res) => {
    console.log('unhandle route')
})

app.use(async (err, req, res, next) => {
    console.log(err);
})

export default app;