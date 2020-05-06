import { Router, response } from 'express';
import { CreateDateColumn } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticaded from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

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

/**
 * Estamos usando o método patch, para atualizar uma única informação do usuário
 *
 * PUT -> Quando queremos atualizar uma informação por completo.
 * PATCH -> Informação única e pontual.
 *
 * Lembrando que para um usuário alterar uma avatar dele, é necessário estar
 * autenticado.
 */
usersRouter.patch(
    '/avatar',
    ensureAuthenticaded,
    upload.single('avatar'),
    async (request, response) => {
        try {
            const updateUserAvatar = new UpdateUserAvatarService();

            const user = await updateUserAvatar.execute({
                user_id: request.user.id,
                avatarFilename: request.file.filename,
            });

            delete user.password;

            return response.json(user);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    },
);

export default usersRouter;
