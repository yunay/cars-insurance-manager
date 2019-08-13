import { observable } from 'mobx';

export class Insurer {

    constructor(id: string = "", name: string = "") {

        this.id = id;
        this.name = name;
        this.isActive = true;
    }

    @observable public id: string;

    @observable public name: string;

    @observable public isActive: boolean;
}