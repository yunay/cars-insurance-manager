import { observable } from 'mobx';

export class Insurance {

    @observable public customerId: string;

    @observable public insurerId: string;

    @observable public statementId: string;

    @observable public dateFrom: Date;

    @observable public dateTo: Date;
}