import express from "express";

const router = express.Router();

//establishing router for homepage
router.route("/").get((req, res) => res.send("Hello World"));

export default router;
