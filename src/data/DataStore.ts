import * as Datastore from 'nedb';
import { Settings } from '../models/common/Settings';
import { Statement, StatementType } from '../models/common/Statement';
import { Customer } from '../models/customers/Customer';
import { Insurance } from '../models/insurances/Insurance';
import { Insurer } from '../models/insurers/Insurer';

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
    statements: new Datastore({ filename: './src/data/statements.db' }),
    settings: new Datastore({ filename: './src/data/settings.db' })
};

db.customers.loadDatabase();
db.insurances.loadDatabase();
db.insurers.loadDatabase();
db.statements.loadDatabase();
db.settings.loadDatabase();

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

    getCustomersPagesCount: (query?: any) => query ? db.customers.count(query) : db.customers.count({}),

    updateCustomer: (customer: Customer): Promise<DataResult> => {

        return new Promise((resolve) => {
            db.customers.update({ id: customer.id }, customer, { multi: true }, (err) => {
                if (err)
                    console.error(err);
                else
                    resolve(new DataResult(DbResponseType.success, null));
            })
        })
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

    getInsurancesPagesCount: (query?: any) => query ? db.insurances.count(query) : db.insurances.count({}),

    updateInsurance: (insurance: Insurance): Promise<DataResult> => {

        return new Promise((resolve) => {
            db.insurances.update({ id: insurance.id }, insurance, { multi: true }, (err) => {
                if (err)
                    console.error(err);
                else
                    resolve(new DataResult(DbResponseType.success, null));
            })
        })
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

    getInsurers: (query?: any) => query ? db.insurers.find(query) : db.insurers.find({}),

    getInsurersPagesCount:(query?: any) => query ? db.insurers.count(query) : db.insurers.count({}),

    getInsurerById: (insurerId: string) => db.insurers.find({ id: insurerId }),

    updateInsurer: (insurer: Insurer): Promise<DataResult> => {

        return new Promise((resolve) => {
            db.insurers.update({ id: insurer.id }, insurer, { multi: true }, (err) => {
                if (err)
                    console.error(err);
                else
                    resolve(new DataResult(DbResponseType.success, null));
            })
        })
    },

    getStatements: (query?: any) => query ? db.statements.find(query) : db.statements.find({}),

    getStatementsPagesCount: (query?: any) => query ? db.statements.count(query) : db.statements.count({}),

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

    updateStatement: (statement: Statement): Promise<DataResult> => {

        return new Promise((resolve) => {
            db.statements.update({ id: statement.id }, statement, { multi: true }, (err) => {
                if (err)
                    console.error(err);
                else
                    resolve(new DataResult(DbResponseType.success, null));
            })
        })
    },

    getSettings: (query?: any) => query ? db.settings.find(query) : db.settings.find({}),

    addSettings: (settings: Settings): Promise<DataResult> => {

        return new Promise((resolve) => {
            db.settings.insert(settings, (err, doc) => {
                if (err)
                    console.error(err);
                else
                    resolve(new DataResult(DbResponseType.success, doc));
            });
        })
    },

    updateSettings: (query:any, updateQuery:any): Promise<DataResult> => {

        return new Promise((resolve) => {
            db.settings.update(query, updateQuery, { upsert: true }, (err) => {
                if (err)
                    console.error(err);
                else
                    resolve(new DataResult(DbResponseType.success, null));
            })
        })
    },
}