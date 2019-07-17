import * as React from 'react';
import { observer } from 'mobx-react'
import { observable, runInAction } from 'mobx';
import { withRouter } from 'react-router';
import { DbContext } from '../../data/DataStore';
import { Insurance } from '../../models/insurances/Insurance';
import { BaseComponent } from '../../common/ui/BaseComponent';
import { Customer } from '../../models/customers/Customer';
import { SingleItemInfoPanel, MultipleItemInfoPanel } from '../../common/ui/InfoPanel';
import { NavLink } from 'react-router-dom';

@observer class InsuranceInfoImpl extends BaseComponent<any>{
    @observable private model: Insurance;
    @observable private customer: Customer;

    constructor(props: any) {
        super(props);

        this.onBackBtnClick = this.onBackBtnClick.bind(this);
        this.loadInsurance();
    }

    render() {
        return <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <div className="row">
                        <div className="col-9"><h4 className="m-0 font-weight-bold text-success">Информация за застраховка</h4></div>
                        <div className="col-3">
                            <a href="javascript:;" className="btn btn-outline-primary btn-back" onClick={this.onBackBtnClick}><i className="fas fa-arrow-left"></i></a>
                        </div>
                    </div>
                </div>
                {
                    this.model && this.customer
                        ? <div className="card-body">
                            <div className="form-row form-group">
                                <div className="col-4">
                                    <SingleItemInfoPanel item={<NavLink to={`/insurance-info/${this.customer.id}`} className="text text-primary">{`${this.customer.firstname} ${this.customer.secondname} ${this.customer.thirdname}`}</NavLink>} title={'Имена на клиента'} icon={"fas fa-user-tie"} />
                                </div>
                                <div className="col-2">
                                    <SingleItemInfoPanel item={`${this.displayDate(this.model.createdOn)}`} title={'Дата на създаване'} icon={"fas fa-calendar-alt"} />
                                </div>
                                <div className="col-2">
                                    <SingleItemInfoPanel item={`${this.customer.phone}`} title={'Телефон'} icon={"fas fa-mobile-alt"} />
                                </div>
                                <div className="col-2">
                                    <SingleItemInfoPanel item={`${this.model.carRegNumber}`} title={'Регистрационен №'} icon={"fas fa-car"} />
                                </div>
                                <div className="col-2">
                                    <SingleItemInfoPanel item={`${this.customer.statement}`} title={'Населено място'} icon={"fas fa-city"} />
                                </div>
                            </div>
                            <div className="form-row form-group">
                                <div className="col-4">
                                    <MultipleItemInfoPanel items={this.prepareInstallmentsDisplay()} title={'Вноски'} icon={"far fa-clock"} />
                                </div>
                                <div className="col-8">
                                    {
                                        this.model.note && this.model.note.trim() != ""
                                            ? <SingleItemInfoPanel item={`${this.model.note}`} title={'Бележка'} icon={"far fa-sticky-note"} />
                                            : null
                                    }
                                </div>
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

    prepareInstallmentsDisplay(): any[] {
        let installmentsResult: string[] = []

        for (let index = 0; index < this.model.installments.length; index++) {
            const installment = this.model.installments[index];

            installmentsResult.push(`${this.displayDate(installment.date)} ${installment.value} лв.`)
        }

        return installmentsResult;
    }

    loadInsurance() {
        DbContext.getInsurances({ id: this.props.match.params.insuranceId }).exec((err, insurances: Insurance[]) => {
            if (err) {

            } else {
                runInAction.bind(this)(() => {
                    this.model = insurances[0];

                    DbContext.getCustomers({ id: insurances[0].customerId }).exec((err, customers: Customer[]) => {
                        if (err) {

                        } else {
                            runInAction.bind(this)(() => {
                                this.customer = customers[0]
                            })
                        }
                    })
                })
            }
        })
    }
}

export const InsuranceInfo = withRouter(InsuranceInfoImpl);