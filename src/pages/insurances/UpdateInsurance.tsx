import { action, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { withRouter } from 'react-router';
import { AutoComplete } from '../../common/ui/AutoComplete';
import { BaseComponent } from '../../common/ui/BaseComponent';
import { DatePicker } from '../../common/ui/DatePicker';
import { NotificationPanel, NotificationType } from '../../common/ui/NotificationPanel';
import { DbContext, DbResponseType } from '../../data/DataStore';
import { Customer } from '../../models/customers/Customer';
import { Installment, Insurance } from '../../models/insurances/Insurance';
import { Insurer } from '../../models/insurers/Insurer';
import { InsuranceValidation } from '../../models/Validations';

@observer class UpdateInsuranceImpl extends BaseComponent<any>{

    @observable model: Insurance;
    @observable currentInstallment: Installment;
    @observable notificationPanel: any;
    @observable customers: Customer[];
    @observable insurers: Insurer[];
    @observable carRegNumbers: string[];

    @observable isCustomersLoaded: boolean = false;
    @observable isInsurersLoaded: boolean = false;
    @observable isModelLoaded: boolean = false;

    private validator: InsuranceValidation;

    constructor(props: any) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleCarNumberRegChange = this.handleCarNumberRegChange.bind(this);
        this.handleInstallmentChange = this.handleInstallmentChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCreatedOnChange = this.handleCreatedOnChange.bind(this);
        this.updateInsurance = this.updateInsurance.bind(this);

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
        this.validator = new InsuranceValidation();
        this.initData();
    }

    render() {

        return <>
            {this.notificationPanel}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <div className="row">
                        <div className="col-9"><h4 className="m-0 font-weight-bold text-success">Редактиране на застраховка</h4></div>
                        <div className="col-3">
                            <a href="javascript:;" className="btn btn-outline-primary btn-back" onClick={this.onBackBtnClick}><i className="fas fa-arrow-left"></i></a>
                        </div>
                    </div>
                </div>
                {
                    this.isModelLoaded && this.isCustomersLoaded && this.isInsurersLoaded
                        ? <div className="card-body">
                            <div className="form-row form-group">
                                <div className="col-md-4">
                                    <label className="required-field">Клиент</label>
                                    <div>
                                        <AutoComplete
                                            items={this.customers && this.customers.length > 0 ? this.customers : null}
                                            getItemValue={this.getCustomerValue}
                                            onChange={this.handleCustomerChange}
                                            onSelect={this.handleCustomerSelect}
                                            shouldItemRender={this.shouldCustomerRender}
                                            renderItem={this.renderCustomer}
                                            initialItemId={this.model.customerId}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label className="required-field">Застраховател</label>
                                    <AutoComplete
                                        items={this.insurers && this.insurers.length > 0 ? this.insurers : null}
                                        getItemValue={this.getInsurerValue}
                                        onChange={this.handleInsurerChange}
                                        onSelect={this.handleInsurerSelect}
                                        shouldItemRender={this.shouldInsurerRender}
                                        renderItem={this.renderInsurer}
                                        initialItemId={this.model.insurerId}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <label >Рег. номер</label>
                                    <select className="form-control" disabled={this.model.customerId ? false : true} onChange={this.handleCarNumberRegChange} value={this.model.carRegNumber}>
                                        <option>Избери</option>
                                        {
                                            this.carRegNumbers && this.carRegNumbers.length > 0
                                                ? this.carRegNumbers.map((regNumber) => {
                                                    return <option value={regNumber} key={regNumber}>{regNumber}</option>
                                                })
                                                : null
                                        }
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <div className="mr-10">
                                        <label>Дата на създаване</label>
                                        <DatePicker onChange={this.handleCreatedOnChange} value={this.model.createdOn} />
                                    </div>
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
                                                    return <div key={index}>
                                                        <div className="removable-item">{`Дата на вноска: ${this.displayDateFor(installment.date)}, Сума на вноска: ${installment.value}`}</div>
                                                        <button type="button" className="close removable-item-x" onClick={this.removeInstallment.bind(this, index)}>
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
                                    <label className="required-field">Дата и сума на вноска</label>
                                    <DatePicker onChange={this.handleDateChange} value={this.currentInstallment.date} />
                                </div>
                                <div className="mr-10">
                                    <label>&nbsp;</label>
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
                            <a href="javascript://" onClick={this.updateInsurance} className="btn btn-primary btn-block"><i className="far fa-fw fa-edit"></i> Обнови</a>
                        </div>
                        : null
                }
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

    handleCreatedOnChange(date: any) {
        this.model.createdOn = date;
    }

    handleCarNumberRegChange(e: any) {
        this.model.carRegNumber = e.target.value;
    }

    updateInsurance() {
        if (this.validator.validate(this.model)) {
            DbContext.updateInsurance(this.model).then((response) => {

                let notificationKey = `${+new Date()}_notificationKey`
                if (response.reponseType == DbResponseType.success)
                    this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.success} isDismisable={true} text={'Успешно обновена застраховка.'} />
                else
                    this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.danger} isDismisable={true} text={'Възникна грешка.'} />
            })
        } else {
            let notificationKey = `${+new Date()}_notificationKey`
            this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.danger} isDismisable={true} text={'Попълнете всички задължителни полета.'} />
        }
    }

    @action addInstallment() {
        if (this.currentInstallment && this.currentInstallment.value && this.currentInstallment.date) {
            this.model.installments.push(this.currentInstallment);
            this.currentInstallment = new Installment();
        }
    }

    removeInstallment(index: number) {
        this.model.installments.splice(index, 1)
    }

    //#region Customers AutoComplete

    handleCustomerSelect(customer: Customer) {
        this.model.customerId = customer.id;
        this.loadCustomerCarRegNumbers();
    }

    handleCustomerChange() {
        if (this.model.customerId != "") {
            this.model.customerId = "";
            this.model.carRegNumber = "";
        }
    }

    shouldCustomerRender(customer: Customer, value: any) {
        return customer.firstname.toLowerCase().indexOf(value.toLowerCase()) > -1
    }

    getCustomerValue(customer: Customer) {
        return `${customer.firstname} ${customer.secondname} ${customer.thirdname} ${customer.statement}`
    }

    renderCustomer(customer: Customer) {
        return `${customer.firstname} ${customer.secondname} ${customer.thirdname} ${customer.statement}`
    }

    //#endregion

    //#region Insurers AutoComplete

    handleInsurerSelect(insurer: Insurance) {
        this.model.insurerId = insurer.id;
    }

    handleInsurerChange() {
        if (this.model.insurerId != "")
            this.model.insurerId = "";
    }

    shouldInsurerRender(insurer: Insurer, value: any) {
        return insurer.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    }

    getInsurerValue(insurer: Insurer) {
        return `${insurer.name}`
    }

    renderInsurer(insurer: Insurer) {
        return `${insurer.name}`
    }

    //#endregion

    //#region Init

    initData() {
        this.initInsuranceData()
        this.initCustomersData()

        this.initInsurersData();
    }

    initCustomersData() {

        DbContext.getCustomers().exec((err, doc) => {
            if (err) {

            } else {
                var dataArr = Object.keys(doc);

                runInAction.bind(this)(() => {
                    this.customers = []
                    this.isCustomersLoaded = true;

                    for (let index = 0; index < dataArr.length; index++) {
                        this.customers.push(doc[dataArr[index]]);
                    }
                })
            }
        })
    }

    initInsurersData() {
        DbContext.getInsurers().exec((err, doc) => {
            if (err) {

            } else {
                var dataArr = Object.keys(doc);

                runInAction.bind(this)(() => {
                    this.insurers = []
                    this.isInsurersLoaded = true;

                    for (let index = 0; index < dataArr.length; index++) {
                        this.insurers.push(doc[dataArr[index]]);
                    }
                })
            }
        })
    }

    initInsuranceData() {
        DbContext.getInsurances({ id: this.props.match.params.insuranceId }).exec((err, insurances: Insurance[]) => {
            if (err) {

            } else {
                this.isModelLoaded = true;
                runInAction.bind(this)(() => {
                    this.model = insurances[0];
                })
            }
        })
    }

    loadCustomerCarRegNumbers() {
        DbContext.getCustomers({ id: this.model.customerId }).exec((err, doc) => {
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

export const UpdateInsurance = withRouter(UpdateInsuranceImpl); 