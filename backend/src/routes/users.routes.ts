import { Router } from 'express';
import { CreateDateColumn } from 'typeorm';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        delete user.password; // Não é o ideal retornar a senha do usuário.

        return response.json(user);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

export default usersRouter;
