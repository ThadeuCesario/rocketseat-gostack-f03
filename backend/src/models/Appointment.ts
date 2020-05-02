/**
 * Essa é nossa entidade de angendamento.
 * Sempre que trabalharmos com agendamentos, utilizaremos essa classe para
 * caracterizar um agendamento.
 * Toda vez que estamos criando algum tipo de dado que será armazenado em nossa
 * aplicação, vamos criar um modelo (models, ou entidades).
 *
 * Fizemos uma alteraração dentro desse Model.
 * Agora o constructor recebe um objeto DTO que está baseado na tipagem da interface
 * ModelAppointmentDTO.
 * Entretanto no caso dos models precisamos tomar um cuidado para que no constructor
 * não seja referenciado o id, para isso utilizamos o Omit<Appointment, 'id'>
 * Dessa forma estamos omitindo o valor do Id.
 *
 * Precisamos informar que nosso appointment está relacionado com uma tabela de
 * nosso banco de dados.
 * Entity no ORM consideramos tudo aquilo que será salvo no banco de dados.
 *
 * LIberando o decorator no tsconfig podemos utilizar o @Entity() logo acima
 * da classe. Dessa forma é como se passassemos a classe como parâmetro.
 *
 * 'PrimaryGeneratedColumn' -> Vamos utilizar para o id, porque o id é a chave primaria.
 *
 * Quando criamos uma entidade do TypeORM o constructor é criado de forma automática.
 * Então não precisamos manter o constructor.
 */

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: string;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Appointment;
