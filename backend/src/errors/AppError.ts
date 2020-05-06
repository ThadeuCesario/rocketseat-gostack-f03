/**
 * O statusCode está relacionado com aquele código de erro do método HTTP:
 * Por exemplo, 400, 401, 404...
 *
 * Essa classe de erro será somente para o fluxo padrão de rotas.
 *
 *
 */

class AppError {
    public readonly message: string;

    public readonly statusCode: number;

    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default AppError;
