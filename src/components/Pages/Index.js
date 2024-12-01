import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Feature from '../elements/Feature'

function Index() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <div className="container-fluid py-5 mb-5 hero-header">
                <div className="container py-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-md-12 col-lg-7">
                            <h4 className="mb-3 text-secondary">100% Ropa de moda</h4>
                            <h1 className="mb-5 display-3 text-primary">Ropa nueva y <br /> de moda </h1>
                            <Link to="/shop" type="submit" className="w-25 btn btn-primary border-2 border-secondary py-3 px-4 rounded-pill text-white" style={{ top: 0, right: '25%' }}>Ver productos</Link>
                        </div>
                        <div className="col-md-12 col-lg-5">
                            <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                                <div className="carousel-inner" role="listbox">
                                    <div className="carousel-item active rounded">
                                        <img src="img/camisas.png" className="img-fluid w-100 h-100 bg-secondary rounded" alt="First slide" style={{ maxHeight: "400px" }} />
                                        <Link to="#" className="btn px-4 py-2 text-white rounded">Camisas</Link>
                                    </div>
                                    <div className="carousel-item rounded">
                                        <img src="img/zapatos.png" className="img-fluid w-100 h-100 rounded" alt="Second slide" style={{ maxHeight: "400px" }} />
                                        <Link to="#" className="btn px-4 py-2 text-white rounded">Zapatos</Link>
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Feature />
        </div>
    )
}
export default Index;
