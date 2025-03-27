import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import routers
import userRouter from "./api/v1/routes/userRouter.js";
import noteRouter from "./api/v1/routes/noteRouter.js";
import tagRouter from "./api/v1/routes/tagRouter.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("api/v1/notes", noteRouter);
app.use("/ap1/v1/tag", tagRouter);

// Test Route
app.get("/health-check", (req, res) => {
    res.send("Server is up and running!");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})