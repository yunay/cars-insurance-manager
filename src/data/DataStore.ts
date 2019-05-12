import * as Datastore from 'nedb';
import { Customer } from '../models/Customer'

export enum DbResponseType{
    withError=1,
    success=2
}

export class DataResult{

    constructor(responseType:DbResponseType = DbResponseType.success, data:any = null){
        this.reponseType = responseType;
        this.data = data;
    }

    reponseType:DbResponseType
    data:any
}

var db = {
    customers: new Datastore({ filename: './src/data/customers.db' }),
    insurances: new Datastore({ filename: './src/data/insurances.db' })
};

db.customers.loadDatabase();
db.insurances.loadDatabase();

export const DbContext = {

    addCustomer: (firstName: string, secondname: string, thirdname: string, phone: string, city: string): Promise<DataResult> => {
        let customerId = `${+new Date}_customer`
        let customer = new Customer(customerId, firstName, secondname, thirdname, phone, city);

        return new Promise((resolve) => {
            db.customers.insert(customer, (err, doc) => {
                if (err)
                    console.error(err);
                else
                    resolve(new DataResult(DbResponseType.success,doc));
            });
        })
    },

    getCustomers: () => db.customers.find({}),

    updateCustomer: () => {
        console.error("Not Implemented")
    },

    deleteCustomers: () => {
        console.error("Not Implemented")
    },

    addInsurance: () => {
        console.error("Not Implemented")
    },

    getInsurances: () => db.insurances.find({}),

    updateInsurance: () => {
        console.error("Not Implemented")
    },

    deleteInsurance: () => {
        console.error("Not Implemented")
    }
}