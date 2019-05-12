import * as React from 'react';
import { NavLink } from 'react-router-dom';

export class Insurers extends React.Component<any, any> {

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
                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "200px" }}>Име<i className="fas fa-fw fa-sort-down table-sort-icon"></i></th>
                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "200px" }}>Презиме<i className="fas fa-fw fa-sort-down table-sort-icon-transform"></i></th>
                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "200px" }}>Фамилия<i className="fas fa-fw fa-sort-down table-sort-icon-transform"></i></th>
                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "113px" }}>Телефон<i className="fas fa-fw fa-sort-down table-sort-icon-transform"></i></th>
                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "206px" }}>Град<i className="fas fa-fw fa-sort-down table-sort-icon-transform"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr role="row" className="odd">
                                    <td className="sorting_1">Airi Satou</td>
                                    <td>Accountant</td>
                                    <td>Tokyo</td>
                                    <td>33</td>
                                    <td>2008/11/28</td>
                                </tr><tr role="row" className="even">
                                    <td className="sorting_1">Angelica Ramos</td>
                                    <td>Chief Executive Officer (CEO)</td>
                                    <td>London</td>
                                    <td>47</td>
                                    <td>2009/10/09</td>
                                </tr><tr role="row" className="odd">
                                    <td className="sorting_1">Ashton Cox</td>
                                    <td>Junior Technical Author</td>
                                    <td>San Francisco</td>
                                    <td>66</td>
                                    <td>2009/01/12</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    }
}