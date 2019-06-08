import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable, runInAction } from 'mobx';
import { Customer } from '../../models/Customer';
import { DbContext } from '../../data/DataStore';
import { NotificationPanel, NotificationType } from '../../common/ui/NotificationPanel';

@observer export class Customers extends React.Component<any, any> {

    @observable alreadySearched: boolean = false;
    @observable customers: Customer[];

    constructor(props: any) {
        super(props);

        this.customers = [];
    }

    componentDidMount() {
        DbContext.getCustomers().exec((err, doc) => {
            if (err) {

            } else {
                var dataArr = Object.keys(doc);

                runInAction.bind(this)(() => {
                    this.alreadySearched = true;
                    for (let index = 0; index < dataArr.length; index++) {
                        this.customers.push(doc[dataArr[index]]);
                    }
                })
            }
        })
    }

    render() {
        return <div className="card shadow mb-4">
            <div className="card-header py-3">
                <div className="row">
                    <div className="col-4"><h4 className="m-0 font-weight-bold text-primary">Клиенти</h4></div>
                    <div className="col-5"><input type="search" className="form-control" placeholder="Търси..." /></div>
                    <div className="col-3">
                        <NavLink to={'/add-customer'} className="btn btn-success btn-icon-split btn-add-new">
                            <span className="icon text-white-50">
                                <i className="fas fa-plus"></i>
                            </span>
                            <span className="text">Добави</span>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                    <div className="row">
                        <div className="col-sm-12">
                            {
                                this.alreadySearched
                                    ? this.customers && this.customers.length > 0
                                        ? <table className="table table-bordered dataTable" id="dataTable" style={{ width: "100%" }}>
                                            <thead>
                                                <tr role="row">
                                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "200px" }}>Име<i className="fas fa-fw fa-sort-down table-sort-icon"></i></th>
                                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "200px" }}>Презиме<i className="fas fa-fw fa-sort-down table-sort-icon-transform"></i></th>
                                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "200px" }}>Фамилия<i className="fas fa-fw fa-sort-down table-sort-icon-transform"></i></th>
                                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "200px" }}>Град / село<i className="fas fa-fw fa-sort-down table-sort-icon-transform"></i></th>
                                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "200px" }}>Телефон<i className="fas fa-fw fa-sort-down table-sort-icon-transform"></i></th>
                                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "200px" }}>Действия</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.customers.map((customer) => {
                                                        return <tr key={customer.id}>
                                                            <td>{customer.firstname}</td>
                                                            <td>{customer.secondname}</td>
                                                            <td>{customer.thirdname}</td>
                                                            <td>{customer.city}</td>
                                                            <td>{customer.phone}</td>
                                                            <td>
                                                                <div className="d-flex justify-content-around">
                                                                    <a href="javascript:;" className="btn btn-primary btn-circle btn-sm"><i className="fas fa-info"></i></a>
                                                                    <a href="javascript:;" className="btn btn-success btn-circle btn-sm"><i className="fas fa-edit"></i></a>
                                                                    <a href="javascript:;" className="btn btn-danger btn-circle btn-sm"><i className="fas fa-trash"></i></a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        : <NotificationPanel notificationType={NotificationType.info} text={"Няма намерени клиенти"} isDismisable={false} />
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}