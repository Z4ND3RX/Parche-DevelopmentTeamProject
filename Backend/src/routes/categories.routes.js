import { Router } from "express";
import { prisma } from "../config.js";

const router = Router();

//get all categories
router.get("/categories", async (req, res, next) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        next(error);
    }
});

//filter category by id
router.get('/categories/:id', async (req, res) => {
    const categoryFound = await prisma.category.findFirst({
        where: {
            id: parseInt(req.params.id)
        }
    });
    if (!categoryFound) return res.status(404).json({ error: "Category not found" });
    return res.json(categoryFound);
})

//create new category
router.post('/categories', async (req, res) => {
    const newCategory = await prisma.category.create({
        data: req.body,
    })
    res.json(newCategory);
});

export default router;