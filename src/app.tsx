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

export class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    moment.locale('bg');
  }

  render() {
    return (<Layout>
      <Route exact path='/' component={Dashboard} />
      <Route path='/customers' component={Customers} />
      <Route path='/add-customer' component={AddCustomer} />
      <Route exact path='/insurances' component={Insurances} />
      <Route exact path='/add-insurance' component={AddInsurance} />
      <Route exact path='/insurers' component={Insurers} />
      <Route exact path='/add-insurer' component={AddInsurer} />
      <Route exact path='/update-insurer/:insurerId' component={UpdateInsurer} />
      <Route exact path='/update-customer/:customerId' component={UpdateCustomer} />
      <Route exact path='/customer-info/:customerId' component={CustomerInfo} />
    </Layout>);
  }
}