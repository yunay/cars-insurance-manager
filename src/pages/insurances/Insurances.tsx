import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseComponent } from '../../common/ui/BaseComponent';
import { observable, runInAction, action } from 'mobx';
import { Insurance } from '../../models/insurances/Insurance';
import { DbContext } from '../../data/DataStore';
import { Constants } from '../../common/Constants';
import { confirmAlert } from 'react-confirm-alert';
import { NavLink } from 'react-router-dom';
import { PageNavigation } from '../../common/ui/PageNavigation';
import { NotificationPanel, NotificationType } from '../../common/ui/NotificationPanel';
import { Customer } from '../../models/customers/Customer';

@observer export class Insurances extends BaseComponent<any> {

    @observable alreadySearched: boolean = false;
    @observable insurances: Insurance[];
    @observable currentPage: number = 1;
    @observable keyWordInsurance: string = ""
    @observable totalItemsCount: number = 0;
    @observable customers: Customer[];

    constructor(props: any) {
        super(props);

        this.onSearchByString = this.onSearchByString.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        this.getInsurancesCount();
        this.loadInsurances();
        this.loadCustomers();
    }

    render() {
        return <div className="card shadow mb-4">
            <div className="card-header py-3">
                <div className="row">
                    <div className="col-4"><h4 className="m-0 font-weight-bold text-success">Застраховки</h4></div>
                    <div className="col-5">
                        <input type="search" className="form-control" placeholder="Търси..." onChange={this.onSearchByString} /></div>
                    <div className="col-3">
                        <NavLink to={'/add-insurance'} className="btn btn-success btn-icon-split btn-add-new">
                            <span className="icon text-white-50">
                                <i className="fas fa-plus"></i>
                            </span>
                            <span className="text">Добави</span>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="card-body">
                {
                    Math.ceil(this.totalItemsCount / Constants.itemsPerPage) > 1
                        ? <PageNavigation onPageChange={this.handlePageChange} currentPage={this.currentPage} totalItemsCount={this.totalItemsCount} itemsPerPage={Constants.itemsPerPage} />
                        : null
                }
                <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                    <div className="row">
                        <div className="col-sm-12">
                            {
                                this.alreadySearched
                                    ? this.insurances && this.insurances.length > 0 && this.customers && this.customers.length > 0
                                        ? <table className="table table-bordered dataTable" id="dataTable" style={{ width: "100%" }}>
                                            <thead>
                                                <tr role="row">
                                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "210px" }}>Клиент</th>
                                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "140px" }}>Регистрационен №</th>
                                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "150px" }}>Дата на създаване</th>
                                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "110px" }}>Брой вноски</th>
                                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "160px" }}>Действия</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.insurances.map((insurance) => {
                                                        return <tr key={insurance.id}>
                                                            <td>{this.renderCustomerInfo(insurance.customerId)}</td>
                                                            <td>{insurance.carRegNumber}</td>
                                                            <td>{this.displayDateFor(insurance.createdOn)}</td>
                                                            <td>{insurance.installments.length}</td>
                                                            <td>
                                                                <div className="d-flex justify-content-around">
                                                                    <NavLink to={`/insurance-info/${insurance.id}`} className="btn btn-primary btn-circle btn-sm">
                                                                        <i className="fas fa-info"></i>
                                                                    </NavLink>
                                                                    <NavLink to={`/update-insurance/${insurance.id}`} className="btn btn-success btn-circle btn-sm">
                                                                        <i className="fas fa-edit"></i>
                                                                    </NavLink>
                                                                    <a href="javascript:;" className="btn btn-danger btn-circle btn-sm" onClick={this.removeInsurance.bind(this, insurance.id)}><i className="fas fa-trash"></i></a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        : <NotificationPanel notificationType={NotificationType.info} text={"Няма намерени застраховки."} isDismisable={false} />
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    removeInsurance(insuranceId: string) {

        confirmAlert({
            message: 'Сигурен ли сте, че искате да изтриете записа?',
            buttons: [
                {
                    label: 'Да',
                    onClick: () => {
                        DbContext.removeInsuranceById(insuranceId);
                        this.loadInsurances();
                    }
                },
                {
                    label: 'Не',
                    onClick: () => { }
                }
            ]
        });
    }

    loadInsurances(query?: any) {
        DbContext.getInsurances(query).sort({ firstname: 1 }).skip((this.currentPage - 1) * Constants.itemsPerPage).limit(Constants.itemsPerPage).exec((err, doc) => {
            if (err) {

            } else {
                var dataArr = Object.keys(doc);
                this.insurances = [];

                runInAction.bind(this)(() => {
                    this.alreadySearched = true;
                    for (let index = 0; index < dataArr.length; index++) {
                        this.insurances.push(doc[dataArr[index]]);
                    }
                })
            }
        })
    }

    loadCustomers(query?: any) {
        DbContext.getCustomers(query).sort({ firstname: 1 }).skip((this.currentPage - 1) * Constants.itemsPerPage).limit(Constants.itemsPerPage).exec((err, doc) => {
            if (err) {

            } else {
                var dataArr = Object.keys(doc);
                this.customers = [];
                runInAction.bind(this)(() => {
                    this.alreadySearched = true;
                    for (let index = 0; index < dataArr.length; index++) {
                        this.customers.push(doc[dataArr[index]]);
                    }
                })
            }
        })
    }

    getInsurancesCount(query?: any) {
        DbContext.getInsurancesPagesCount(query).exec((err, count) => {
            runInAction.bind(this)(() => {
                this.totalItemsCount = count;
            })
        })
    }

    handlePageChange(newPage: number) {
        this.currentPage = newPage;
        this.loadInsurances();
    }

    @action onSearchByString(e: any) {
        let regex = new RegExp(e.target.value, "i");
        this.keyWordInsurance = e.target.value;
        this.currentPage = 1;

        let searchedCustomers = this.customers.filter(x=> regex.test(x.firstname) || regex.test(x.secondname) || regex.test(x.thirdname) || regex.test(x.statement)).map(x => { return {customerId:x.id}})
        console.log(searchedCustomers)
        this.loadInsurances({ $or: [{ carRegNumber: regex }, ...searchedCustomers] })
        this.getInsurancesCount({ $or: [{ carRegNumber: regex }, ...searchedCustomers] })
    }

    getCustomerNameById(customerId: string) {
        let customerName = "";

        DbContext.getCustomers({ id: customerId }).exec((err: any, customer: Customer[]) => {
            customerName = customer[0].firstname
        })

        return customerName;
    }

    renderCustomerInfo(customerId: string) {

        if (this.customers.filter(x => x.id == customerId).length > 0) {
            let currentCustomer = this.customers.filter(x => x.id == customerId)[0];

            return `${currentCustomer.firstname} ${currentCustomer.secondname} ${currentCustomer.thirdname} от ${currentCustomer.statement}`
        }

        return "";
    }
}