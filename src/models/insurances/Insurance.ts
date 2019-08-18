import { observable } from 'mobx';
import * as moment from 'moment';

/**Вноски */
export class Installment{

    constructor(id: string = "", value: number = 0, date = moment().toDate()) {
        this.id = id;
        this.value = value;
        this.date = date;
        this.isPaid = false;
    }

    @observable public id: string;

    @observable public value: number;

    @observable public date: Date;

    @observable public isPaid: boolean;
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
        this.isActive = true;
    }

    @observable public id: string;

    @observable public customerId: string;

    @observable public insurerId: string;

    @observable public createdOn: Date;

    @observable public note: string;

    @observable public installments: Installment[];

    @observable public carRegNumber: string;

    @observable public isActive: boolean;
}