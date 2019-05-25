import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable, runInAction } from 'mobx';
import { DbContext } from '../../data/DataStore';
import { Insurer } from '../../models/Insurer';

@observer export class Insurers extends React.Component<any, any> {

    @observable insurers: Insurer[];

    constructor(props: any) {
        super(props);

        this.insurers = [];
    }

    componentDidMount() {
        DbContext.getInsurers().exec((err, doc) => {
            if (err) {

            } else {
                var dataArr = Object.keys(doc);

                runInAction.bind(this)(() => {
                    for (let index = 0; index < dataArr.length; index++) {
                        this.insurers.push(doc[dataArr[index]]);
                    }
                })
            }
        })
    }

    render() {
        return <div className="card shadow mb-4">
            <div className="card-header py-3">
                <div className="row">
                    <div className="col-4"><h4 className="m-0 font-weight-bold text-primary">Застрахователи</h4></div>
                    <div className="col-5"><input type="search" className="form-control" placeholder="Търси..." /></div>
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
                <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                    <div className="row"><div className="col-sm-12">
                        <table className="table table-bordered dataTable" id="dataTable" style={{ width: "100%" }}>
                            <thead>
                                <tr role="row">
                                    <th className="sorting" rowSpan={1} colSpan={1}>Име</th>
                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "200px" }}>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.insurers && this.insurers.length > 0
                                        ? this.insurers.map((insurer) => {
                                            return <tr key={insurer.id}>
                                                <td>{insurer.name}</td>
                                                <td>
                                                    <div className="d-flex justify-content-around">
                                                        <a href="javascript:;" className="btn btn-success btn-circle btn-sm"><i className="fas fa-check"></i></a>
                                                        <a href="javascript:;" className="btn btn-primary btn-circle btn-sm"><i className="fas fa-edit"></i></a>
                                                        <a href="javascript:;" className="btn btn-danger btn-circle btn-sm"><i className="fas fa-trash"></i></a>
                                                    </div>
                                                </td>
                                            </tr>
                                        })
                                        : null
                                }
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    }
}