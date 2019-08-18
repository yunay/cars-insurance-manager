import { observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { BaseComponent } from '../../common/ui/BaseComponent';
import { NotificationPanel, NotificationType } from '../../common/ui/NotificationPanel';
import { DbContext } from '../../data/DataStore';
import { Customer } from '../../models/customers/Customer';
import { Installment, Insurance } from '../../models/insurances/Insurance';

@observer class InstallmentsImpl extends BaseComponent<any> {

    @observable insurances: Insurance[];
    @observable customers: Customer[];
    @observable installments: Installment[];

    componentDidMount() {
        this.loadCustomers();
    }

    render() {
        return <div className="card shadow mb-4">
            <div className="card-header py-3">
                <div className="row">
                    <div className="col-12"><h4 className="m-0 font-weight-bold text-success">Вноски</h4></div>
                </div>
            </div>
            <div className="card-body">
                <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                    <div className="row">
                        <div className="col-sm-12">
                            {
                                this.insurances && this.insurances.length > 0
                                    ? <table className="table table-bordered dataTable" id="dataTable" style={{ width: "100%" }}>
                                        <thead>
                                            <tr role="row">
                                                <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "310px" }}>Клиент</th>
                                                <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "140px" }}>Изтича на</th>
                                                <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "150px" }}>Сума за плащане</th>
                                                <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "110px" }}>Статус</th>
                                                <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "100px" }}>Действия</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.insurances.map((insurance: Insurance) => {
                                                    var currentCustomers = this.customers.filter(x => x.id == insurance.customerId);
                                                    var sortedInstallments = insurance.installments.sort((x, y) => {
                                                
                                                        return (x.isPaid === y.isPaid) ? 0 : x.isPaid ? -1 : 1;
                                                    });

                                                    sortedInstallments = insurance.installments.sort((x, y) => {

                                                        return (y.date === x.date) ? 0 : y.date ? -1 : 1;
                                                    });

                                                    return sortedInstallments.map((installment: Installment) => {
                                                        return  <tr key={installment.id}>
                                                            <td>{currentCustomers && currentCustomers.length > 0 ? `${currentCustomers[0].firstname} ${currentCustomers[0].thirdname} от ${currentCustomers[0].statement}` : null}</td>
                                                            <td>{this.displayDate(installment.date)}</td>
                                                            <td>{this.displayCurrancyValue(installment.value)}</td>
                                                            <td>{installment.isPaid ? "Платена" : "За плащане"}</td>
                                                            <td>
                                                                <div className="d-flex justify-content-around">
                                                                    <NavLink to={`/insurance-info/${insurance.id}`} className="btn btn-primary btn-circle btn-sm">
                                                                        <i className="fas fa-info"></i>
                                                                    </NavLink>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    })
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    : <NotificationPanel notificationType={NotificationType.info} text={"Няма намерени вноски."} isDismisable={false} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
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

                    this.loadInsurances();
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

export const InstallmentsUI = withRouter(InstallmentsImpl);