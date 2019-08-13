import { observable } from 'mobx';

export class Customer {

    constructor(carRegistrationNumbers:string[] = [], id: string = "", firstname: string = "", secondname: string = "", thirdname: string = "", phone: string = "", statement: string = "", statementId:string = "") {

        this.id = id;
        this.firstname = firstname;
        this.secondname = secondname;
        this.thirdname = thirdname;
        this.phone = phone;
        this.statement = statement;
        this.statementId = statementId;
        this.carRegistrationNumbers = carRegistrationNumbers;
        this.isActive = true;
    }

    @observable public id: string;

    @observable public firstname: string;

    @observable public secondname: string;

    @observable public thirdname: string;

    @observable public phone: string;

    @observable public statement: string;

    @observable public statementId: string;

    @observable public carRegistrationNumbers: string[];

    @observable public isActive: boolean;
}