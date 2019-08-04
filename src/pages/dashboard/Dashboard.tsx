import * as React from 'react';
import { CountInfoCard, CountInfoCardType, CardContentSize } from '../../common/ui/CountInfoCard';
import { BaseComponent } from '../../common/ui/BaseComponent';
import { observer } from 'mobx-react';
import { observable, runInAction } from 'mobx';
import { Customer } from '../../models/customers/Customer';
import { Insurer } from '../../models/insurers/Insurer';
import { Insurance } from '../../models/insurances/Insurance';
import { DbContext } from '../../data/DataStore';
import { ArrayHelpers } from '../../common/helpers/Helpers';
import { InsurancesGraph } from './InsurancesGraph';
import { InsurersPie } from './InsurersPie';

@observer export class Dashboard extends BaseComponent<any> {

    @observable customers: Customer[];
    @observable insurers: Insurer[];
    @observable insurances: Insurance[];
    @observable vehicleCount: number;
    @observable insurancesDates: string[];
    @observable insurancesCountPerDate: number[];

    componentDidMount() {
        this.initData();
    }

    render() {
        return <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h4 className="m-0 font-weight-bold text-success">Информативно табло</h4>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-xl-3 col-md-6 col-sm-6 mb-3">
                        <CountInfoCard text={"БРОЙ ЗАСТРАХОВАТЕЛИ"} type={CountInfoCardType.insurer} count={this.insurers && this.insurers.length > 0 ? this.insurers.length : 0} />
                    </div>
                    <div className="col-xl-3 col-md-6 col-sm-6 mb-3">
                        <CountInfoCard text={"Брой клиенти"} type={CountInfoCardType.customer} count={this.customers && this.customers.length > 0 ? this.customers.length : 0} />
                    </div>
                    <div className="col-xl-3 col-md-6 col-sm-6 mb-3">
                        <CountInfoCard text={"БРОЙ ЗАСТРАХОВКИ"} type={CountInfoCardType.insurance} count={this.insurances && this.insurances.length > 0 ? this.insurances.length : 0} />
                    </div>
                    <div className="col-xl-3 col-md-6 col-sm-6 mb-3">
                        <CountInfoCard text={"БРОЙ ПРЕВОЗНИ СРЕДСТВА"} type={CountInfoCardType.vehicle} count={this.vehicleCount ? this.vehicleCount : 0} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-7">
                        <InsurancesGraph/>
                    </div>
                    <div className="col-5">
                        <div className="form-row">
                            <div className="form-group col-12">
                                <CountInfoCard text={"Брой изтичащи услуги"} type={CountInfoCardType.installment} count={1} cardContentSize={CardContentSize.big} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <InsurersPie />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    initData() {
        this.loadInsurers();
        this.loadInsurances();
        this.loadCustomers();
    }

    loadCustomers() {
        DbContext.getCustomers().exec((err, doc) => {
            if (err) {

            } else {
                var dataArr = Object.keys(doc);
                this.customers = [];
                runInAction.bind(this)(() => {
                    for (let index = 0; index < dataArr.length; index++) {
                        this.customers.push(doc[dataArr[index]]);
                    }

                    this.loadAllVehicle();
                })
            }
        })
    }

    loadInsurers() {
        DbContext.getInsurers().exec((err, doc) => {
            if (err) {

            } else {
                var dataArr = Object.keys(doc);
                this.insurers = [];

                runInAction.bind(this)(() => {
                    for (let index = 0; index < dataArr.length; index++) {
                        this.insurers.push(doc[dataArr[index]]);
                    }
                })
            }
        })
    }

    loadInsurances() {
        DbContext.getInsurances().exec((err, doc) => {
            if (err) {

            } else {
                var dataArr = Object.keys(doc);
                this.insurances = [];

                runInAction.bind(this)(() => {
                    for (let index = 0; index < dataArr.length; index++) {
                        this.insurances.push(doc[dataArr[index]]);
                    }
                })
            }
        })
    }

    loadAllVehicle() {
        if (this.customers && this.customers.length > 0) {
            let vehicle = [];

            for (let i = 0; i < this.customers.length; i++) {
                vehicle.push(...this.customers[i].carRegistrationNumbers);
            }

            this.vehicleCount = ArrayHelpers.distinct(vehicle).length;
        }
    }
}