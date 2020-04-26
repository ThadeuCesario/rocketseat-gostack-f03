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
 */

import { uuid } from 'uuidv4';

interface ModelAppointmentDTO {
    provider: string;
    date: Date;
}

class Appointment {
    id: string;

    provider: string;

    date: Date;

    constructor({ provider, date }: Omit<Appointment, 'id'>) {
        this.id = uuid();
        this.provider = provider;
        this.date = date;
    }
}

export default Appointment;
