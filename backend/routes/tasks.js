const router = require('express').Router();
const Task = require('../models/Task');
const protect = require('../middleware/auth');

router.use(protect);

router.get('/', async (req, res) => {
    try {
        const { status, priority } = req.query;
        const filter = { user: req.user._id };
        if (status) filter.status = status;
        if (priority) filter.priority = priority;
        const tasks = await Task.find(filter).sort({ createdAt: -1 });
        res.json(tasks);
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, priority, status } = req.body;
        if (!title || !title.trim())
            return res.status(400).json({ error: 'Title is required' });
        const task = await Task.create({ title, description, priority, status, user: req.user._id });
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { title, description, priority, status } = req.body;
        if (title !== undefined && !title.trim())
            return res.status(400).json({ error: 'Title cannot be empty' });
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { title, description, priority, status },
            { new: true, runValidators: true }
        );
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch {
        res.status(400).json({ error: 'Invalid request' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json({ message: 'Task deleted' });
    } catch {
        res.status(400).json({ error: 'Invalid ID' });
    }
});

module.exports = router;
