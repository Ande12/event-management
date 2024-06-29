const express = require('express');
const router = express.Router();
const Event = require('../models/event'); 

// GET /events: Retrieve all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /events: Add a new event
router.post('/', async (req, res) => {
    const event = new Event({
        name: req.body.name,
        date: req.body.date,
        location: req.body.location,
        description: req.body.description
    });

    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET /events/:id: Retrieve an event by its ID
router.get('/:id', getEvent, (req, res) => {
    res.json(res.event);
});

// PUT /events/:id: Update an event
router.put('/:id', getEvent, async (req, res) => {
    if (req.body.name != null) {
        res.event.name = req.body.name;
    }
    if (req.body.date != null) {
        res.event.date = req.body.date;
    }
    if (req.body.location != null) {
        res.event.location = req.body.location;
    }
    if (req.body.description != null) {
        res.event.description = req.body.description;
    }

    try {
        const updatedEvent = await res.event.save();
        res.json(updatedEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /events/:id: Delete an event
router.delete('/:id', getEvent, async (req, res) => {
    try {
        await res.event.deleteOne(); // Updated to use deleteOne method
        res.json({ message: 'Deleted Event' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get event by ID
async function getEvent(req, res, next) {
    let event;
    try {
        event = await Event.findById(req.params.id);
        if (event == null) {
            return res.status(404).json({ message: 'Cannot find event' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.event = event;
    next();
}

module.exports = router;
