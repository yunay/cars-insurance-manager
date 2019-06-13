import { BaseComponent } from "./BaseComponent";
import React = require('react');

export enum CountInfoCardType{
    customer, insurance, insurer
}

interface CountInfoCardProps{
    text:string;
    count:number;
    type:CountInfoCardType;
}

export class CountInfoCard extends BaseComponent<CountInfoCardProps> {
    render() {
        return <div className={`card border-left-${this.getTheme()} shadow h-100 py-2`}>
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className={`text-xs font-weight-bold text-${this.getTheme()} text-uppercase mb-1`}>{this.props.text}</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">{this.props.count}</div>
                    </div>
                    <div className="col-auto">
                        <i className={`${this.getIcon()} fa-2x text-gray-300`}></i>
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
        }
    }

    getIcon(){
        switch(this.props.type){
            case CountInfoCardType.customer: return "fas fa-users";
            case CountInfoCardType.insurance: return "fas fa-shield-alt";
            case CountInfoCardType.insurer: return "fas fa-user-shield";
        }
    }
}