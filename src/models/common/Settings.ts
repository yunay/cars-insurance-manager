import { observable } from 'mobx';

export class Settings {

    constructor(daysBeforeInstallmentExpire: number = 1) {
        this.daysBeforeInstallmentExpire = daysBeforeInstallmentExpire;
    }

    @observable public daysBeforeInstallmentExpire: number;

    @observable public notificationIntervalInHours: number;
}