import * as React from 'react';
import { DbContext, DbResponseType } from '../../data/DataStore'
import { observer } from 'mobx-react'
import { observable, action, runInAction } from 'mobx';
import { NotificationPanel, NotificationType } from '../../common/ui/NotificationPanel';
import { Insurance, Installment } from '../../models/Insurance';
import { DatePicker } from '../../common/ui/DatePicker';
import { withRouter } from 'react-router';
import { Customer } from '../../models/Customer';
import { Insurer } from '../../models/Insurer';
import { AutoComplete } from '../../common/ui/AutoComplete'
import { BaseComponent } from '../../common/ui/BaseComponent';

@observer class AddInsuranceImpl extends BaseComponent<any>{

    private model: Insurance;
    @observable currentInstallment: Installment;
    @observable notificationPanel: any;
    @observable customers: Customer[];
    @observable insurers: Insurer[];
    @observable carRegNumbers:string[];

    constructor(props: any) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleCarNumberRegChange = this.handleCarNumberRegChange.bind(this);
        this.handleInstallmentChange = this.handleInstallmentChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.addInsurance = this.addInsurance.bind(this);

        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleCustomerSelect = this.handleCustomerSelect.bind(this);
        this.shouldCustomerRender = this.shouldCustomerRender.bind(this);
        this.getCustomerValue = this.getCustomerValue.bind(this);
        this.renderCustomer = this.renderCustomer.bind(this);

        this.handleInsurerChange = this.handleInsurerChange.bind(this);
        this.handleInsurerSelect = this.handleInsurerSelect.bind(this);
        this.shouldInsurerRender = this.shouldInsurerRender.bind(this);
        this.getInsurerValue = this.getInsurerValue.bind(this);
        this.renderInsurer = this.renderInsurer.bind(this);

        this.addInstallment = this.addInstallment.bind(this);
        this.onBackBtnClick = this.onBackBtnClick.bind(this);

