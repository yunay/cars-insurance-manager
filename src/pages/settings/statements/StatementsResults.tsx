import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseComponent } from '../../../common/ui/BaseComponent';
import { Statement } from '../../../models/common/Statement';

interface StatementsResultsProps {
    statements: Statement[];
    onRemoveStatement: (statementId: string) => void;
}

@observer export class StatementsResults extends BaseComponent<StatementsResultsProps> {

    render() {
        if (this.props.statements && this.props.statements.length > 0) {
            return <div className="card shadow mb-4">
                <div className="card-body">
                    <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                        <div className="row">
                            {
                                this.props.statements.map(statement => {
                                    return <div className="col-2" key={statement.id}>
                                        <div className="removable-item">{statement.statementWithType}</div>
                                        <button type="button" className="close removable-item-x" onClick={this.removeStatement.bind(this, statement.id)}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        }

        return null
    }

    removeStatement(statementId: string) {
        this.props.onRemoveStatement(statementId);
    }
}