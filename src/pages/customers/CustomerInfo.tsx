import * as React from 'react';
import { Customer } from '../../models/customers/Customer';
import { observer } from 'mobx-react'
import { observable, runInAction } from 'mobx';
import { withRouter } from 'react-router';
import { DbContext } from '../../data/DataStore';
import { Insurance } from '../../models/insurances/Insurance';
import { SingleItemInfoPanel, MultipleItemInfoPanel } from '../../common/ui/InfoPanel';

@observer class CustomerInfoImpl extends React.Component<any, any>{
    @observable private model: Customer;
    @observable private customerInsurances: Insurance[];

    constructor(props: any) {
        super(props);

        this.onBackBtnClick = this.onBackBtnClick.bind(this);
        this.loadCustomer();
        this.loadCustomerInsurances();
    }

    render() {
        return <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <div className="row">
                        <div className="col-9"><h4 className="m-0 font-weight-bold text-primary">Информация за клиент</h4></div>
                        <div className="col-3">
                            <a href="javascript:;" className="btn btn-outline-primary btn-back" onClick={this.onBackBtnClick}><i className="fas fa-arrow-left"></i></a>
                        </div>
                    </div>
                </div>
                {
                    this.model
                        ? <div className="card-body">
                            <div className="form-row form-group">
                                <div className="col-md-4">
                                    <SingleItemInfoPanel text={`${this.model.firstname} ${this.model.secondname} ${this.model.thirdname}`} title={'Имена на клиента'} icon={"fas fa-user-tie"} />
                                </div>
                                <div className="col-md-4">
                                    <SingleItemInfoPanel text={`${this.model.phone}`} title={'Телефонен номер'} icon={"fas fa-mobile-alt"} />
                                </div>
                                <div className="col-md-4">
                                    <SingleItemInfoPanel text={this.model.statement} title={'Населено място'} icon={"fas fa-city"} />
                                </div>
                            </div>
                            <div className="form-row form-group">
                                <div className="col-4">
                                    {
                                        this.model.carRegistrationNumbers && this.model.carRegistrationNumbers.length > 0
                                        ? <MultipleItemInfoPanel texts={[...this.model.carRegistrationNumbers]} title={'Регистрационнни номера'} icon={"fas fa-car"} />
                                        : null
                                    }
                                </div>
                                <div className="col-4">
                                    {
                                        this.model.carRegistrationNumbers && this.model.carRegistrationNumbers.length > 0
                                        ? <MultipleItemInfoPanel texts={[...this.model.carRegistrationNumbers]} title={'Застраховки ТОДО'} icon={"fas fa-car"} />
                                        : null
                                    }
                                </div>
                                <div className="col-4"></div>
                            </div>
                        </div>
                        : null
                }
            </div>
        </>
    }

    onBackBtnClick() {
        this.props.history.goBack();
    }

    loadCustomer() {
        DbContext.getCustomers({ id: this.props.match.params.customerId }).exec((err, customer: Customer[]) => {
            if (err) {

            } else {
                runInAction.bind(this)(() => {
                    this.model = customer[0];
                })
            }
        })
    }

    loadCustomerInsurances() {
        DbContext.getInsurances({ customerId: this.props.match.params.customerId }).exec((err, doc) => {
            if (err) {

            } else {
                var dataArr = Object.keys(doc);
                this.customerInsurances = [];

                runInAction.bind(this)(() => {
                    for (let index = 0; index < dataArr.length; index++) {
                        this.customerInsurances.push(doc[dataArr[index]]);
                    }
                })
            }
        })
    }
}

export const CustomerInfo = withRouter(CustomerInfoImpl);