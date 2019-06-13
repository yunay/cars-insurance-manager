import * as React from 'react';
import { CountInfoCard, CountInfoCardType } from '../../common/ui/CountInfoCard';
import { BaseComponent } from '../../common/ui/BaseComponent';
import { observer } from 'mobx-react';
import { observable, runInAction } from 'mobx';
import { Customer } from '../../models/customers/Customer';
import { Insurer } from '../../models/insurers/Insurer';
import { Insurance } from '../../models/insurances/insurancesSearchCriteria';
import { DbContext } from '../../data/DataStore';

@observer export class Dashboard extends BaseComponent<any> {

  @observable customers: Customer[];
  @observable insurers: Insurer[];
  @observable insurances: Insurance[];

  componentDidMount() {
    this.initData();
  }

  render() {
    return <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h4 className="m-0 font-weight-bold text-primary">Информативно табло</h4>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-xl-3 col-md-6 mb-4">
            <CountInfoCard text={"Брой клиенти"} type={CountInfoCardType.customer} count={this.customers && this.customers.length > 0 ? this.customers.length : 0} />
          </div>
          <div className="col-xl-3 col-md-6 mb-4">
            <CountInfoCard text={"БРОЙ ЗАСТРАХОВКИ"} type={CountInfoCardType.insurance} count={this.insurers && this.insurers.length > 0 ? this.insurers.length : 0} />
          </div>
          <div className="col-xl-3 col-md-6 mb-4">
            <CountInfoCard text={"БРОЙ ЗАСТРАХОВАТЕЛИ"} type={CountInfoCardType.insurer} count={this.insurances && this.insurances.length > 0 ? this.insurances.length : 0} />
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
}