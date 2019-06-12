import * as Datastore from 'nedb';
import { Customer } from '../models/customers/Customer'
import { Insurance } from '../models/insurances/Insurance';
import { Insurer } from '../models/insurers/Insurer';
import { Statement, StatementType } from '../models/common/Statement';

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
    insurers: new Datastore({ filename: './src/data/insurers.db' }),
    statements: new Datastore({ filename: './src/data/statements.db' })
};

db.customers.loadDatabase();
db.insurances.loadDatabase();
db.insurers.loadDatabase();
db.statements.loadDatabase();

export const DbContext = {

    addCustomer: (customer: Customer): Promise<DataResult> => {
        customer.id = `${+new Date}_customer`

        return new Promise((resolve) => {
            db.customers.insert(customer, (err, doc) => {
                if (err)
                    console.error(err);
                else
                    resolve(new DataResult(DbResponseType.success, doc));
            });
        })
    },

    getCustomers: (query?: any) => query ? db.customers.find(query) : db.customers.find({}),

    updateCustomer: (customerId: string, customer: Customer): Promise<DataResult> => {

        return new Promise((resolve) => {
            db.customers.update({ id: customerId }, customer, { multi: true }, (err, doc) => {
                if (err)
                    console.error(err);
                else
                    resolve(new DataResult(DbResponseType.success, null));
            })
        })
    },

    removeCustomerById: (customerId: string) => {
        db.customers.remove({ id: customerId })
    },

    addInsurance: (insurance: Insurance): Promise<DataResult> => {
        insurance.id = `${+new Date}_insurance`

        return new Promise((resolve) => {
            db.insurances.insert(insurance, (err, doc) => {
                if (err)
                    console.error(err);
                else
                    resolve(new DataResult(DbResponseType.success, doc));
            });
        })
    },

    getInsurances: (query?: any) => query ? db.insurances.find(query) : db.insurances.find({}),

    updateInsurance: () => {
        console.error("Not Implemented")
    },

    removeInsuranceById: (insuranceId: string) => {
        db.insurances.remove({ id: insuranceId })
    },

    addInsurer: (insurer: Insurer): Promise<DataResult> => {
        insurer.id = `${+new Date}_insurer`;

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

    getInsurerById: (insurerId: string) => db.insurers.find({ id: insurerId }),

    updateInsurer: (insurerId: string, insurer: Insurer): Promise<DataResult> => {

        return new Promise((resolve) => {
            db.insurers.update({ id: insurerId }, insurer, { multi: true }, (err, doc) => {
                if (err)
                    console.error(err);
                else
                    resolve(new DataResult(DbResponseType.success, null));
            })
        })
    },

    removeInsurerById: (insurerId: string) => {
        db.insurers.remove({ id: insurerId })
    },

    getStatements: (query?: any) => query ? db.statements.find(query) : db.statements.find({}),

    addStatement: (statement: Statement): Promise<DataResult> => {
        statement.id = `${+new Date}_statement`;
        statement.statementWithType = `${statement.statementType == StatementType.city ? 'г.' : 'с.'} ${statement.name}`

        return new Promise((resolve) => {
            db.statements.insert(statement, (err, doc) => {
                if (err)
                    console.error(err);
                else
                    resolve(new DataResult(DbResponseType.success, doc));
            });
        })
    },

    removeStatementById: (statementId: string) => {
        db.statements.remove({ id: statementId })
    },
}