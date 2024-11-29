import React, { useEffect, useState } from 'react'
import Page from '../elements/Page'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Spinner from '../elements/Spinner';

function ShopDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/products/detail/${id}`);
                setProduct(response.data);
            } catch (error) {
                navigate('/error');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, navigate]);

    return (
        <div>
            <Page page="Shop Details" />
            {loading ? (
                <Spinner />
            ) : (
                <div className="container-fluid py-5 mt-5">
                    <div className="container py-5">
                        <div className="row g-4 mb-5">
                            <div className="col-lg-8 col-xl-9">
                                <div className="row g-4">
                                    <div className="col-lg-6">
                                        <div className="border rounded d-flex justify-content-center align-items-center" style={{ height: '500px', overflow: 'hidden', position: 'relative' }}>
                                            <img src={`${process.env.PUBLIC_URL}/img/${product.images[0]}`} className="img-fluid rounded" alt="Imag" style={{ width: 'auto', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <h4 className="fw-bold mb-3">{product.name}</h4>
                                        <p className="mb-3">Categoria: {product.category.name}</p>
                                        <h5 className="fw-bold mb-3">$ {product.price}</h5>
                                        {/*<div className="d-flex mb-4">
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <i className="fa fa-star"></i>
                                        </div>*/}
                                        <p className="my-4">{product.description}</p>
                                        <div className="input-group quantity mb-5" style={{ width: '100px' }}>
                                            <div className="input-group-btn">
                                                <button className="btn btn-sm btn-minus rounded-circle bg-light border" >
                                                    <i className="fa fa-minus"></i>
                                                </button>
                                            </div>
                                            <input type="text" className="form-control form-control-sm text-center border-0" value="1" />
                                            <div className="input-group-btn">
                                                <button className="btn btn-sm btn-plus rounded-circle bg-light border">
                                                    <i className="fa fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <Link to="#" className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-xl-3">
                                <div className="row g-4 fruite">
                                    <div className="col-lg-12">
                                        <h4 className="mb-4">Featured products</h4>
                                        {/* Para ver otros productos */}
                                        <div className="d-flex align-items-center justify-content-start">
                                            <div className="rounded me-4" style={{ width: '100px', height: '100px' }}>
                                                <img src="img/vegetable-item-6.jpg" className="img-fluid rounded" alt="" />
                                            </div>
                                            <div>
                                                <h6 className="mb-2">Big Banana</h6>
                                                <div className="d-flex mb-2">
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star text-secondary"></i>
                                                    <i className="fa fa-star"></i>
                                                </div>
                                                <div className="d-flex mb-2">
                                                    <h5 className="fw-bold me-2">2.99 $</h5>
                                                    <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center my-4">
                                            <Link to="#" className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">Vew More</Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="position-relative">
                                            <img src={`${process.env.PUBLIC_URL}/img/banner-clothes.png`} className="img-fluid w-100 rounded" alt="" />
                                            <div className="position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                                                <h3 className="text-secondary fw-bold text-white">Fresh <br /> Cool <br /> Clothes</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default ShopDetails;
