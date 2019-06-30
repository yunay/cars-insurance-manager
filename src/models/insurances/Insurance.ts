import { observable } from 'mobx';
import * as moment from 'moment';

/**Вноски */
export class Installment{

    constructor(value:number = 0, date = moment().toDate()){
        this.value = value;
        this.date = date;
    }

    @observable public value: number;

    @observable public date: Date;
}

export class Insurance {

    constructor(id: string = "", customerId: string = "", insurerId: string = "", date = moment().toDate(), note: string = "", installments:Installment[] = [], carRegNumber:string = "") {

        this.id = id;
        this.customerId = customerId;
        this.insurerId = insurerId;
        this.createdOn = date;
        this.note = note;
        this.installments = installments;
        this.carRegNumber = carRegNumber;
    }

    @observable public id: string;

    @observable public customerId: string;

    @observable public insurerId: string;

    @observable public createdOn: Date;

    @observable public note: string;

    @observable public installments: Installment[];

    @observable public carRegNumber: string;
}