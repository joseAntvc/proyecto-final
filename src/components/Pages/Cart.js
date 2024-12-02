import React, { useContext, useEffect, useRef, useState } from 'react'
import Page from '../elements/Page'
import Spinner from '../elements/Spinner';
import { CartContext } from '../../context/CartContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function Cart() {

    const [loading, setLoading] = useState(true);
    const { carrito, priceTotal, hadleBorrar, handleSum, handleRest } = useContext(CartContext);
    const [Desc, setDesc] = useState('');
    const code = useRef('');

    const handleApplyCode = async () => {
        const url = "http://localhost:3000/api/coupon";
        const data = {
            code: code.current.value,
            expiration: new Date().toISOString(),
        };
        try {
            const response = await axios.post(url, data);
            console.log(response.status)
            if (response.status === 200) {
                setDesc(response.data)
                toast.success("¡Cupón aplicado con éxito!");
            }
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data;
                toast.error(errorMessage);
            } else {
                console.log("Error: No se pudo completar la solicitud.");
            }
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(false);
    }, []);

    return (
        <div>
            <Page page="Cart" />
            <div className="container-fluid py-3 mt-4">
                <div className="container py-3">
                    <div className="table-responsive">
                        {loading && (
                            <div className="text-center">
                                <Spinner />
                            </div>
                        )}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Productos</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Quitar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!loading && carrito.map((item) => (
                                    <tr key={item.product._id}>
                                        <th scope="row">
                                            <div className="d-flex align-items-center">
                                                <img src={item.product.images[0]}className="img-fluid me-5 rounded-circle" style={{ width: '80px', height: '80px' }} alt="" />
                                            </div>
                                        </th>
                                        <td>
                                            <p className="mb-0 mt-4">{item.product.name}</p>
                                        </td>
                                        <td>
                                            <p className="mb-0 mt-4">${item.product.price.toLocaleString()}</p>
                                        </td>
                                        <td>
                                            <div className="input-group quantity mt-4" style={{ width: '100px' }}>
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => handleRest(item.product)}>
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                </div>
                                                <span className="form-control form-control-sm text-center border-0" style={{ backgroundColor: 'transparent' }}>{item.quantity}</span>
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => handleSum(item.product)}>
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="mb-0 mt-4">${(item.product.price * item.quantity).toLocaleString()}</p>
                                        </td>
                                        <td>
                                            <button onClick={() => { hadleBorrar(item.product._id) }} className="btn btn-md rounded-circle bg-light border mt-4" >
                                                <i className="fa fa-times text-danger"></i>
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-3 d-flex justify-content-between mx-5">
                        <div className="d-flex align-items-center justify-content-center col-6">
                            <div className="d-flex h-auto w-auto align-items-center justify-content-center bg-light rounded p-5">
                                <input type="text" className="border-0 border-bottom rounded me-5 p-3" placeholder="Codigo de descuento"
                                    ref={code}
                                />
                                <button className="btn border-secondary rounded-pill px-4 py-3 text-primary bg-white" type="button"
                                    onClick={handleApplyCode}
                                >Aplicar</button>
                            </div>
                        </div>
                        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                            <div className="bg-light rounded">
                                <div className="p-4">
                                    <h1 className="display-6 mb-4">Total <span className="fw-normal">del carrito</span></h1>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">Subtotal:</h5>
                                        <p className="mb-0">${priceTotal().toLocaleString()}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h5 className="mb-0 me-4">Descuento</h5>
                                        <div className="">
                                            <p className="mb-0">{ Desc.percentage }%</p>
                                        </div>
                                    </div>
                                </div>
                                <p class="mb-0 text-end">Shipping to Ukraine.</p>
                                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                                    <p className="mb-0 pe-4">${(Desc ? ((100 - Desc.percentage)/100 * priceTotal()).toLocaleString() : priceTotal().toLocaleString())}</p>
                                </div>
                                <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Procesar a la compra</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;