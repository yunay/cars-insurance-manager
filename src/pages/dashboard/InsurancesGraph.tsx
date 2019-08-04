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

    insurances: Insurance[]
    @observable years: number[];
    @observable selectedYear: number;

    private currentYearCountOfInsurancesByMonth: number[];

    constructor(props: any) {
        super(props);

        this.handleSelectedYearChange = this.handleSelectedYearChange.bind(this);

        this.init();
        this.currentYearCountOfInsurancesByMonth = [];
    }

    render() {

        return <div className="row">
            <div className="col-9">

            </div>
            <div className="col-3">
                <select className="form-control" onChange={this.handleSelectedYearChange} value={this.selectedYear}>
                    {
                        this.years && this.years.length > 0
                            ? this.years.map((year) => {
                                return <option value={year} key={year}>{year}</option>
                            })
                            : null
                    }
                </select>
            </div>
            <LineGraph data={this.currentYearCountOfInsurancesByMonth} label="Брой застраховки" labels={Constants.monthsBG} datasetColor="red" />
        </div>
    }

    @action handleSelectedYearChange(e: any) {
        this.selectedYear = e.target.value;
        this.prepareCountOfInsurancesByMonthForCurrentYear();
    }

    @action init() {
        this.selectedYear = new Date().getFullYear();
        this.loadInsurances();
    }


    @action loadInsurances() {
        DbContext.getInsurances().exec((err, doc) => {
            if (err) {

            } else {
                var dataArr = Object.keys(doc);
                this.insurances = [];
                this.years = [];
                
                runInAction.bind(this)(() => {
                    for (let index = 0; index < dataArr.length; index++) {
                        this.insurances.push(doc[dataArr[index]]);
                    }

                    for (var i = 0; i < this.insurances.length; i++) {
                        let currentItem = this.insurances[i];

                        this.years.push(currentItem.createdOn.getFullYear())
                    }

                    this.years = ArrayHelpers.distinct(this.years).sort((a, b) => a - b);
                    this.prepareCountOfInsurancesByMonthForCurrentYear();
                })
            }
        })
    }

    prepareCountOfInsurancesByMonthForCurrentYear() {
        this.currentYearCountOfInsurancesByMonth = [];

        for (var i = 1; i <= 12; i++) {
            this.currentYearCountOfInsurancesByMonth.push(this.insurances.filter(x => x.createdOn.getFullYear() == this.selectedYear && x.createdOn.getMonth() == i).length)
        }
    }
}