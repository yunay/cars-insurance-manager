import * as Datastore from 'nedb';
import { Customer } from '../models/Customer'
import { Insurance, Installment } from '../models/Insurance';
import { Insurer } from '../models/Insurer';

export enum DbResponseType {
    withError = 1,
    success = 2
}

export class DataResult {

    constructor(responseType: DbResponseType = DbResponseType.success, data: any = null) {
        this.reponseType = responseType;
        this.data = data;
    }

    reponseType: DbResponseType
    data: any
}

var db = {
    customers: new Datastore({ filename: './src/data/customers.db' }),
    insurances: new Datastore({ filename: './src/data/insurances.db' }),
    insurers: new Datastore({ filename: './src/data/insurers.db' })
};

db.customers.loadDatabase();
db.insurances.loadDatabase();
db.insurers.loadDatabase();

export const DbContext = {

    addCustomer: (carRegNumber:string[] ,firstName: string, secondname: string, thirdname: string, phone: string, city: string): Promise<DataResult> => {
        let customerId = `${+new Date}_customer`
        let customer = new Customer(carRegNumber,customerId, firstName, secondname, thirdname, phone, city);

        return new Promise((resolve) => {
            db.customers.insert(customer, (err, doc) => {
                if (err)
                    console.error(err);
                else
                    resolve(new DataResult(DbResponseType.success, doc));
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

    addInsurance: (customerId: string, insurerId: string, note: string, installments: Installment[]): Promise<DataResult> => {
        let insuranceId = `${+new Date}_insurance`
        let insurance = new Insurance(insuranceId, customerId, insurerId, note, installments);

        return new Promise((resolve) => {
            db.insurances.insert(insurance, (err, doc) => {
                if (err)
                    console.error(err);
                else
                    resolve(new DataResult(DbResponseType.success, doc));
            });
        })
    },

    getInsurances: () => db.insurances.find({}),

    updateInsurance: () => {
        console.error("Not Implemented")
    },

    deleteInsurance: () => {
        console.error("Not Implemented")
    },

    addInsurer: (name: string): Promise<DataResult> => {
        let insurerId = `${+new Date}_insurer`;
        let insurer = new Insurer(insurerId, name);

        return new Promise((resolve) => {
            db.insurers.insert(insurer, (err, doc) => {
                if (err)
                    console.error(err);
                else
                    resolve(new DataResult(DbResponseType.success, doc));
            });
        })
    },

    getInsurers: () => db.insurers.find({}),

    updateInsurer: () => {
        console.error("Not Implemented")
    },

    deleteInsurer: () => {
        console.error("Not Implemented")
    }
}