import { observable } from 'mobx';

/**Вноски */
export class CarInfo {

    constructor(id: string = "", registrationNumber: string = "", registrationForm:string = "") {
        this.id = id;
        this.registrationNumber = registrationNumber;
        this.registrationForm = registrationForm;
    }

    @observable public id: string;

    @observable public registrationNumber: string

    @observable public registrationForm: string;
}

export class Customer {

    constructor(carRegistrationInfo: CarInfo[] = [], id: string = "", firstname: string = "", secondname: string = "", thirdname: string = "", phone: string = "", statement: string = "", statementId:string = "") {

        this.id = id;
        this.firstname = firstname;
        this.secondname = secondname;
        this.thirdname = thirdname;
        this.phone = phone;
        this.statement = statement;
        this.statementId = statementId;
        this.carRegistrationInfo = carRegistrationInfo;
        this.isActive = true;
    }

    @observable public id: string;

    @observable public firstname: string;

    @observable public secondname: string;

    @observable public thirdname: string;

    @observable public phone: string;

    @observable public statement: string;

    @observable public statementId: string;

    @observable public carRegistrationInfo: CarInfo[];

    @observable public isActive: boolean;
}