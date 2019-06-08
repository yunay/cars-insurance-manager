import { observable } from 'mobx';

export class Customer {

    constructor(carRegistrationNumbers:string[] = [], id: string = "", firstname: string = "", secondname: string = "", thirdname: string = "", phone: string = "", city: string = "") {

        this.id = id;
        this.firstname = firstname;
        this.secondname = secondname;
        this.thirdname = thirdname;
        this.phone = phone;
        this.city = city;
        this.carRegistrationNumbers = carRegistrationNumbers;
    }

    @observable public id: string;

    @observable public firstname: string;

    @observable public secondname: string;

    @observable public thirdname: string;

    @observable public phone: string;

    @observable public city: string;

    @observable public carRegistrationNumbers: string[];
}