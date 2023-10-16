import express from "express";
import cors from "cors";
import eventsRoutes from "./routes/events.routes.js";
import imagesRoutes from "./routes/images.routes.js";
import categoriesRoutes from "./routes/categories.routes.js"
import bridgeRoutes from "./routes/categoriesEvents.routes.js";
import { PORT } from "./config.js";


const app = express()

app.use(cors());
app.use(express.json())

app.use("/api", eventsRoutes);
app.use("/api", imagesRoutes);
app.use("/api", categoriesRoutes)
app.use("/api", bridgeRoutes);

app.listen(PORT)
console.log('Server  on port', PORT)