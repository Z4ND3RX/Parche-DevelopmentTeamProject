import { Router } from "express";
import { prisma } from "../config.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

router.get("/uploads/:imageName", (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, '../../uploads', imageName);
    res.sendFile(imagePath);
  });