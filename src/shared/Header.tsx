import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import * as $ from 'jquery';

class HeaderImpl extends React.Component<any, any> {

    render() {
        return <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-car"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Insurance manager</div>
            </a>
            <hr className="sidebar-divider my-0" />
            <li className={this.getNavLinkClass("/")}>
                <NavLink className="nav-link" to={"/"} exact>
                    <i className="fas fa-fw fa-tachometer-alt"></i><span>Информативно табло</span>
                </NavLink>
            </li>
            <hr className="sidebar-divider" />
            <li className={this.getNavLinkClass("/customers")}>
                <NavLink className="nav-link" to={"/customers"} exact>
                    <i className="fas fa-fw fa-users"></i><span>Клиенти</span>
                </NavLink>
            </li>
            <hr className="sidebar-divider" />
            <li className={this.getNavLinkClass("/insurances")}>
                <NavLink className="nav-link" to={"/insurances"} exact>
                    <i className="fas fa-fw fa-shield-alt"></i><span>Застраховки</span>
                </NavLink>
            </li>
            <hr className="sidebar-divider" />
            <li className={this.getNavLinkClass("/insurers")}>
                <NavLink className="nav-link" to={"/insurers"} exact>
                    <i className="fas fa-fw fa-user-shield"></i><span>Застрахователи</span>
                </NavLink>
            </li>
            <hr className="sidebar-divider" />
            <li className={this.getNavLinkClass("/settings")}>
                <a className="nav-link collapsed" href="javascript:;" data-toggle="collapse" onClick={this.toggleMenu}>
                    <i className="fas fa-cogs"></i><span>Настройки</span>
                </a>
                <div className="collapse">
                    <div className="bg-light py-2 collapse-inner rounded">
                        <NavLink className="collapse-item" to={"/statements"} exact>Населени места</NavLink>
                        <NavLink className="collapse-item" to={"/common-settings"}>Общи настройки</NavLink>
                    </div>
                </div>
            </li>
        </ul>
    }

    getNavLinkClass(path: string) {
        return this.props.location.pathname === path ? 'nav-item active' : 'nav-item';
    }

    toggleMenu(currentElement: any) {
        let currentMenuItem = $(currentElement.currentTarget);
        currentMenuItem.toggleClass('collapsed');
        currentMenuItem.next().slideToggle('show');
    }
}

export const Header = withRouter(HeaderImpl);