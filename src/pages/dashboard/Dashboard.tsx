import * as React from 'react';

export const Dashboard = () => {
  return <div className="card shadow mb-4">
    <div className="card-header py-3">
      <h4 className="m-0 font-weight-bold text-primary">Информативно табло</h4>
    </div>
    <div className="card-body">
      <div className="row">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Брой клиенти</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">90</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-users fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Брой застраховки</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">90</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-shield-alt fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-danger shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">Брой застрахователи</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">90</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-user-shield fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Pending Requests</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-comments fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}