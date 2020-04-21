import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => response.json({ message: 'Hello Hello Hello Hello hELLO' }));

export default routes;
