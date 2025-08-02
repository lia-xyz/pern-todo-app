export const titleValidator = (req, res, next) => {
    const { title } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'Invalid or missing "title"' });
    }

    next();
}

export const isCompletedValidator = (req, res, next) => {
    const { isCompleted } = req.body;

    if (typeof isCompleted !== 'boolean') {
        return res.status(400).json({ error: 'Invalid or missing "isCompleted"' });
    }

    next();
}