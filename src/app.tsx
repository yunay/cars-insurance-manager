import * as React from 'react';
import { Layout } from './shared/Layout';
import { Route } from 'react-router';
import { Insurances } from './pages/insurances/Insurances';
import { Customers } from './pages/customers/Customers';
import { AddCustomer } from './pages/customers/AddCustomer';
import { Dashboard } from './pages/dashboard/Dashboard'
import { AddInsurance } from './pages/insurances/AddInsurance';
import { AddInsurer } from './pages/insurers/AddInsurer';
import { Insurers } from './pages/insurers/Insurers';

export class App extends React.Component<any, any> {

  render() {
    return (<Layout>
      <Route exact path='/' component={Dashboard} />
      <Route path='/customers' component={Customers} />
      <Route path='/add-customer' component={AddCustomer} />
      <Route exact path='/insurances' component={Insurances} />
      <Route exact path='/add-insurance' component={AddInsurance} />
      <Route exact path='/insurers' component={Insurers} />
      <Route exact path='/add-insurer' component={AddInsurer} />
    </Layout>);
  }
}