import * as React from 'react';
import { DbContext, DbResponseType } from '../../data/DataStore'
import { observer } from 'mobx-react'
import { observable } from 'mobx';
import { NotificationPanel, NotificationType } from '../../common/ui/NotificationPanel';
import { Insurer } from '../../models/Insurer';
import { withRouter } from 'react-router';

@observer class AddInsurerImpl extends React.Component<any, any>{
    private model: Insurer;
    @observable notificationPanel: any;

    constructor(props: any) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.addInsurer = this.addInsurer.bind(this);
        this.onBackBtnClick = this.onBackBtnClick.bind(this);

        this.model = new Insurer();
    }

    render() {
        return <>
            {this.notificationPanel}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <div className="row">
                        <div className="col-9"><h4 className="m-0 font-weight-bold text-primary">Добавяне на нов застраховател</h4></div>
                        <div className="col-3">
                            <a href="javascript:;" className="btn btn-outline-primary btn-back" onClick={this.onBackBtnClick}><i className="fas fa-arrow-left"></i></a>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <div className="form-row form-group">
                                <div className="col-md-12">
                                    <label>Име</label>
                                    <input type="text" className="form-control" name="name" value={this.model.name} onChange={this.handleChange} />
                                </div>
                            </div>
                            <a href="javascript://" onClick={this.addInsurer} className="btn btn-success btn-block"><i className="fas fa-fw fa-plus"></i> Добави</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }

    onBackBtnClick(){
        this.props.history.goBack();
    }

    handleChange(e: any) {
        this.model[e.target.name] = e.target.value;
    }

    addInsurer() {
        DbContext.addInsurer(this.model).then((response) => {

            let notificationKey = `${+new Date()}_notificationKey`
            if (response.reponseType == DbResponseType.success)
                this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.success} isDismisable={true} text={'Успешно добавен застраховател.'} />
            else
                this.notificationPanel = <NotificationPanel key={notificationKey} notificationType={NotificationType.danger} isDismisable={true} text={'Възникна грешка при добавяне на нов застраховател.'} />
        })
    }
}

export const AddInsurer = withRouter(AddInsurerImpl);