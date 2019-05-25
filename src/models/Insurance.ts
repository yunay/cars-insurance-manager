import { observable } from 'mobx';
import * as moment from 'moment';

/**Вноски */
export class Installment{
    @observable public value: number;

    @observable public date: moment.Moment;
}

export class Insurance {

    constructor(id: string = "", clientId: string = "", insurarId: string = "", note: string = "", installments:Installment[] = []) {

        this.id = id;
        this.clientId = clientId;
        this.insurarId = insurarId;
        this.createdOn = moment();
        this.note = note;
        this.installments = installments;
    }

    @observable public id: string;

    @observable public clientId: string;

    @observable public insurarId: string;

    @observable public createdOn: moment.Moment;

    @observable public note: string;

    @observable public installments: Installment[];
}