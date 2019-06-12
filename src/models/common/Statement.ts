import { observable } from 'mobx';

export enum StatementType {
    city = 1,
    village = 2
}

export class Statement {

    constructor(id: string = "", name: string = "", statementWithType: string = "", statementType: StatementType = StatementType.city) {
        this.id = id;
        this.name = name;
        this.statementWithType = statementWithType;
        this.statementType = statementType;
    }

    @observable public id: string;

    @observable public name: string;

    @observable public statementWithType: string;

    @observable public statementType: StatementType
}