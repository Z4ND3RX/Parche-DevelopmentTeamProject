import { Router } from "express";
import { prisma } from "../config.js";
import upload from '../controllers/upload.js';

const router = Router();

// get all events
router.get('/events', async (req, res) => {
    const events = await prisma.event.findMany()
    res.json(events)
})

//filter event by id
router.get('/event/:eventId', async (req, res) => {
    const { eventId } = req.params;
    try {
        const event = await prisma.event.findUnique({
            where: { id: parseInt(eventId) },
            include: {
                eventsCategories: {
                    include: {
                        category: true
                    }
                },
                eventImages: true
            }
        });

        if (!event) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el evento' });
    }
});

//create new event
router.post('/events', upload, async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'Debes subir al menos un archivo' });
      }
  
      const images = req.files.map(file => ({
        type: file.mimetype,
        name: file.filename,
      }));
  
      const eventData = {
        ...req.body,
        eventImages: {
          create: images
        }
      };
  
      const newEvent = await prisma.event.create({
        data: eventData,
        include: {
          eventImages: true
        }
      });
  
      res.json(newEvent);
    } catch (error) {
      console.error('Error creando el evento:', error);
      res.status(500).json({ error: 'Error al crear el evento' });
    }
  });  

//delete event
router.delete('/event/:eventId', async (req, res) => {
    const { eventId } = req.params;

    try {
        await prisma.$transaction([
            prisma.eventCategory.deleteMany({
                where: {
                    idEvent: parseInt(eventId)
                }
            }),
            prisma.image.deleteMany({
                where: {
                    idEvent: parseInt(eventId)
                }
            }),
            prisma.event.delete({
                where: {
                    id: parseInt(eventId)
                }
            })
        ]);

        res.json({ message: 'Evento eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el evento' });
    }
});

//edit event
router.put('/events/:id', async (req, res) => {
    const eventUpdated = await prisma.event.update({
        where: {
            id: parseInt(req.params.id),
        },
        data: req.body,
    });
    return res.json(eventUpdated);
})

export default router;