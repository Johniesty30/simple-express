// server.js
import express from "express";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001; 
connectDb();

app.use(express.json()); 

app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
});