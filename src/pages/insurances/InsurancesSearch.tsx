import * as React from 'react';
import { NavLink } from 'react-router-dom';

export class InsurancesSearch extends React.Component<any, any> {

    render() {
        return <div className="card shadow mb-4">
            <div className="card-header py-3">
                <div className="row">
                    <div className="col-9"><h4 className="m-0 font-weight-bold text-primary">Застраховки</h4></div>
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
                <div className="row">
                    <div className="col">
                        <div className="form-row">
                            <div className="col-md-6">
                                <label>Клиент</label>
                                <input type="text" className="form-control" name="firstname" />
                            </div>
                            <div className="col-md-3">
                                <label>Град / Село</label>
                                <input type="text" className="form-control" name="secondname" />
                            </div>
                            <div className="col-md-3">
                                <label>Телефон</label>
                                <input type="text" className="form-control" name="thirdname" />
                            </div>
                        </div>
                        <br />
                        <a href="javascript://" className="btn btn-primary btn-block"><i className="fas fa-fw fa-search"></i> Търси</a>
                    </div>
                </div>
            </div>
        </div>
    }
}