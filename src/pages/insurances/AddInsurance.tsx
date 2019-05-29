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
import * as AutoComplete from 'react-autocomplete';

@observer class AddInsuranceImpl extends React.Component<any, any>{

    private model: Insurance;
    @observable currentInstallment: Installment;
    @observable notificationPanel: any;
    @observable customers: Customer[];
    @observable insurers: Insurer[];

    constructor(props: any) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleInstallmentChange = this.handleInstallmentChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.addInsurance = this.addInsurance.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.addInstallment = this.addInstallment.bind(this);
        this.onBackBtnClick = this.onBackBtnClick.bind(this);

        this.selectCustomer = this.selectCustomer.bind(this);
        this.showCustomerValue = this.showCustomerValue.bind(this);
        this.handleCustomerSelectOption = this.handleCustomerSelectOption.bind(this);

        this.currentInstallment = new Installment();
        this.model = new Insurance();

        this.state = {
            value: '',
          }
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
                        <div className="col-md-6">
                            <label>Клиент</label>
                            <AutoComplete
                                items={[
                                    { id: 'foo', label: 'foo' },
                                    { id: 'bar', label: 'bar' },
                                    { id: 'baz', label: 'baz' },
                                ]}
                                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                getItemValue={item => item.label}
                                renderItem={(item, highlighted) =>
                                    <div
                                        key={item.id}
                                        style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                                    >
                                        {item.label}
                                    </div>
                                }
                                value={this.state.value}
                                onChange={e => this.setState({ value: e.target.value })}
                                onSelect={value => this.setState({ value })}
                            />
                            <input type="text" className="form-control" name="clientId" value={this.model.customerId} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label>Застраховател</label>
                            <input type="text" className="form-control" name="insurerId" value={this.model.insurerId} onChange={this.handleChange} />
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
                                        this.model.installments.map(installment => {
                                            return <div>{`Дата на вноска: ${installment.date.format("l")}, Сума на вноска: ${installment.value}`}</div>
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
        this.currentInstallment[e.target.value] = e.target.value;
    }



    handleChange(e: any) {
        this.model[e.target.name] = e.target.value;
    }

    handleDateChange(date: any) {
        this.currentInstallment.date = date;
    }

    addInsurance() {
        DbContext.addInsurance(this.model.customerId, this.model.insurerId, this.model.note, this.model.installments).then((response) => {

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

    selectCustomer(value: string): Promise<Customer[]> {
        var valueLowerCase = value.toLowerCase();
        valueLowerCase = valueLowerCase.replace(/гр.\s+|с.\s+/, "");

        // return DbContext.getCustomers().exec((err, doc) => {
        //     if (err) {

        //     } else {
        //         var dataArr = Object.keys(doc);

        //         runInAction.bind(this)(() => {
        //             for (let index = 0; index < dataArr.length; index++) {
        //                 this.customers.push(doc[dataArr[index]]);
        //             }
        //         })
        //     }
        // })

        return Promise.resolve([]);
    }

    showCustomerValue(value: Customer): string {
        return value.firstname;
    }

    @action handleCustomerSelectOption(value?: Customer) {
        if (value) {

        }
    }

    handleCustomerChange() {
        this.model.customerId = null;
    }
}

export const AddInsurance = withRouter(AddInsuranceImpl); 