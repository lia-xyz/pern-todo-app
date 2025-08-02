import pool from '../db/db.js';
import { mapTodo } from '../utils/mapTodo.js';

export const createTodo = async (req, res, next) => {
    const { title } = req.body;

    try{
        const result = await pool.query('INSERT INTO todos (title) VALUES ($1) RETURNING *', [title]);

        res.status(201).json(mapTodo(result.rows[0]));

    } catch (err) {
        next(err);
    }
};

export const getTodos = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');

        res.status(200).json(result.rows.map(mapTodo));

    } catch (err) {
        next(err);
    }
};

export const updateTodo = async (req, res, next) => {
    const { title } = req.body;

    try {
        const result = await pool.query('UPDATE todos SET title = $1 WHERE id = $2 RETURNING *', [title, req.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.status(200).json(mapTodo(result.rows[0]));

    } catch (err) {
        next(err);
    }
};

export const toggleTodo = async (req, res, next) => {
    const { isCompleted } = req.body;

    try {
        const result = await pool.query('UPDATE todos SET is_completed = $1 WHERE id = $2 RETURNING *', [isCompleted, req.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.status(200).json(mapTodo(result.rows[0]));

    } catch (err) {
        next(err);
    }
};

export const deleteTodo = async (req, res, next) => {
    try {
        const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [req.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.sendStatus(204);

    } catch (err) {
        next(err);
    }
};