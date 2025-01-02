import express from "express";
import cookieParser from "cookie-parser";

// ROUTES IMPORTS
import tasksRoutes from "./routes/tasks/tasksRoutes.mjs";
import meRoutes from "./routes/me/meRoutes.mjs";
import authRoutes from "./routes/auth/authRoutes.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser());

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