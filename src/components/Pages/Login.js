import React from 'react'
import Page from '../elements/Page';
import { Link } from 'react-router-dom';

function Fomulario() {
    return (
        <div>
            <Page page="Login" />
            <div className="container-fluid py-4">
                <div className="container text-center">
                    <div className="row justify-content-center ">
                        <div className="col-lg-6 bg-light rounded p-5">
                            <i className="fas fa-user-circle display-1 text-primary"></i>
                            <h1 className="mb-4">Login</h1>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <form action="" className="w-75">
                                    <input type="text" className="w-100 form-control border-0 py-3 mb-4" placeholder="Enter Your Email" />
                                    <input type="email" className="w-100 form-control border-0 py-3 mb-4" placeholder="Your Password" />
                                    <button className="w-50 btn form-control border-primary py-3 bg-white text-primary " type="submit">Submit</button>
                                </form>
                            </div>
                            <div className="container text-center mt-5">
                                <span className="d-block">If you don't have an account</span>
                                <Link className="d-block" to="/Register">Register</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Fomulario;
