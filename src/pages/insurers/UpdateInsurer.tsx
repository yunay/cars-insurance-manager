import * as React from 'react';
import { DbContext, DbResponseType } from '../../data/DataStore'
import { observer } from 'mobx-react'
import { observable, runInAction } from 'mobx';
import { NotificationPanel, NotificationType } from '../../common/ui/NotificationPanel';
import { Insurer } from '../../models/insurers/Insurer';
import { withRouter } from 'react-router';
import { InsurerValidation } from '../../models/Validations';

@observer class UpdateInsurerImpl extends React.Component<any, any>{
    private validator: InsurerValidation;

    @observable model: Insurer;
    @observable notificationPanel: any;

    constructor(props: any) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.updateInsurer = this.updateInsurer.bind(this);
        this.onBackBtnClick = this.onBackBtnClick.bind(this);

        this.loadInsurers();
        this.validator = new InsurerValidation();
    }

    render() {
        return <>
            {this.notificationPanel}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <div className="row">
                        <div className="col-9"><h4 className="m-0 font-weight-bold text-success">Редактиране на застраховател</h4></div>
                        <div className="col-3">
                            <a href="javascript:;" className="btn btn-outline-primary btn-back" onClick={this.onBackBtnClick}><i className="fas fa-arrow-left"></i></a>
                        </div>
                    </div>
                </div>
                {
                    this.model
                        ? <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <div className="form-row form-group">
                                        <div className="col-md-12">
                                            <label className="required-field">Име</label>
                                            <input type="text" className="form-control" name="name" value={this.model.name} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <a href="javascript://" onClick={this.updateInsurer} className="btn btn-primary btn-block"><i className="far fa-fw fa-edit"></i> Обнови</a>
                                </div>
                            </div>
                        </div>
                        : null
                }

            </div>
        </>
    }

    onBackBtnClick() {
        this.props.history.goBack();
    }

    handleChange(e: any) {
        this.model[e.target.name] = e.target.value;
    }

    updateInsurer() {
        if (this.validator.validate(this.model)) {
            DbContext.updateInsurer(this.props.match.params.insurerId, this.model).then((response) => {

                let notificationKey = `${+new Date()}_notificationKey`
                if (response.reponseType == DbResponseType.success)
                    this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.success} isDismisable={true} text={'Успешно обновен застраховател.'} />
                else
                    this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.danger} isDismisable={true} text={'Възникна грешка.'} />
            })
        } else {
            let notificationKey = `${+new Date()}_notificationKey`
            this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.danger} isDismisable={true} text={'Попълнете всички задължителни полета.'} />
        }
    }

    loadInsurers() {
        DbContext.getInsurerById(this.props.match.params.insurerId).exec((err, insurer: Insurer[]) => {
            if (err) {

            } else {
                runInAction.bind(this)(() => {
                    this.model = insurer[0];
                })
            }
        })
    }
}

export const UpdateInsurer = withRouter(UpdateInsurerImpl);