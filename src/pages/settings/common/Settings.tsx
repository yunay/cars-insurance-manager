import { observer } from 'mobx-react';
import * as React from 'react';
import { BaseComponent } from '../../../common/ui/BaseComponent';
import { Settings } from '../../../models/common/Settings';
import { observable } from 'mobx';
import { DbContext, DbResponseType } from '../../../data/DataStore';
import { NotificationType, NotificationPanel } from '../../../common/ui/NotificationPanel';

@observer export class CommonSettings extends BaseComponent<any>{

    @observable private model: Settings;
    @observable notificationPanel: any;

    constructor(props: any) {
        super(props);

        this.initSettings();
    }

    render() {

        if (this.model) {
            return <>
                {this.notificationPanel}
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <div className="row">
                            <div className="col-9"><h4 className="m-0 font-weight-bold text-success">Общи настройки</h4></div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <div>
                                    <label>Брой дни известяване преди изтичане на вноска</label>
                                </div>
                                <div>
                                    <span className="btn btn-light btn-icon-split">
                                        <button className="btn btn-danger" onClick={this.handleDaysBeforeInstallmentExpireChange.bind(this, this.model.daysBeforeInstallmentExpire - 1)}>
                                            <i className="fas fa-arrow-down"></i>
                                        </button>
                                        <span className="text">{this.model.daysBeforeInstallmentExpire}</span>
                                        <button className="btn btn-success" onClick={this.handleDaysBeforeInstallmentExpireChange.bind(this, this.model.daysBeforeInstallmentExpire + 1)}>
                                            <i className="fas fa-arrow-up"></i>
                                        </button>
                                    </span>
                                </div>
                            </div>

                            <div className="col">
                                <div>
                                    <label>Интервал на известяване за изтичащи вноси в часове.</label>
                                </div>
                                <div>
                                    <span className="btn btn-light btn-icon-split">
                                        <button className="btn btn-danger" onClick={this.handleNotificationIntervalInHoursChange.bind(this, this.model.notificationIntervalInHours - 1)}>
                                            <i className="fas fa-arrow-down"></i>
                                        </button>
                                        <span className="text">{this.model.notificationIntervalInHours}</span>
                                        <button className="btn btn-success" onClick={this.handleNotificationIntervalInHoursChange.bind(this, this.model.notificationIntervalInHours + 1)}>
                                            <i className="fas fa-arrow-up"></i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        }

        return null;
    }

    handleDaysBeforeInstallmentExpireChange(newDaysBeforeInstallmentExpire: number) {
        let notificationKey = `${+new Date()}_notificationKey`
        this.model.daysBeforeInstallmentExpire = newDaysBeforeInstallmentExpire;

        if (newDaysBeforeInstallmentExpire >= 1) {
            DbContext.updateSettings(this.model).then((response) => {
                if (response.reponseType == DbResponseType.success)
                    this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.success} isDismisable={true} text={'Успешно обновени настройки.'} />
                else
                    this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.danger} isDismisable={true} text={'Възникна грешка.'} />
            })
        } else
            this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.warning} isDismisable={true} text={'Достигната минимална стойност.'} />
    }

    handleNotificationIntervalInHoursChange(hours: number) {
        let notificationKey = `${+new Date()}_notificationKey`
        this.model.notificationIntervalInHours = hours;

        if (hours >= 1) {
            DbContext.updateSettings(this.model).then((response) => {
                if (response.reponseType == DbResponseType.success)
                    this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.success} isDismisable={true} text={'Успешно обновени настройки. Моля, рестартирайте програмата за да влязат в сила.'} />
                else
                    this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.danger} isDismisable={true} text={'Възникна грешка.'} />
            })
        } else
            this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.warning} isDismisable={true} text={'Достигната минимална стойност.'} />
    }

    initSettings() {
        DbContext.getSettings().exec((err, doc) => {
            let notificationKey = `${+new Date()}_notificationKey`

            if (err)
                this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.danger} isDismisable={true} text={'Възникна грешка.'} />
            else
                this.model = (doc[0] as Settings);
        })
    }
}