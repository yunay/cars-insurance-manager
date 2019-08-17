import { observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { BaseComponent } from '../../../common/ui/BaseComponent';
import { NotificationPanel, NotificationType } from '../../../common/ui/NotificationPanel';
import { DbContext, DbResponseType } from '../../../data/DataStore';
import { Statement, StatementType } from '../../../models/common/Statement';
import { StatementsResults } from './StatementsResults';
import { ObjectHelpers } from '../../../common/helpers/Helpers';

@observer export class Statements extends BaseComponent<any>{
    private model: Statement;

    @observable resultsUniqueKey: string;
    @observable notificationPanel: any;

    constructor(props: any) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.addStatement = this.addStatement.bind(this);
        this.onChangedStatement = this.onChangedStatement.bind(this);

        this.model = new Statement();
        this.resultsUniqueKey = ObjectHelpers.generateGuid();
    }

    render() {
        return <>
            {this.notificationPanel}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <div className="row">
                        <div className="col-9"><h4 className="m-0 font-weight-bold text-success">Добавяне на населено място</h4></div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <div className="form-row form-group">
                                <div className="col-md-8">
                                    <label>Име</label>
                                    <input type="text" className="form-control" name="name" value={this.model.name} onChange={this.handleChange} />
                                </div>
                                <div className="col-md-4">
                                    <label>Град/Село</label>
                                    <select className="form-control" onChange={this.handleChange} name="statementType" >
                                        <option value={StatementType.city}>Град</option>
                                        <option value={StatementType.village}>Село</option>
                                    </select>
                                </div>
                            </div>
                            <a href="javascript://" onClick={this.addStatement} className="btn btn-success btn-block"><i className="fas fa-fw fa-plus"></i> Добави</a>
                        </div>
                    </div>
                </div>
                <StatementsResults key={this.resultsUniqueKey} changedStatement={this.onChangedStatement} />
            </div>
        </>
    }

    handleChange(e: any) {
        this.model[e.target.name] = e.target.value;
    }

    addStatement() {
        DbContext.addStatement(this.model).then((response) => {

            let notificationKey = `${+new Date()}_notificationKey`
            if (response.reponseType == DbResponseType.success) {
                runInAction(() => {
                    this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.success} isDismisable={true} text={'Успешно добавено населено място.'} />
                    this.resultsUniqueKey = ObjectHelpers.generateGuid();
                    this.model.name = "";
                })
            }else
                this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.danger} isDismisable={true} text={'Възникна грешка при добавяне на населено място.'} />
        })
    }

    onChangedStatement(status: DbResponseType) {
        let notificationKey = `${+new Date()}_notificationKey`

        if (status == DbResponseType.success) {
            this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.success} isDismisable={true} text={'Успешна промяна.'} />
        } else {
            this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.danger} isDismisable={true} text={'Възникна грешка при промяна.'} />
        }
    }
}