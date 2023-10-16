import { Router } from "express";
import { prisma } from "../config.js";

const router = Router();

//get all bridges with its events and categories information
router.get("/categoriesevents", async (req, res, next) => {
    try {
        const categoriesEvents = await prisma.eventCategory.findMany(
            {
                include: {
                    category: true,
                    event: true,
                },
            }
        );
        res.json(categoriesEvents);
    } catch (error) {
        next(error);
    }
});

//filter bridge by id with its event and categories information
router.get("/categoriesevents/:idEvent", async (req, res, next) => {
    try {
        const categoriesEvents = await prisma.eventCategory.findMany(
            {
                where: {
                    idEvent: parseInt(req.params.idEvent)
                },

                include: {
                    category: true,
                },
            }
        );
        res.json(categoriesEvents);
    } catch (error) {
        next(error);
    }
});

// Filter bridge with event by nicknameUser and categoryId
router.get('/events/:categoryId/:nicknameUser', async (req, res) => {
    const { categoryId, nicknameUser } = req.params;

    try {
        const events = await prisma.event.findMany({
            where: {
                eventsCategories: {
                    some: {
                        category: {
                            id: categoryId
                        }
                    }
                },
                nicknameUser: nicknameUser
            },
            include: {
                eventsCategories: true,
                eventImages: true
            }
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to looking events' });
    }
});

//Filter bridge with event by category
router.get('/events-category/:categoryId', async (req, res) => {
    const { categoryId } = req.params;

    try {
        const events = await prisma.event.findMany({
            where: {
                eventsCategories: {
                    some: {
                        category: {
                            id: categoryId
                        }
                    }
                }
            },
            include: {
                eventsCategories: true,
                eventImages: true
            }
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to looking events' });
    }
});


//create new bridge
router.post('/categoriesEvents/:id', async (req, res) => {
    const relations = req.body; // Array with categoryId and eventId
    try {
        // Query existing relations between categories and the given event
        const existingRelations = await prisma.eventCategory.findMany({
            where: {
                idEvent: parseInt(req.params.id),
                idCategory: {
                    in: relations.map(relation => relation.idCategory)
                }
            }
        });

        // Filter relationships to be created, excluding those that already exist to avoid duplicates.
        const relationsToCreate = relations.filter(relation => {
            return !existingRelations.some(existingRelation =>
                existingRelation.idCategory === relation.idCategory
            );
        });

        // Creating relationships that do not exist
        const createdRelations = await Promise.all(
            relationsToCreate.map(async (relation) => {
                const newRelation = await prisma.eventCategory.create({
                    data: {
                        idCategory: relation.idCategory,
                        idEvent: parseInt(req.params.id),
                    },
                });
                return newRelation;
            })
        );
        res.json(createdRelations);
    } catch (error) {
        console.error('Error creating relations:', error);
        res.status(500).json({ error: 'Failed to create relations' });
    }
});

// Delete relationships beetween categories and events
router.delete('/categoriesEvents/:eventId', async (req, res) => {
    const eventId = parseInt(req.params.eventId);
    const relationsToDelete = req.body; // Array with categoryId(s) to delete relationships

    try {
        const deletedRelations = await Promise.all(
            relationsToDelete.map(async (categoryId) => {
                await prisma.eventCategory.deleteMany({
                    where: {
                        idEvent: eventId,
                        idCategory: categoryId,
                    },
                });
                return categoryId;
            })
        );

        res.json({ deletedRelations });
    } catch (error) {
        console.error('Error deleting relations:', error);
        res.status(500).json({ error: 'Error al eliminar las relaciones' });
    }
});

export default router;