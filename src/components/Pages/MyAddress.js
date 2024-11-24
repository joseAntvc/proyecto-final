
import React from 'react'
import Page from '../elements/Page';

function MyAddress() {
    return (
        <div>
            <Page page="My Addresses" />
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <h1 className="mb-4">Billing details</h1>
                    <form action="#">
                        <div className="row g-5">
                            <div className="col-md-12 col-lg-6 col-xl-7">
                                <div className="row">
                                    <div className="col-md-12 col-lg-6">
                                        <div className="form-item w-100">
                                            <label className="form-label my-3">First Name<sup>*</sup></label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-6">
                                        <div className="form-item w-100">
                                            <label className="form-label my-3">Last Name<sup>*</sup></label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Company Name<sup>*</sup></label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Address <sup>*</sup></label>
                                    <input type="text" className="form-control" placeholder="Street Name, House Number" />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Town/City<sup>*</sup></label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">State<sup>*</sup></label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Country<sup>*</sup></label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Postcode/Zip<sup>*</sup></label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Mobile<sup>*</sup></label>
                                    <input type="tel" className="form-control" />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Email Address<sup>*</sup></label>
                                    <input type="email" className="form-control" />
                                </div>
                                <hr />
                                <div className="form-item">
                                    <textarea name="text" className="form-control" spellcheck="false" cols="30" rows="11" placeholder="Oreder Notes (Optional)"></textarea>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-6 col-xl-5">
                                <div className="row">
                                    {/* Tarjeta 1 */}
                                    <div className="col-md-12 col-lg-6 col-xl-5 mb-4">
                                        <div className="card shadow-sm">
                                            <div className="card-body">
                                                <h5 className="card-title text-primary">John Doe</h5>
                                                <p className="card-text">
                                                    123 Main Street<br />
                                                    Springfield, IL 62704<br />
                                                    United States
                                                </p>
                                                <div className="d-flex justify-content-between">
                                                    <button className="btn btn-primary btn-sm">Seleccionar</button>
                                                    <button className="btn btn-outline-secondary btn-sm">Editar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tarjeta 2 */}
                                    <div className="col-md-12 col-lg-6 col-xl-5 mb-4">
                                        <div className="card shadow-sm">
                                            <div className="card-body">
                                                <h5 className="card-title text-primary">Jane Smith</h5>
                                                <p className="card-text">
                                                    456 Elm Street<br />
                                                    Metropolis, NY 10001<br />
                                                    United States
                                                </p>
                                                <div className="d-flex justify-content-between">
                                                    <button className="btn btn-primary btn-sm">Seleccionar</button>
                                                    <button className="btn btn-outline-secondary btn-sm">Editar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tarjeta 3 */}
                                    <div className="col-md-12 col-lg-6 col-xl-5 mb-4">
                                        <div className="card shadow-sm">
                                            <div className="card-body">
                                                <h5 className="card-title text-primary">Carlos González</h5>
                                                <p className="card-text">
                                                    Calle Falsa 123<br />
                                                    Ciudad de México, CDMX 01234<br />
                                                    México
                                                </p>
                                                <div className="d-flex justify-content-between">
                                                    <button className="btn btn-primary btn-sm">Seleccionar</button>
                                                    <button className="btn btn-outline-secondary btn-sm">Editar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MyAddress;