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
import { observable } from 'mobx';
import { InstallmentsUI } from './pages/insurances/Installments';
import { notify } from 'node-notifier'

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

        DbContext.getSettings().exec((err:any, doc:Settings[]) => {
            if (err || doc.length == 0) {
                let initialSettings = new Settings();
                initialSettings.daysBeforeInstallmentExpire = 7;
                initialSettings.notificationIntervalInHours = 1;

                DbContext.addSettings(initialSettings).then(() => {
                    this.resourcesLoaded = true;
                    this.setNotificationsOnInterval(initialSettings.notificationIntervalInHours);
                }).catch((err) => {
                    console.log(err);
                    this.resourcesLoaded = true;
                    this.setNotificationsOnInterval(initialSettings.notificationIntervalInHours);
                });

            } else {
                this.resourcesLoaded = true;
                this.setNotificationsOnInterval(doc[0].notificationIntervalInHours);
            }
        })
    }

    setNotificationsOnInterval(notificationIntervalInHours:number) {
        console.log(this);

        this.notificationInterval = setInterval(() => {
            notify({
                title: "Title",
                icon: path.join(__dirname, 'notify-icon.png'),
                message: 'test',
                sound: true,
            });
        }, 1000 * 60 * notificationIntervalInHours)
    }
}