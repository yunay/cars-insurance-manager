import { observable } from 'mobx';

export class Settings {

    constructor(daysBeforeInstallmentExpire: number = 7, notificationIntervalInHours: number = 1) {
        this.daysBeforeInstallmentExpire = daysBeforeInstallmentExpire;
        this.notificationIntervalInHours = notificationIntervalInHours;
    }

    public id: number = 1;

    @observable public daysBeforeInstallmentExpire: number;

    @observable public notificationIntervalInHours: number;
}