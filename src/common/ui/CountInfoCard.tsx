import { BaseComponent } from "./BaseComponent";
import React = require('react');

export enum CardContentSize {
    small, big
}

export enum CountInfoCardType{
    customer, insurance, insurer, vehicle, installment
}

interface CountInfoCardProps{
    text:string;
    count:number;
    type:CountInfoCardType;
    cardContentSize?: CardContentSize;
    hyperlink?: string;
}

export class CountInfoCard extends BaseComponent<CountInfoCardProps> {
    render() {
        return <div className={`card border-left-${this.getTheme()} shadow h-100 py-2`}>
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className={`${this.props.cardContentSize == CardContentSize.big ? 'text-md' : 'text-xs'} font-weight-bold text-${this.getTheme()} text-uppercase mb-1`}>{this.props.text}</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">{this.props.count}</div>
                    </div>
                    <div className="col-auto">
                        <a href="javascript:;">
                            <i className={`${this.getIcon()} ${this.props.cardContentSize == CardContentSize.big ? 'fa-3x' : 'fa-2x'} text-${this.getTheme()} zoom`}></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    }

    getTheme(){
        switch(this.props.type){
            case CountInfoCardType.customer: return "primary";
            case CountInfoCardType.insurance: return "success";
            case CountInfoCardType.insurer: return "danger";
            case CountInfoCardType.vehicle: return "info";
            case CountInfoCardType.installment: return "warning";
        }
    }

    getIcon(){
        switch(this.props.type){
            case CountInfoCardType.customer: return "fas fa-users";
            case CountInfoCardType.insurance: return "fas fa-shield-alt";
            case CountInfoCardType.insurer: return "fas fa-user-shield";
            case CountInfoCardType.vehicle: return "fas fa-car";
            case CountInfoCardType.installment: return "fas fa-money-check-alt";
        }
    }
}