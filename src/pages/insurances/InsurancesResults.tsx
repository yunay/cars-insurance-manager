import * as React from 'react';

export class InsurancesResults extends React.Component<any, any> {

    render() {
        return <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h4 className="m-0 font-weight-bold text-primary">Намерени застраховки</h4>
            </div>
            <div className="card-body">
                <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                    <div className="row"><div className="col-sm-12">
                        <table className="table table-bordered dataTable" id="dataTable" style={{ width: "100%" }}>
                            <thead>
                                <tr role="row">
                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "200px" }}>Клиент<i className="fas fa-fw fa-sort-down table-sort-icon"></i></th>
                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "150px" }}>Регистрационен №<i className="fas fa-fw fa-sort-down table-sort-icon-transform"></i></th>
                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "150px" }}>Застрахователна компания<i className="fas fa-fw fa-sort-down table-sort-icon-transform"></i></th>
                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "100px" }}>Вноски</th>
                                    <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "100px" }}>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr role="row" className="odd">
                                    <td className="sorting_1">Airi Satou</td>
                                    <td>Accountant</td>
                                    <td>Tokyo</td>
                                    <td>33</td>
                                    <td>
                                        <div className="d-flex justify-content-around">
                                            <a href="javascript:;" className="btn btn-primary btn-circle btn-sm"><i className="fas fa-info"></i></a>
                                            <a href="javascript:;" className="btn btn-success btn-circle btn-sm"><i className="fas fa-edit"></i></a>
                                            <a href="javascript:;" className="btn btn-danger btn-circle btn-sm"><i className="fas fa-trash"></i></a>
                                        </div>
                                    </td>
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