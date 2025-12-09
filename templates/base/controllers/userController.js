import * as userService from '../services/userService.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await userService.getUser(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

export const createUser = async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const deleted = await userService.deleteUser(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};
