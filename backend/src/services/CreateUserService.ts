import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new AppError('Email address already used.'); // Service não conecta diretamente com o response, por isso dispara um erro.
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        }); // Lembrando que é apenas criado uma instância e que os dados não foram salvos ainda no banco de dados.

        await usersRepository.save(user); // Utilizando o save() e o await, salvamos o dado na base.

        return user;
    }
}

export default CreateUserService;
