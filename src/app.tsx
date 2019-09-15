import * as React from 'react';
import { Layout } from './shared/Layout';
import { Route } from 'react-router';
import { Insurances } from './pages/insurances/Insurances';
import { Customers } from './pages/customers/Customers';
import { AddCustomer } from './pages/customers/AddCustomer';
import { Dashboard } from './pages/dashboard/Dashboard'
import { AddInsurance } from './pages/insurances/AddInsurance';
import { AddInsurer } from './pages/insurers/AddInsurer';
import { UpdateInsurer } from './pages/insurers/UpdateInsurer';
import { Insurers } from './pages/insurers/Insurers';
import { UpdateCustomer } from './pages/customers/UpdateCustomer';
import { CustomerInfo } from './pages/customers/CustomerInfo';
import * as moment from 'moment';
import { Statements } from './pages/settings/statements/Statements';
import { InsuranceInfo } from './pages/insurances/InsuranceInfo';
import { UpdateInsurance } from './pages/insurances/UpdateInsurance';
import { CommonSettings } from './pages/settings/common/Settings';
import { DbContext } from './data/DataStore';
import { Settings } from './models/common/Settings';
import { observer } from 'mobx-react';
import { observable, action, runInAction } from 'mobx';
import { InstallmentsUI } from './pages/insurances/Installments';
import { notify } from 'node-notifier'
import { Insurance, Installment } from './models/insurances/Insurance';

const path = require('path')

@observer export class App extends React.Component<any, any> {

    @observable resourcesLoaded: boolean = false;

    private notificationInterval: NodeJS.Timer;

    constructor(props: any) {
        super(props);

        this.initConfigs();
    }

    componentWillUnmount() {
        clearInterval(this.notificationInterval);
    }

    render() {

        if (this.resourcesLoaded) {
            return (<Layout>
                <Route exact path='/' component={Dashboard} />
                <Route path='/customers' component={Customers} />
                <Route path='/add-customer' component={AddCustomer} />
                <Route exact path='/insurances' component={Insurances} />
                <Route exact path='/add-insurance' component={AddInsurance} />
                <Route exact path='/insurance-info/:insuranceId' component={InsuranceInfo} />
                <Route exact path='/update-insurance/:insuranceId' component={UpdateInsurance} />
                <Route exact path='/insurers' component={Insurers} />
                <Route exact path='/add-insurer' component={AddInsurer} />
                <Route exact path='/update-insurer/:insurerId' component={UpdateInsurer} />
                <Route exact path='/update-customer/:customerId' component={UpdateCustomer} />
                <Route exact path='/customer-info/:customerId' component={CustomerInfo} />
                <Route exact path='/statements' component={Statements} />
                <Route exact path='/common-settings' component={CommonSettings} />
                <Route exact path='/installments/:allOrOnlyExpiring' component={InstallmentsUI} />
            </Layout>);
        }

        return null;
    }

    initConfigs() {
        moment.locale('bg');
        this.initSettings();
    }

    initSettings() {

        DbContext.getSettings().exec((err: any, doc: Settings[]) => {
            if (err || doc.length == 0) {
                let initialSettings = new Settings();
                initialSettings.daysBeforeInstallmentExpire = 7;
                initialSettings.notificationIntervalInHours = 1;

                DbContext.addSettings(initialSettings).then(() => {
                    this.resourcesLoaded = true;
                    this.prepareInsuranceNotifications(initialSettings.notificationIntervalInHours, initialSettings.daysBeforeInstallmentExpire);
                }).catch((err) => {
                    console.log(err);
                    this.resourcesLoaded = true;
                    this.prepareInsuranceNotifications(initialSettings.notificationIntervalInHours, initialSettings.daysBeforeInstallmentExpire);
                });

            } else {
                this.resourcesLoaded = true;
                this.prepareInsuranceNotifications(doc[0].notificationIntervalInHours, doc[0].daysBeforeInstallmentExpire);
            }
        })
    }

    setNotificationsOnInterval(notificationIntervalInHours: number, expiringInstallmentsCount: number) {

        if (expiringInstallmentsCount >= 1) {

            let notification = {
                title: "Изтичащи застрахователни вноски.",
                icon: path.join(__dirname, 'notify-icon.png'),
                message: `Имате ${expiringInstallmentsCount} ${expiringInstallmentsCount > 1 ? 'изтичащи застрахователни вноски за плащане.' : 'изтичаща застрахователна вноска за плащане.'} `,
                sound: true,
            }

            setTimeout(() => {
                notify(notification);
            }, 100)

            this.notificationInterval = setInterval(() => {
                notify(notification);
            }, 1000 * 60 * notificationIntervalInHours)
        }
    }

    @action prepareInsuranceNotifications(notificationIntervalInHours: number, daysBeforeInstallmentExpire: number) {
        DbContext.getInsurances().exec((err, doc) => {
            if (err) {
                console.log(err);
            } else {
                var dataArr = Object.keys(doc);
                var insurances: Insurance[] = [];
                var expiringInstallmentsCount = 0;

                runInAction.bind(this)(() => {
                    for (let index = 0; index < dataArr.length; index++) {
                        var currentInsurance: Insurance = doc[dataArr[index]];

                        insurances.push(currentInsurance);
                        expiringInstallmentsCount += currentInsurance.installments.filter((installment: Installment) => {
                            return installment.date <= moment().endOf("day").add(-daysBeforeInstallmentExpire, "days").toDate();
                        }).length;
                    }

                    this.setNotificationsOnInterval(notificationIntervalInHours, expiringInstallmentsCount)
                })
            }
        })
    }
}