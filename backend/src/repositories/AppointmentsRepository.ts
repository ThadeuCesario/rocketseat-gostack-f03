/**
 * Repositórios:
 * Podemos pensar no repositório fazendo a ligação entre a persistência dos dados e
 * a nossa rota.
 * Persistência <-> Repositório <-> Rota
 * Dentro do repositório podemos fazer consultas das informações persistidas em dentro
 * de um banco ou alguma variável.
 * Geralmente teremos um repositório por model
 *
 * Estamos utilizando o private pois significa que é uma variável que não é acessada
 * por fora da classe.
 *
 * Relembrando que esse arquivo é responsável por tudo que vamos mexer nos dados.
 *
 * Aplicamos uma modificação dentro da função de 'create'. Para não termos parametros
 * de forma fixa, estou mandando um 'data' que é uma DTO. Data Transfer Object.
 *
 * O entityRepository iremos utilizar como um decorator sobre o nome repositorio
 *
 * O retorno de uma função assincrona sempre será uma promise.
 */
import { EntityRepository, Repository, Entity } from 'typeorm';
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: { date },
        });

        return findAppointment || null;
    }
}
export default AppointmentsRepository;
