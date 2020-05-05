import { getRepository } from 'typeorm';
import { sign, verify } from 'jsonwebtoken'; // Vamos 'assinar' um token.
import { compare } from 'bcryptjs';
import User from '../models/User';
import authConfig from '../config/auth';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new Error('Incorrect email/password combination!');
        }

        // user.password -> Senha criptografada.
        // password -> Senha não criptografada.

        const passwordMatched = await compare(password, user.password); // Será comparado uma senha criptografa com uma não criptografada.

        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination!');
        }

        /**
         * sign -> é um método sincrono, por isso não precisamos do await.
         *
         * O primeiro parâmetro são informações do usuário que podemos utilizar
         * posteriormente. Payload, ficará dentro do token, mas não é seguro.
         * Pois qualquer pessoa consegue descriptografar.
         *
         * O segundo parâmetro é uma chave secreta.
         * http://www.md5.cz/
         *
         * O terceiro parâmetro são algumas configurações de nosso token.
         * 1) subject -> id do usuário que gerou o token.
         * 2) expiresIn -> O tempo de duração desse token.
         */

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        }); // é um método sincrono

        return {
            user,
            token,
        };
    }
}
export default AuthenticateUserService;
