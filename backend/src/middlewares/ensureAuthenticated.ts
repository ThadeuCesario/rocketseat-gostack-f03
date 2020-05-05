/**
 * Middleware sempre possui três parâmetros:
 * -> request
 * -> response
 * -> next
 *
 * 'jsonwebtoken' possui uma lib para verificar se o token é valido ou não.
 * Além disso o método verify retorna o token decodificado.
 *
 * Sempre que formos modificar o funcionamento de uma biblioteca, teremos também
 * que modificar os tipos daquela biblioteca.
 */

import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    /* Validação do token JQT
     * Primeiramente temos que pega o token pelo header da request.
     */

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('JQT token is missing.');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret); // Passamos como parametro o token e a secret key.

        const { sub } = decoded as TokenPayload;

        /**
         * Teremos o id do usuário em todas nossa rotas que são autenticadas.
         */
        request.user = {
            id: sub,
        };

        return next();
    } catch (error) {
        throw new Error('Invalid JWT Token.');
    }
}
