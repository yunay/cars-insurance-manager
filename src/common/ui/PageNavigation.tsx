import { BaseComponent } from './BaseComponent';
import React = require('react');

interface PageNavigationProps {
    itemsPerPage:number;
    currentPage:number;
    onPageChange: (page:number)=>void;
    totalItemsCount:number;
}

export class PageNavigation extends BaseComponent<PageNavigationProps>{

    constructor(props:PageNavigationProps){
        super(props);

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    render() {
        return <div className="d-flex justify-content-between bd-highlight mb-3">
            <div className="p-2 bd-highlight">
                <a className="btn btn-light btn-icon-split btn-add-new" href="javascript:;" onClick={this.handlePageChange.bind(this,this.props.currentPage - 1)}>
                    <span className="icon text-white-50">
                        <i className="fas fa-arrow-left"></i></span><span className="text text-secondary">Назад</span>
                </a>
            </div>
            <div className="p-2 bd-highlight">
                <span className="text-secondary">
                    {this.props.currentPage} от {Math.ceil(this.props.totalItemsCount / this.props.itemsPerPage)}
            </span>
            </div>
            <div className="p-2 bd-highlight">
                <a className="btn btn-light btn-icon-split btn-add-new" href="javascript:;" onClick={this.handlePageChange.bind(this,this.props.currentPage + 1)}>
                    <span className="text text-secondary">Напред</span>
                    <span className="icon text-white-50">
                        <i className="fas fa-arrow-right"></i>
                    </span>
                </a>
            </div>
        </div>
    }

    handlePageChange(newPage:number){
        if(newPage <= Math.ceil(this.props.totalItemsCount / this.props.itemsPerPage) && newPage > 0)
            this.props.onPageChange(newPage)
    }
}