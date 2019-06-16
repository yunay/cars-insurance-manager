import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable, runInAction, action } from 'mobx';
import { DbContext } from '../../data/DataStore';
import { Insurer } from '../../models/insurers/Insurer';
import { NotificationPanel, NotificationType } from '../../common/ui/NotificationPanel';
import { confirmAlert } from 'react-confirm-alert';
import { PageNavigation } from '../../common/ui/PageNavigation';
import { Constants } from '../../common/Constants';

@observer export class Insurers extends React.Component<any, any> {

    @observable alreadySearched: boolean = false;
    @observable insurers: Insurer[];
    @observable currentPage: number = 1;
    @observable keyWordInsurer: string = ""
    @observable totalItemsCount: number = 0;

    constructor(props: any) {
        super(props);

        this.onSearchByString = this.onSearchByString.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        this.getInsurersCount();
        this.loadInsurers();
    }

    render() {
        return <div className="card shadow mb-4">
            <div className="card-header py-3">
                <div className="row">
                    <div className="col-4"><h4 className="m-0 font-weight-bold text-primary">Застрахователи</h4></div>
                    <div className="col-5"><input type="search" className="form-control" placeholder="Търси..." onChange={this.onSearchByString} /></div>
                    <div className="col-3">
                        <NavLink to={'/add-insurer'} className="btn btn-success btn-icon-split btn-add-new">
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
                                    ? this.insurers && this.insurers.length > 0
                                        ? <table className="table table-bordered dataTable" id="dataTable" style={{ width: "100%" }}>
                                            <thead>
                                                <tr role="row">
                                                    <th className="sorting" rowSpan={1} colSpan={1}>Име</th>
                                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "200px" }}>Действия</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.insurers.map((insurer) => {
                                                        return <tr key={insurer.id}>
                                                            <td>{insurer.name}</td>
                                                            <td>
                                                                <div className="d-flex justify-content-around">
                                                                    <NavLink to={`/update-insurer/${insurer.id}`} className="btn btn-success btn-circle btn-sm">
                                                                        <i className="fas fa-edit"></i>
                                                                    </NavLink>
                                                                    <a href="javascript:;" className="btn btn-danger btn-circle btn-sm" onClick={this.removeInsurer.bind(this, insurer.id)}><i className="fas fa-trash"></i></a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        : <NotificationPanel notificationType={NotificationType.info} text={"Няма намерени застрахователи"} isDismisable={false} />
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    removeInsurer(insurerId: string) {
        confirmAlert({
            message: 'Сигурен ли сте, че искате да изтриете записа?',
            buttons: [
                {
                    label: 'Да',
                    onClick: () => {
                        DbContext.removeInsurerById(insurerId);
                        this.loadInsurers();
                    }
                },
                {
                    label: 'Не',
                    onClick: () => { }
                }
            ]
        });
    }

    loadInsurers(query?: any) {
        DbContext.getInsurers(query).sort({ firstname: 1 }).skip((this.currentPage - 1) * Constants.itemsPerPage).limit(Constants.itemsPerPage).exec((err, doc) => {
            if (err) {

            } else {
                var dataArr = Object.keys(doc);
                this.insurers = [];

                runInAction.bind(this)(() => {
                    this.alreadySearched = true;
                    for (let index = 0; index < dataArr.length; index++) {
                        this.insurers.push(doc[dataArr[index]]);
                    }
                })
            }
        })
    }

    getInsurersCount(query?: any) {
        DbContext.getInsurersPagesCount(query).exec((err, count) => {
            runInAction.bind(this)(() => {
                this.totalItemsCount = count;
            })
        })
    }

    handlePageChange(newPage: number) {
        this.currentPage = newPage;
        this.loadInsurers();
    }

    @action onSearchByString(e: any) {
        let regex = new RegExp(e.target.value, "i");
        this.keyWordInsurer = e.target.value;
        this.currentPage = 1;
        this.loadInsurers({ name: regex })
        this.getInsurersCount({ name: regex })
    }
}