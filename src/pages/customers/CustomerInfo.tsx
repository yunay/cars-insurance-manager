import * as React from 'react';
import { Customer, CarInfo } from '../../models/customers/Customer';
import { observer } from 'mobx-react'
import { observable, runInAction } from 'mobx';
import { withRouter } from 'react-router';
import { DbContext } from '../../data/DataStore';
import { Insurance } from '../../models/insurances/Insurance';
import { SingleItemInfoPanel, MultipleItemInfoPanel } from '../../common/ui/InfoPanel';
import { BaseComponent } from '../../common/ui/BaseComponent';
import { NavLink } from 'react-router-dom';

@observer class CustomerInfoImpl extends BaseComponent<any>{
    @observable private model: Customer;
    @observable private customerInsurances: Insurance[];

    constructor(props: any) {
        super(props);

        this.onBackBtnClick = this.onBackBtnClick.bind(this);
        this.loadCustomer();
    }

    render() {
        return <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <div className="row">
                        <div className="col-9"><h4 className="m-0 font-weight-bold text-success">Информация за клиент</h4></div>
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
                                    <SingleItemInfoPanel item={`${this.model.firstname} ${this.model.secondname} ${this.model.thirdname}`} title={'Имена на клиента'} icon={"fas fa-user-tie"} />
                                </div>
                                <div className="col-md-4">
                                    <SingleItemInfoPanel item={`${this.model.phone}`} title={'Телефонен номер'} icon={"fas fa-mobile-alt"} />
                                </div>
                                <div className="col-md-4">
                                    <SingleItemInfoPanel item={this.model.statement} title={'Населено място'} icon={"fas fa-city"} />
                                </div>
                            </div>
                            <div className="form-row form-group">
                                <div className="col-4">
                                    {
                                        this.model.carRegistrationInfo && this.model.carRegistrationInfo.length > 0
                                            ? <MultipleItemInfoPanel items={[...this.model.carRegistrationInfo]} displayItem={this.displayCarInfoItem} title={'Информация за превозно средство'} icon={"fas fa-car"} />
                                        : null
                                    }
                                </div>
                                <div className="col-4">
                                    {
                                        this.customerInsurances && this.customerInsurances.length > 0
                                        ? <MultipleItemInfoPanel items={this.prepareCustomerInsurancesDisplay()} title={`Застраховки: ${this.customerInsurances.length} бр.`} icon={"fas fa-car"} />
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

    private onBackBtnClick() {
        this.props.history.goBack();
    }

    private loadCustomer() {
        DbContext.getCustomers({ id: this.props.match.params.customerId }).exec((err, customer: Customer[]) => {
            if (err) {

            } else {
                runInAction.bind(this)(() => {
                    this.model = customer[0];

                    DbContext.getInsurances({ customerId: this.model.id }).exec((err, doc) => {
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
                })
            }
        })
    }

    private prepareCustomerInsurancesDisplay(){
        let result:any[] = [];

        for (let index = 0; index < this.customerInsurances.length; index++) {
            const insurance = this.customerInsurances[index];
            
            result.push(<NavLink to={`/insurance-info/${insurance.id}`} className="text text-primary">{this.displayDate(insurance.createdOn)}</NavLink>)
        }

        return result
    }

    private displayCarInfoItem(carInfoItem: CarInfo) {
        return `Регистрационен №: ${carInfoItem.registrationNumber}, № на талон: ${carInfoItem.registrationForm} `
    }
}

export const CustomerInfo = withRouter(CustomerInfoImpl);