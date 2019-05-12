import * as React from 'react';
import { DbContext } from '../../data/DataStore'
import { Customer } from '../../models/Customer';

export const AddInsurance = () => {
    const [customer, setValues] = React.useState(new Customer())

    return <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Добавяне на нова застраховка</h6>
        </div>
        <div className="card-body">
            <div className="row">
                <div className="col">
                    <div className="form-row">
                        <div className="col-md-2">
                            <label>Име</label>
                            <input type="text" className="form-control" name="firstname" value={customer.firstname} onChange={updateField} />
                        </div>
                        <div className="col-md-2">
                            <label>Презиме</label>
                            <input type="text" className="form-control" name="secondname" value={customer.secondname} onChange={updateField} />
                        </div>
                        <div className="col-md-2">
                            <label>Фамилия</label>
                            <input type="text" className="form-control" name="thirdname" value={customer.thirdname} onChange={updateField} />
                        </div>
                        <div className="col-md-3">
                            <label>Град / Село</label>
                            <input type="text" className="form-control" name="city" value={customer.city} onChange={updateField} />
                        </div>
                        <div className="col-md-3">
                            <label>Телефонен номер</label>
                            <input type="text" className="form-control" name="phone" value={customer.phone} onChange={updateField} />
                        </div>
                    </div>
                    <br />
                    <a href="javascript://" className="btn btn-success btn-block"><i className="fas fa-fw fa-plus"></i> Добави</a>
                </div>
            </div>
        </div>
    </div>

    function updateField(e: any) {
        setValues({
            ...customer,
            [e.target.name]: e.target.value
        });
    }

    function addCustomer() {
        DbContext.addCustomer("13", customer.firstname, customer.secondname, customer.thirdname, customer.phone, customer.city);
    }
}