import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col align-self-start"></div>
                    <div className="col-md-6 align-self-center d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                        <div className="card card-nav-tabs text-center">
                            <div className="card-header card-header-primary">
                                <h2>Login</h2>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="emailAddress">Email Address</label>
                                        <input type="text" className="form-control" id="emailAddress" placeholder="Enter Email Address" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="text" className="form-control" id="password" placeholder="Enter Password" />
                                    </div>
                                    <button className="btn btn-primary btn-round">Log in</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col align-self-end"></div>
                </div>
            </div>
        );
    }
}

export default Login;
