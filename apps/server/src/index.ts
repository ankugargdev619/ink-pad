import express from "express";
import cors from "cors";
import { SERVER_PORT } from "@repo/common/secrets";
const app = express();

// Import routers
import userRouter from "./api/v1/routes/userRouter.js";
import noteRouter from "./api/v1/routes/noteRouter.js";
import tagRouter from "./api/v1/routes/tagRouter.js";

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("api/v1/notes", noteRouter);
app.use("/ap1/v1/tag", tagRouter);

// Test Route
app.get("/health-check", (req, res) => {
    res.send("Server is up and running!");
})

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
})