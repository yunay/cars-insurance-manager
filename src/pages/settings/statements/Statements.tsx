import * as React from 'react';
import { DbContext, DbResponseType } from '../../../data/DataStore'
import { observer } from 'mobx-react'
import { observable, runInAction } from 'mobx';
import { NotificationPanel, NotificationType } from '../../../common/ui/NotificationPanel';
import { Statement, StatementType } from '../../../models/common/Statement';
import { BaseComponent } from '../../../common/ui/BaseComponent';
import { StatementsResults } from './StatementsResults';

@observer export class Statements extends BaseComponent<any>{
    private model: Statement;

    @observable statements: Statement[];
    @observable notificationPanel: any;

    constructor(props: any) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.addStatement = this.addStatement.bind(this);
        this.removeStatement = this.removeStatement.bind(this);

        this.model = new Statement();
    }

    componentDidMount() {
        this.loadStatements();
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
            </div>

            <StatementsResults statements={this.statements} onRemoveStatement={this.removeStatement}/>
        </>
    }

    handleChange(e: any) {
        this.model[e.target.name] = e.target.value;
    }

    addStatement() {
        DbContext.addStatement(this.model).then((response) => {

            let notificationKey = `${+new Date()}_notificationKey`
            if (response.reponseType == DbResponseType.success)
                this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.success} isDismisable={true} text={'Успешно добавено населено място.'} />
            else
                this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.danger} isDismisable={true} text={'Възникна грешка при добавяне на населено място.'} />

            this.loadStatements()
        })
    }

    removeStatement(statementId:string){
        DbContext.removeStatementById(statementId);
        this.loadStatements();
    }

    loadStatements() {
        DbContext.getStatements().exec((err, doc) => {
            if (err) {

            } else {
                var dataArr = Object.keys(doc);
                this.statements = [];

                runInAction.bind(this)(() => {
                    for (let index = 0; index < dataArr.length; index++) {
                        this.statements.push(doc[dataArr[index]]);
                    }
                })
            }
        })
    }
}