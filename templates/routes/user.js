import express from 'express'
const router = express.Router();
import * as userService from '../services/userService'

router.get('/', async (req, res) => {
    const users = await userService.getAllUsers();
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const user = await userService.getUser(req.params.id);
    res.json(user);
});

router.post('/', async (req, res) => {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
});

router.delete('/:id', async (req, res) => {
    await userService.deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
});

export default router;
