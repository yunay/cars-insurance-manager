
export enum StatementType{
    city = 1,
    village = 2 
}

export class Statement{
    
    public id:string;

    public name:string;

    public statementType:StatementType
}