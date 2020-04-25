/**
 * Essa é nossa entidade de angendamento.
 * Sempre que trabalharmos com agendamentos, utilizaremos essa classe para
 * caracterizar um agendamento.
 * Toda vez que estamos criando algum tipo de dado que será armazenado em nossa
 * aplicação, vamos criar um modelo (models, ou entidades).
 */

import { uuid } from 'uuidv4';

class Appointment {
    id: string;

    provider: string;

    date: Date;

    constructor(provider: string, date: Date) {
        this.id = uuid();
        this.provider = provider;
        this.date = date;
    }
}

export default Appointment;
