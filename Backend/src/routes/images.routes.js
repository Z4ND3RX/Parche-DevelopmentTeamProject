import { Router } from "express";
import { prisma } from "../config.js";

const router = Router();

//get all images
router.get("/images", async (req, res, next) => {
    try {
        const images = await prisma.image.findMany();
        res.json(images);
    } catch (error) {
        next(error);
    }
});

export default router;