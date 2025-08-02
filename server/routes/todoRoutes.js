import express from 'express';
const router = express.Router();

import {
    createTodo,
    getTodos,
    updateTodo,
    toggleTodo,
    deleteTodo
} from '../controllers/todoController.js';

import {
    titleValidator,
    isCompletedValidator
} from '../middleware/validator.js'

router.param('id', (req, res, next, id) => {
if (!/^[1-9]\d*$/.test(id)) {
        return res.status(400).json({ error: 'Invalid id parameter' });
    }
    req.id = Number(id);
    next();
})

router.post('/', titleValidator, createTodo);
router.get('/', getTodos);
router.put('/:id', titleValidator, updateTodo);
router.patch('/:id', isCompletedValidator, toggleTodo);
router.delete('/:id', deleteTodo);

export default router;