        this.currentInstallment = new Installment();
        this.model = new Insurance();
        this.initData();
    }

    render() {
        return <>
            {this.notificationPanel}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <div className="row">
                        <div className="col-9"><h4 className="m-0 font-weight-bold text-primary">Добавяне на нова застраховка</h4></div>
                        <div className="col-3">
                            <a href="javascript:;" className="btn btn-outline-primary btn-back" onClick={this.onBackBtnClick}><i className="fas fa-arrow-left"></i></a>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="form-row form-group">
                        <div className="col-md-5">
                            <label>Клиент</label>
                            <div>
                            <AutoComplete 
                            items={this.customers && this.customers.length > 0 ? this.customers : null}
                            getItemValue={this.getCustomerValue}
                            onChange={this.handleCustomerChange}
                            onSelect={this.handleCustomerSelect}
                            shouldItemRender={this.shouldCustomerRender}
                            renderItem={this.renderCustomer}
                            />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <label>Застраховател</label>
                            <AutoComplete 
                            items={this.insurers && this.insurers.length > 0 ? this.insurers : null}
                            getItemValue={this.getInsurerValue}
                            onChange={this.handleInsurerChange}
                            onSelect={this.handleInsurerSelect}
                            shouldItemRender={this.shouldInsurerRender}
                            renderItem={this.renderInsurer}
                            />
                        </div>
                        <div className="col-md-2">
                        <label>Рег. номер</label>
                        <select className="form-control" disabled={this.model.customerId ? false : true} onChange={this.handleCarNumberRegChange} value={this.model.carRegNumber}>
                            <option>Избери</option>
                            {
                                this.carRegNumbers && this.carRegNumbers.length > 0
                                ? this.carRegNumbers.map((regNumber)=>{
                                    return <option value={regNumber} key={regNumber}>{regNumber}</option>
                                })
                                : null
                            }
                        </select>
                        </div>
                    </div>
                    <div className="form-row form-group">
                        <div className="col-md-12">
                            <label>Бележка</label>
                            <textarea rows={5} className="form-control" name="note" onChange={this.handleChange}></textarea>
                        </div>
                    </div>
                    {
                        this.model.installments && this.model.installments.length > 0
                            ? <div className="form-row form-group">
                                <div className="col-md-12">
                                    {
                                        this.model.installments.map((installment, index) => {
                                            return <div key={index}>{`Дата на вноска: ${this.displayDateFor(installment.date)}, Сума на вноска: ${installment.value}`}</div>
                                        })
                                    }
                                </div>
                            </div>
                            : null
                    }
                    <div className="form-row form-group">
                        <div className="mr-10">
                            <label>Дата на вноска</label>
                            <DatePicker onChange={this.handleDateChange} value={this.currentInstallment.date} />
                        </div>
                        <div className="mr-10">
                            <label>Сума на вноска</label>
                            <div className="input-group">
                                <input type="number" className="form-control" name="value" value={this.currentInstallment.value} onChange={this.handleInstallmentChange} />
                                <div className="input-group-append">
                                    <span className="input-group-text">лв.</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label>&nbsp;</label>
                            <div>
                                <a href="javascript://" onClick={this.addInstallment} className="btn btn-success"><i className="fas fa-fw fa-plus"></i> Добави вноска</a>
                            </div>
                        </div>
                    </div>
                    <a href="javascript://" onClick={this.addInsurance} className="btn btn-success btn-block"><i className="fas fa-fw fa-plus"></i> Добави</a>
                </div>
            </div>
        </>
    }

    onBackBtnClick() {
        this.props.history.goBack();
    }

    handleInstallmentChange(e: any) {
        this.currentInstallment[e.target.name] = e.target.value;
    }

    handleChange(e: any) {
        this.model[e.target.name] = e.target.value;
    }

    handleDateChange(date: any) {
        this.currentInstallment.date = date;
    }

    handleCarNumberRegChange(e:any){
        console.log(e.target.value)
        this.model.carRegNumber = e.target.value;
    }

    addInsurance() {
        DbContext.addInsurance(this.model).then((response) => {

            let notificationKey = `${+new Date()}_notificationKey`
            if (response.reponseType == DbResponseType.success)
                this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.success} isDismisable={true} text={'Успешно добавена застраховка.'} />
            else
                this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.danger} isDismisable={true} text={'Възникна грешка при добавяне на нова застраховка.'} />
        })
    }

    @action addInstallment() {
        this.model.installments.push(this.currentInstallment);
        this.currentInstallment = new Installment();
    }

    //#region Customers AutoComplete

    handleCustomerSelect(customer:Customer) {
        this.model.customerId = customer.id;
        this.loadCustomerCarRegNumbers();
    }

    handleCustomerChange(value:any) {
        if(this.model.customerId != "")
            this.model.customerId = "";
    }

    shouldCustomerRender(customer:Customer,value:any){
        return customer.firstname.toLowerCase().indexOf(value.toLowerCase()) > -1
    }

    getCustomerValue(customer:Customer){
        return `${customer.firstname} ${customer.secondname} ${customer.thirdname} ${customer.city}`
    }

    renderCustomer(customer:Customer){
        return `${customer.firstname} ${customer.secondname} ${customer.thirdname} ${customer.city}`
    }

    //#endregion

    //#region Insurers AutoComplete

    handleInsurerSelect(insurer:Insurance) {
        this.model.insurerId = insurer.id;
    }

    handleInsurerChange(value:any) {
        if(this.model.insurerId != "")
            this.model.insurerId = "";
    }

    shouldInsurerRender(insurer:Insurer,value:any){
        return insurer.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    }

    getInsurerValue(insurer:Insurer){
        return `${insurer.name}`
    }

    renderInsurer(insurer:Insurer){
        return `${insurer.name}`
    }

    //#endregion

    //#region Init

    initData(){
        this.initCustomersData();
        this.initInsurersData();
    }

    initCustomersData(){
        DbContext.getCustomers().exec((err, doc) => {
            if (err) {

            } else {
                var dataArr = Object.keys(doc);

                runInAction.bind(this)(() => {
                    this.customers = []
                    for (let index = 0; index < dataArr.length; index++) {
                        this.customers.push(doc[dataArr[index]]);
                    }
                })
            }
        })
    }

    initInsurersData(){
        DbContext.getInsurers().exec((err, doc) => {
            if (err) {

            } else {
                var dataArr = Object.keys(doc);

                runInAction.bind(this)(() => {
                    this.insurers = []
                    for (let index = 0; index < dataArr.length; index++) {
                        this.insurers.push(doc[dataArr[index]]);
                    }
                })
            }
        })
    }

    loadCustomerCarRegNumbers(){
        DbContext.getCustomers({id:this.model.customerId}).exec((err, doc) => {
            if (err) {

            } else {
                runInAction.bind(this)(() => {
                    this.carRegNumbers = (doc[0] as Customer).carRegistrationNumbers
                })
            }
        })
    }

    //#endregion
}

export const AddInsurance = withRouter(AddInsuranceImpl); 