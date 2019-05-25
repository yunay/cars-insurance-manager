import { observable } from 'mobx';
import * as moment from 'moment';

/**Вноски */
export class Installment{

    constructor(value:number = 0, date:moment.Moment = moment()){
        this.value = value;
        this.date = date;
    }

    @observable public value: number;

    @observable public date: moment.Moment;
}

export class Insurance {

    constructor(id: string = "", clientId: string = "", insurerId: string = "", note: string = "", installments:Installment[] = []) {

        this.id = id;
        this.clientId = clientId;
        this.insurerId = insurerId;
        this.createdOn = moment();
        this.note = note;
        this.installments = installments;
    }

    @observable public id: string;

    @observable public clientId: string;

    @observable public insurerId: string;

    @observable public createdOn: moment.Moment;

    @observable public note: string;

    @observable public installments: Installment[];
}