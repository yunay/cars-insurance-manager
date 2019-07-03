import { BaseComponent } from '../../common/ui/BaseComponent';
import React = require('react');
import { LineGraph } from '../../common/ui/Graphs';
import { Constants } from '../../common/Constants';
import { observer } from 'mobx-react';
import { observable, runInAction, action } from 'mobx';
import { Insurance } from '../../models/insurances/Insurance';
import { DbContext } from '../../data/DataStore';
import { ArrayHelpers } from '../../common/helpers/Helpers';

@observer export class InsurancesGraph extends BaseComponent<any>{

    @observable insurances: Insurance[]
    @observable years: number[];
    @observable currentYear: number;
    @observable currentYearCountOfInsurancesByMonth: number[];

    constructor(props:any) {
        super(props);

        this.init();
    }

    render() {
        return <div className="row">
            <div className="col-10">
             
            </div>
            <div className="col-2">
                <select className="form-control">
                    {
                        this.years && this.years.length > 0
                            ? this.years.map(year => {
                                return <option key={year}>{year}</option>
                            })
                            :null
                    }
                </select>
            </div>
            {
                this.currentYearCountOfInsurancesByMonth
                    ? <LineGraph data={[8, 2, 2, 1, 1, 3, 4, 8]} label="Брой застраховки" labels={Constants.monthsBG} datasetColor="red" />
                    : null
            }
        </div>
    }

    @action init() {
        this.currentYear = new Date().getFullYear();
        this.loadInsurances();
    }

    @action loadInsurances() {
        DbContext.getInsurances().exec((err, doc) => {
            if (err) {

            } else {
                var dataArr = Object.keys(doc);
                this.insurances = [];
                this.years = [];
                this.currentYearCountOfInsurancesByMonth = [];

                runInAction.bind(this)(() => {
                    for (let index = 0; index < dataArr.length; index++) {
                        this.insurances.push(doc[dataArr[index]]);
                    }

                    for (var i = 0; i < this.insurances.length; i++) {
                        let currentItem = this.insurances[i];

                        this.years.push(currentItem.createdOn.getFullYear())
                    }

                    this.years = ArrayHelpers.distinct(this.years).sort((a,b)=>a-b);
                    this.prepareCountOfInsurancesByMonthForCurrentYear();
                })
            }
        })
    }

    @action prepareCountOfInsurancesByMonthForCurrentYear() {
        for (var i = 1; i <= 12; i++) {
            this.currentYearCountOfInsurancesByMonth.push(this.insurances.filter(x => x.createdOn.getFullYear() == this.currentYear && x.createdOn.getMonth() == i).length)
        }
    }
}