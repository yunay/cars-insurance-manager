import { observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { BaseComponent } from '../../common/ui/BaseComponent';
import { NotificationPanel, NotificationType } from '../../common/ui/NotificationPanel';
import { DbContext, DbResponseType } from '../../data/DataStore';
import { Customer } from '../../models/customers/Customer';
import { Settings } from '../../models/common/Settings';
import { Installment, Insurance } from '../../models/insurances/Insurance';
import * as moment from 'moment';

@observer class InstallmentsImpl extends BaseComponent<any> {

    @observable insurances: Insurance[];
    @observable settings: Settings
    @observable customers: Customer[];
    @observable model: { installment: Installment, insurance: Insurance }[];
    @observable visibilityType: "all" | "forPaying" | "expiring";

    constructor(props:any) {
        super(props);

        this.handleVisibilityTypeChange = this.handleVisibilityTypeChange.bind(this);
    }

    componentDidMount() {
        this.loadSettings().then(() => {

            this.loadCustomers();
        })
    }

    render() {

        return <div className="card shadow mb-4">
            <div className="card-header py-3">
                <div className="row">
                    <div className="col-9"><h4 className="m-0 font-weight-bold text-success">Вноски</h4></div>
                    <div className="col-3">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="installments_visibility" id="installments_visibility_all" value="all" onChange={this.handleVisibilityTypeChange} />
                            <label className="form-check-label font-weight-bold text-primary" htmlFor="installments_visibility_all">ВСИЧКИ</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="installments_visibility" id="installments_visibility_forPaying" value="forPaying" onChange={this.handleVisibilityTypeChange} />
                            <label className="form-check-label font-weight-bold text-warning" htmlFor="installments_visibility_forPaying">ЗА ПЛАЩАНЕ</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="installments_visibility" id="installments_visibility_expiring" value="expiring" onChange={this.handleVisibilityTypeChange} />
                            <label className="form-check-label font-weight-bold text-danger" htmlFor="installments_visibility_expiring">ИЗТИЧАЩИ</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                    <div className="row">
                        <div className="col-sm-12">
                            {
                                this.model && this.model.length > 0
                                    ? <table className="table table-bordered dataTable" id="dataTable" style={{ width: "100%" }}>
                                        <thead>
                                            <tr role="row">
                                                <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "310px" }}>Клиент</th>
                                                <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "140px" }}>Изтича на</th>
                                                <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "150px" }}>Сума за плащане</th>
                                                <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "110px" }}>Статус</th>
                                                <th className="sorting" rowSpan={1} colSpan={1} style={{ width: "100px" }}>Действия</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.model.map((item, key: number) => {

                                                    if (this.visibilityType == "forPaying" && item.installment.isPaid == true)
                                                        return null;
                                                    else if (this.visibilityType == "expiring" && item.installment.date <= moment().add(-this.settings.daysBeforeInstallmentExpire, "days").toDate()) {
                                                        return null;
                                                    }

                                                    var currentCustomers = this.customers.filter(x => x.id == item.insurance.customerId);

                                                    return <tr key={`${item.installment.id}_${key}`}>
                                                        <td>{currentCustomers && currentCustomers.length > 0 ? `${currentCustomers[0].firstname} ${currentCustomers[0].thirdname} от ${currentCustomers[0].statement}` : null}</td>
                                                        <td>{this.displayDate(item.installment.date)}</td>
                                                        <td>{this.displayCurrancyValue(item.installment.value)}</td>
                                                        <td>{item.installment.isPaid ? "Платена" : "За плащане"}</td>
                                                        <td>
                                                            <div className="d-flex justify-content-around">
                                                                <a href="javascript:;" title={item.installment.isPaid ? "Маркирай за плащане" : "Маркирай като платена"} onClick={this.toggleInstallmentPaidStatus.bind(this, item.insurance, item.installment)}>
                                                                    <span className={`text-xs font-weight-bold ${item.installment.isPaid ? "text-danger" : "text-success"}`}>{item.installment.isPaid ? "МАРКИРАЙ ЗА ПЛАЩАНЕ" : "МАРКИРАЙ КАТО ПЛАТЕНА"}</span>
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    : <NotificationPanel notificationType={NotificationType.info} text={"Няма намерени вноски."} isDismisable={false} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    handleVisibilityTypeChange(e: any) {
        if (e.target.value == "all") {
            this.visibilityType = "all";
        } else if (e.target.value == "forPaying") {
            this.visibilityType = "forPaying";
        } else if (e.target.value == "expiring") {
            this.visibilityType = "expiring";
        }
    }

    toggleInstallmentPaidStatus(insurance: Insurance, installment: Installment) {
        insurance.installments.filter(x => x.id == installment.id)[0].isPaid = !installment.isPaid;

        DbContext.updateInsurance(insurance).then((response) => {

            if (response.reponseType == DbResponseType.withError)
                console.log('Грешка при промяна на статуса на застраховката')
        })
    }

    loadCustomers() {
        DbContext.getCustomers().exec((err, doc) => {
            if (err) {

            } else {
                var dataArr = Object.keys(doc);
                this.customers = [];
                runInAction.bind(this)(() => {
                    for (let index = 0; index < dataArr.length; index++) {
                        this.customers.push(doc[dataArr[index]]);
                    }

                    this.loadInsurances();
                })
            }
        })
    }

    loadSettings(): Promise<void> {

        return new Promise((resolve, reject) => {
            DbContext.getSettings().exec((err, doc) => {
                if (err) {
                    console.log(err);
                    reject();
                } else {
                    this.settings = (doc[0] as Settings);
                    resolve();
                }
            })
        })
    }

    loadInsurances() {
        DbContext.getInsurances().exec((err, doc) => {
            if (err) {

            } else {
                var dataArr = Object.keys(doc);
                this.insurances = [];
                this.model = [];

                runInAction.bind(this)(() => {
                    for (let index = 0; index < dataArr.length; index++) {
                        var currentInsurance = (doc[dataArr[index]] as Insurance)
                        this.insurances.push(currentInsurance);

                        for (var i = 0; i < currentInsurance.installments.length; i++) {
                            this.model.push({ installment: currentInsurance.installments[i], insurance: currentInsurance })
                        }
                    }

                    this.model = this.model.slice().sort((x, y) => {

                        if (x.installment.date < y.installment.date) {
                            return 1
                        } else {
                            return -1
                        }
                    })
                })
            }
        })
    }
   
}

export const InstallmentsUI = withRouter(InstallmentsImpl);