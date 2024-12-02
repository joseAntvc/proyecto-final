import React, { useContext, useEffect, useState } from 'react'
import Page from '../elements/Page'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Spinner from '../elements/Spinner';
import { CartContext } from '../../context/CartContext';

function ShopDetails() {
    const { id } = useParams();
    const { carrito, hadleAgregar } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
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


    useEffect(() => {
        if (product) {
            // Busca si el producto ya está en el carrito
            const produCart = carrito.find(item => item.product._id === product._id);
            
            // Establecer la cantidad inicial
            const initialQuantity = product?.stock === 0
                ? 0
                : (produCart && produCart.quantity === product?.stock ? 0 : 1);
            setQuantity(initialQuantity); // Establecer la cantidad
        }
    }, [product, carrito]);
    

    const handleRest = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleSum = () => {
        const produCart = carrito.find(item => item.product._id === product._id);
        if (product && quantity < (product.stock - (produCart ? produCart.quantity : 0))) setQuantity(quantity + 1);
    };

    return (
        <div>
            <Page page="Detalles del producto" />
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
                                            <img src={product.images[0]} className="img-fluid rounded" alt="Imag" style={{ width: 'auto', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <h4 className="fw-bold mb-3">{product.name}</h4>
                                        <p className="mb-3">Categoria: {product.category.name}</p>
                                        <h5 className="fw-bold mb-3">$ {product.price.toLocaleString()}</h5>
                                        <p className="my-2">{product.description}</p>
                                        <div className="my-4 mx-2">
                                            <div className="row bg-light align-items-center text-center justify-content-center py-2">
                                                <div className="col-6">
                                                    <p className="mb-0">Tamaño</p>
                                                </div>
                                                <div className="col-6">
                                                    <p className="mb-0">{product.size}</p>
                                                </div>
                                            </div>
                                            <div className="row text-center align-items-center justify-content-center py-2">
                                                <div className="col-6">
                                                    <p className="mb-0">Genero</p>
                                                </div>
                                                <div className="col-6">
                                                    <p className="mb-0">{product.gender}</p>
                                                </div>
                                            </div>
                                            <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                <div className="col-6">
                                                    <p className="mb-0">Color</p>
                                                </div>
                                                <div className="col-6">
                                                    <p className="mb-0">{product.color.join(', ')}</p>
                                                </div>
                                            </div>
                                            <div className="row text-center align-items-center justify-content-center py-2">
                                                <div className="col-6">
                                                    <p className="mb-0">Disponibilidad</p>
                                                </div>
                                                <div className="col-6">
                                                    <p className="mb-0">{product.stock}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="input-group quantity mb-5" style={{ width: '100px' }}>
                                            <div className="input-group-btn">
                                                <button className="btn btn-sm btn-minus rounded-circle bg-light border"
                                                    onClick={handleRest} >
                                                    <i className="fa fa-minus"></i>
                                                </button>
                                            </div>
                                            <span className="form-control form-control-sm text-center border-0" style={{ backgroundColor: 'transparent' }}>
                                                {quantity}
                                            </span>
                                            <div className="input-group-btn">
                                                <button className="btn btn-sm btn-plus rounded-circle bg-light border"
                                                    onClick={handleSum}>
                                                    <i className="fa fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            className={`btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary ${product.stock === 0 || quantity === 0 ? 'btn-disabled' : ''}`}
                                            onClick={() => { hadleAgregar(product, quantity) }}
                                            disabled={product.stock === 0 || quantity === 0}>
                                            <i className="fa fa-shopping-bag me-2 text-primary"></i>Agregar al carrito
                                        </button>
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
