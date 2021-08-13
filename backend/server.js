import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

//setting up express app and settng up to use cors
const app = express();
app.use(cors());
app.use(express.json());

//linking to Router in restaurants.route.js for /api/v1/restaurants endpoint
app.use("/api/v1/restaurants", restaurants);
//for any other route other than the main api route, return 404
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
