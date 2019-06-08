import * as React from 'react';
import { DbContext, DbResponseType } from '../../data/DataStore'
import { Customer } from '../../models/Customer';
import { observer } from 'mobx-react'
import { observable } from 'mobx';
import { NotificationPanel, NotificationType } from '../../common/ui/NotificationPanel';
import { withRouter } from 'react-router';

@observer class AddCustomerImpl extends React.Component<any, any>{
    private model: Customer;

    @observable notificationPanel: any;
    @observable currentCarRegNumber: string;

    constructor(props: any) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
        this.onBackBtnClick = this.onBackBtnClick.bind(this);
        this.addCarRegNumber = this.addCarRegNumber.bind(this);
        this.handleCarRegNumberChange = this.handleCarRegNumberChange.bind(this);

        this.model = new Customer();
        this.currentCarRegNumber = "";
    }

    render() {
        return <>
            {this.notificationPanel}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <div className="row">
                        <div className="col-9"><h4 className="m-0 font-weight-bold text-primary">Добавяне на нов клиент</h4></div>
                        <div className="col-3">
                            <a href="javascript:;" className="btn btn-outline-primary btn-back" onClick={this.onBackBtnClick}><i className="fas fa-arrow-left"></i></a>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <div className="form-row form-group">
                                <div className="col-md-2">
                                    <label>Име</label>
                                    <input type="text" className="form-control" name="firstname" value={this.model.firstname} onChange={this.handleChange} />
                                </div>
                                <div className="col-md-2">
                                    <label>Презиме</label>
                                    <input type="text" className="form-control" name="secondname" value={this.model.secondname} onChange={this.handleChange} />
                                </div>
                                <div className="col-md-2">
                                    <label>Фамилия</label>
                                    <input type="text" className="form-control" name="thirdname" value={this.model.thirdname} onChange={this.handleChange} />
                                </div>
                                <div className="col-md-3">
                                    <label>Град / село</label>
                                    <input type="text" className="form-control" name="city" value={this.model.city} onChange={this.handleChange} />
                                </div>
                                <div className="col-md-3">
                                    <label>Телефонен номер</label>
                                    <input type="text" className="form-control" name="phone" value={this.model.phone} onChange={this.handleChange} />
                                </div>
                            </div>
                            {
                                this.model.carRegistrationNumbers && this.model.carRegistrationNumbers.length > 0
                                    ? <div className="form-row form-group">
                                        <div className="col-md-12">
                                            <div>Записани регистрационни номера на клиента:</div>
                                            {
                                                this.model.carRegistrationNumbers.map((carRegNumber, index) => {
                                                    return <div key={index}>
                                                        <div className="car-reg-number">{carRegNumber}</div>
                                                        <button type="button" className="close remove-reg-number" onClick={this.removeCarRegNumber.bind(this,index)}>
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                    : null
                            }
                            <div className="form-row form-group">
                                <div className="mr-10">
                                    <label>Регистрационен № на превозно средство</label>
                                    <input type="text" className="form-control" name="value" value={this.currentCarRegNumber} onChange={this.handleCarRegNumberChange} />
                                </div>
                                <div>
                                    <label>&nbsp;</label>
                                    <div>
                                        <a href="javascript://" onClick={this.addCarRegNumber} className="btn btn-success"><i className="fas fa-fw fa-plus"></i> Добави регистрационен №</a>
                                    </div>
                                </div>
                            </div>
                            <a href="javascript://" onClick={this.addCustomer} className="btn btn-success btn-block"><i className="fas fa-fw fa-plus"></i> Добави</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }

    onBackBtnClick() {
        this.props.history.goBack();
    }

    handleChange(e: any) {
        this.model[e.target.name] = e.target.value;
    }

    addCarRegNumber() {
        this.model.carRegistrationNumbers.push(this.currentCarRegNumber);
    }

    removeCarRegNumber(index:number){
        this.model.carRegistrationNumbers.splice(index,1)
    }

    handleCarRegNumberChange(e: any) {
        this.currentCarRegNumber = e.target.value;
    }

    addCustomer() {
        DbContext.addCustomer(this.model.carRegistrationNumbers, this.model.firstname, this.model.secondname, this.model.thirdname, this.model.phone, this.model.city).then((response) => {

            let notificationKey = `${+new Date()}_notificationKey`
            if (response.reponseType == DbResponseType.success)
                this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.success} isDismisable={true} text={'Успешно добавен нов клиент.'} />
            else
                this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.danger} isDismisable={true} text={'Възникна грешка при добавяне на нов клиент.'} />
        })
    }
}

export const AddCustomer = withRouter(AddCustomerImpl);