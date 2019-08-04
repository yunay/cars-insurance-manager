import { action, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { BaseComponent } from '../../common/ui/BaseComponent';
import { PieGraph } from '../../common/ui/Graphs';
import { DbContext } from '../../data/DataStore';
import { Insurance } from '../../models/insurances/Insurance';
import { Insurer } from '../../models/insurers/Insurer';
import React = require('react');

@observer export class InsurersPie extends BaseComponent<any>{
    
    private insurers: Insurer[];
    private insurances: Insurance[];
    private numberOfInsurancesByInsurer: number[];
    private labels: string[];

    @observable dataInitialized: boolean = false;

    constructor(props: any) {
        super(props);

        this.init();
        this.numberOfInsurancesByInsurer = [];
        this.labels = [];
    }

    render() {
        if (this.dataInitialized) {
            return <PieGraph data={this.numberOfInsurancesByInsurer} label="Брой застраховки на застраховател" labels={this.labels} datasetColor="red" />
        }

        return null;
    }

    @action async init() {
        this.loadInsurers().then(() => {

            this.loadInsurances().then(() => {
                this.prepareCountOfInsurancesByInsurer();
            })
        });
    }

    @action loadInsurances(): Promise<void> {

        return new Promise((resolve) => {
            DbContext.getInsurances().exec((err, doc) => {
                if (err) {

                } else {
                    var dataArr = Object.keys(doc);
                    this.insurances = [];

                    runInAction.bind(this)(() => {
                        for (let index = 0; index < dataArr.length; index++) {
                            this.insurances.push(doc[dataArr[index]]);
                        }

                        resolve();
                    })
                }
            })
        })
    }

    @action loadInsurers(): Promise<void> {

        return new Promise((resolve) => {
            DbContext.getInsurers().exec((err, doc) => {
                if (err) {

                } else {
                    var dataArr = Object.keys(doc);
                    this.insurers = [];

                    runInAction.bind(this)(() => {
                        for (let index = 0; index < dataArr.length; index++) {
                            this.insurers.push(doc[dataArr[index]]);
                        }

                        resolve();
                    })
                }
            })
        })
    }

    prepareCountOfInsurancesByInsurer() {
        this.numberOfInsurancesByInsurer = [];
        this.labels = [];

        for (var i = 0; i < this.insurers.length; i++) {
            this.labels.push(this.insurers[i].name);
            this.numberOfInsurancesByInsurer.push(this.insurances.filter(x => x.insurerId == this.insurers[i].id).length);
        }

        this.dataInitialized = true;
    }
}