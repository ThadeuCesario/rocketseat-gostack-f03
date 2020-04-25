/**
 * Router é um módulo de rotas do express. Isolando os arquivos de rotas do nosso
 * app principal.
 * Temos todos os requests que já conheçemos. GET, POST, PUT, DELETE.
 */

import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => response.json({ message: 'Hello GoStaaaaaaaaaaaaaaaaack' }));

export default routes;
