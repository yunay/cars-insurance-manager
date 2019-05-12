import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class HeaderImpl extends React.Component<any, any> {

  render() {
    return <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-car"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Юки<sup>брокер</sup></div>
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
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
  }

  getNavLinkClass(path:string){
    return this.props.location.pathname === path ? 'nav-item active' : 'nav-item';
  }
}

export const Header = withRouter(HeaderImpl);


// const Header = () => {
//   return <header>
//     <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark bg-main">
//       <a className="navbar-brand" href="javascript:;"><img src="../images/car-logo.png" width={80} /></a>
//       <ul className="navbar-nav mr-auto">
//         <li className="nav-item">
//           <NavLink className="nav-link" to={"/"} activeClassName={'active'} exact>Застраховки</NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink className="nav-link" to={"/customers"} activeClassName={'active'} exact>Клиенти</NavLink>
//         </li>
//       </ul>
//     </nav>
//   </header>
// }

// export default Header;