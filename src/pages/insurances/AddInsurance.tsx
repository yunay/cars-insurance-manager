import * as React from 'react';
import { DbContext, DbResponseType } from '../../data/DataStore'
import { observer } from 'mobx-react'
import { observable } from 'mobx';
import { NotificationPanel, NotificationType } from '../../common/ui/NotificationPanel';
import { Insurance, Installment } from '../../models/Insurance';
import { DatePicker } from '../../common/ui/DatePicker';
import { withRouter } from 'react-router';

@observer class AddInsuranceImpl extends React.Component<any, any>{

    private model: Insurance;
    @observable currentInstallment: Installment;
    @observable notificationPanel: any;

    constructor(props: any) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.addInsurance = this.addInsurance.bind(this);
        this.onBackBtnClick = this.onBackBtnClick.bind(this);

        this.currentInstallment = new Installment();
        this.model = new Insurance();
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
                            <input type="text" className="form-control" name="clientId" value={this.model.clientId} onChange={this.handleChange} />
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
                    <div className="form-row form-group">
                        <div className="mr-10">
                            <label>Дата на вноска</label>
                            <DatePicker />
                        </div>
                        <div className="mr-10">
                            <label>Сума на вноска</label>
                            <div className="input-group">
                                <input type="number" className="form-control" />
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

    onBackBtnClick(){
        this.props.history.goBack();
    }

    handleInstallmentChange(e: any) {
        this.currentInstallment[e.target.value] = e.target.value;
    }

    handleChange(e: any) {
        this.model[e.target.name] = e.target.value;
    }

    addInsurance() {
        DbContext.addInsurance(this.model.clientId, this.model.insurerId, this.model.note, this.model.installments).then((response) => {

            let notificationKey = `${+new Date()}_notificationKey`
            if (response.reponseType == DbResponseType.success)
                this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.success} isDismisable={true} text={'Успешно добавена застраховка.'} />
            else
                this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.danger} isDismisable={true} text={'Възникна грешка при добавяне на нова застраховка.'} />
        })
    }

    addInstallment() {
        this.model.installments
    }
}

export const AddInsurance = withRouter(AddInsuranceImpl); 