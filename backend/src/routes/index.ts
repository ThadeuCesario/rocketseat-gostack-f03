/**
 * Router é um módulo de rotas do express. Isolando os arquivos de rotas do nosso
 * app principal.
 * Temos todos os requests que já conheçemos. GET, POST, PUT, DELETE.
 */

import { Router } from 'express';

const routes = Router();

routes.post('/users', (request, response) => {
    const { name, email } = request.body;

    const user = {
        name,
        email,
    };

    return response.json(user);
});

export default routes;
