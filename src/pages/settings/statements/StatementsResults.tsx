import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseComponent } from '../../../common/ui/BaseComponent';
import { Statement, StatementType } from '../../../models/common/Statement';
import { NotificationPanel, NotificationType } from '../../../common/ui/NotificationPanel';
import { DbContext, DbResponseType } from '../../../data/DataStore';
import { observable, runInAction } from 'mobx';
import { Constants } from '../../../common/Constants';
import { PageNavigation } from '../../../common/ui/PageNavigation';

interface StatementsResultsProps {
    changedStatement?: (status: DbResponseType) => void;
}

@observer export class StatementsResults extends BaseComponent<StatementsResultsProps> {
    @observable statements: Statement[];
    @observable totalItemsCount: number = 0;
    @observable currentPage: number = 1;

    constructor(props: any) {
        super(props);

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        this.loadStatements();
        this.getStatementsCount();
    }

    render() {
        return <div className="card-body">
            {
                Math.ceil(this.totalItemsCount / Constants.itemsPerPage) > 1
                    ? <PageNavigation onPageChange={this.handlePageChange} currentPage={this.currentPage} totalItemsCount={this.totalItemsCount} itemsPerPage={Constants.itemsPerPage} />
                    : null
            }
            <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                <div className="row">
                    <div className="col-sm-12">
                        {
                            this.statements && this.statements.length > 0
                                ? <table className="table table-bordered dataTable" id="dataTable" style={{ width: "100%" }}>
                                    <thead>
                                        <tr role="row">
                                            <th className="sorting" rowSpan={1} colSpan={1}>Име</th>
                                            <th className="sorting" rowSpan={1} colSpan={1}>Тип</th>
                                            <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "200px" }}>Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.statements.map((statement) => {
                                                return <tr key={statement.id}>
                                                    <td className="td-input-wrapper">
                                                        <div className="input-group">
                                                            <input type="text" className="form-control td-input" value={statement.name} onChange={e => statement.name = e.target.value} />
                                                        </div>
                                                    </td>
                                                    <td className="td-input-wrapper">
                                                        <div className="input-group">
                                                            <select className="form-control td-input" name="statementType" value={statement.statementType} onChange={e => statement.statementType = (e.target.value as any)}>
                                                                <option value={StatementType.city}>Град</option>
                                                                <option value={StatementType.village}>Село</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex justify-content-around">
                                                            <a href="javascript:;" title="Запази промените" className={`btn btn-sm btn-success`} onClick={this.updateStatement.bind(this,statement)}>
                                                                <i className="far fa-save"></i>
                                                            </a>
                                                            <a href="javascript:;" title={statement.isActive ? "деактивирай" : "активирай"} onClick={this.toggleStatementActivity.bind(this, statement)}>
                                                                <span className={`text-xs font-weight-bold ${statement.isActive ? "text-danger" : "text-success"}`}>{statement.isActive ? "ДЕАКТИВИРАЙ" : "АКТИВИРАЙ"}</span>
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                                : <NotificationPanel notificationType={NotificationType.info} text={"Няма намерени населени места"} isDismisable={false} />
                        }
                    </div>
                </div>
            </div>
        </div>
    }

    updateStatement(statement: Statement) {

        DbContext.updateStatement(statement).then((response) => {

            if (response.reponseType == DbResponseType.withError)
                console.log('Грешка при промяна на статуса на населеното място.')
            else {
                if (this.props.changedStatement)
                    this.props.changedStatement(response.reponseType);
            }
        })
    }

    toggleStatementActivity(statement: Statement) {
        statement.isActive = !statement.isActive;

        DbContext.updateStatement(statement).then((response) => {

            if (response.reponseType == DbResponseType.withError)
                console.log('Грешка при промяна на статуса на населеното място.')
        })
    }

    loadStatements(query?: any) {
        DbContext.getStatements(query).sort({ name: 1 }).skip((this.currentPage - 1) * Constants.itemsPerPage).limit(Constants.itemsPerPage).exec((err, doc) => {
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

    getStatementsCount() {
        DbContext.getStatementsPagesCount().exec((err, count) => {
            if (err)
                console.log(err)

            runInAction.bind(this)(() => {
                this.totalItemsCount = count;
            })
        })
    }

    handlePageChange(newPage: number) {
        this.currentPage = newPage;
        this.loadStatements();
    }
}