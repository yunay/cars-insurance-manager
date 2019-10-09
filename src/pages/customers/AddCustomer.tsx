import * as React from 'react';
import { DbContext, DbResponseType } from '../../data/DataStore'
import { Customer, CarInfo } from '../../models/customers/Customer';
import { observer } from 'mobx-react'
import { observable, runInAction, action } from 'mobx';
import { NotificationPanel, NotificationType } from '../../common/ui/NotificationPanel';
import { withRouter } from 'react-router';
import { AutoComplete } from '../../common/ui/AutoComplete';
import { Statement } from '../../models/common/Statement';
import { CustomerValidation } from '../../models/Validations';
import { ValidationHelpers } from '../../common/helpers/ValidationHelpers';
import { ObjectHelpers } from '../../common/helpers/Helpers';

@observer class AddCustomerImpl extends React.Component<any, any>{
    private model: Customer;
    private validator: CustomerValidation;

    @observable notificationPanel: any;
    @observable currentCarInfo: CarInfo;
    @observable statements: Statement[];
    @observable statementAutoCompleteKey: string;

    constructor(props: any) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
        this.onBackBtnClick = this.onBackBtnClick.bind(this);
        this.addCarInfo = this.addCarInfo.bind(this);
        this.handleCarInfoChange = this.handleCarInfoChange.bind(this);

        this.handleStatementChange = this.handleStatementChange.bind(this);
        this.handleStatementSelect = this.handleStatementSelect.bind(this);
        this.shouldStatementRender = this.shouldStatementRender.bind(this);
        this.getStatementValue = this.getStatementValue.bind(this);
        this.renderStatement = this.renderStatement.bind(this);

        this.model = new Customer();
        this.validator = new CustomerValidation();
        this.currentCarInfo = new CarInfo();
        this.statementAutoCompleteKey = ObjectHelpers.generateGuid();

        this.initStatementsData();
    }

    render() {
        return <>
            {this.notificationPanel}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <div className="row">
                        <div className="col-9"><h4 className="m-0 font-weight-bold text-success">Добавяне на нов клиент</h4></div>
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
                                    <label className="required-field">Име</label>
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
                                    <label className="required-field">Град / село</label>
                                    <AutoComplete
                                        key={this.statementAutoCompleteKey}
                                        items={this.statements && this.statements.length > 0 ? this.statements : null}
                                        getItemValue={this.getStatementValue}
                                        onChange={this.handleStatementChange}
                                        onSelect={this.handleStatementSelect}
                                        shouldItemRender={this.shouldStatementRender}
                                        renderItem={this.renderStatement}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="required-field">Телефонен номер</label>
                                    <input type="text" className="form-control" name="phone" value={this.model.phone} onChange={this.handleChange} />
                                </div>
                            </div>
                            {
                                this.model.carRegistrationInfo && this.model.carRegistrationInfo.length > 0
                                    ? <div className="form-row form-group">
                                        <div className="col-md-12">
                                            <div>Записани регистрационни номера на клиента:</div>
                                            {
                                                this.model.carRegistrationInfo.map((carInfo, index) => {
                                                    return <div key={index}>
                                                        <div className="removable-item">{`Регистрационен №: ${carInfo.registrationNumber}, № на талон: ${carInfo.registrationForm}`}</div>
                                                        <button type="button" className="close removable-item-x" onClick={this.removeCarInfo.bind(this, index)}>
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
                                <div className="col-5">
                                    <label>Регистрационен № на превозно средство</label>
                                    <input type="text" className="form-control" name="registrationNumber" value={this.currentCarInfo.registrationNumber} onChange={this.handleCarInfoChange} />
                                </div>
                                <div className="col-5">
                                    <label>№ на талон на превозно средство</label>
                                    <input type="text" className="form-control" name="registrationForm" value={this.currentCarInfo.registrationForm} onChange={this.handleCarInfoChange} />
                                </div>
                                <div className="col-2">
                                    <label>&nbsp;</label>
                                    <div>
                                        <a href="javascript://" onClick={this.addCarInfo} className="btn btn-success"><i className="fas fa-fw fa-plus"></i> Добави</a>
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

    private onBackBtnClick() {
        this.props.history.goBack();
    }

    private handleChange(e: any) {
        this.model[e.target.name] = e.target.value;
    }

    @action private addCarInfo() {
        if (!ValidationHelpers.isStringNullOrEmpty(this.currentCarInfo.registrationNumber)) {
            this.model.carRegistrationInfo.push(this.currentCarInfo);
            this.currentCarInfo = new CarInfo();
        }
    }

    private removeCarInfo(index: number) {
        this.model.carRegistrationInfo.splice(index, 1)
    }

    private handleCarInfoChange(e: any) {
        this.currentCarInfo[e.target.name] = e.target.value;
    }

    private addCustomer() {

        if (this.validator.validate(this.model)) {
            DbContext.addCustomer(this.model).then((response) => {

                let notificationKey = `${+new Date()}_notificationKey`
                if (response.reponseType == DbResponseType.success) {
                    runInAction(() => {
                        this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.success} isDismisable={true} text={'Успешно добавен нов клиент.'} />
                        this.model = new Customer();
                        this.statementAutoCompleteKey = ObjectHelpers.generateGuid();
                    })
                }else
                    this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.danger} isDismisable={true} text={'Възникна грешка при добавяне на нов клиент.'} />
            })
        } else {
            let notificationKey = `${+new Date()}_notificationKey`
            this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.danger} isDismisable={true} text={'Попълнете всички задължителни полета.'} />
        }
    }

    //#region Statements AutoComplete

    @action private handleStatementSelect(statement: Statement) {
        this.model.statement = statement.statementWithType;
        this.model.statementId = statement.id;
    }

    private handleStatementChange() {
        if(this.model.statement != "")
            this.model.statement = "";
    }

    private shouldStatementRender(statement: Statement, value: any) {
        return statement.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    }

    private getStatementValue(statement: Statement) {
        return `${statement.name}`
    }

    private renderStatement(statement: Statement) {
        return `${statement.name}`
    }

    private initStatementsData(){
        DbContext.getStatements().exec((err, doc) => {
            if (err) {

            } else {
                var dataArr = Object.keys(doc);

                runInAction.bind(this)(() => {
                    this.statements = []
                    for (let index = 0; index < dataArr.length; index++) {
                        this.statements.push(doc[dataArr[index]]);
                    }
                })
            }
        })
    }

    //#endregion
}

export const AddCustomer = withRouter(AddCustomerImpl);