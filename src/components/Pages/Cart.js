import React, { useContext, useEffect, useRef, useState } from 'react'
import Page from '../elements/Page'
import Spinner from '../elements/Spinner';
import { CartContext } from '../../context/CartContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Cart() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id; // Recuperar el ID del usuario desde el localStorage
    const [loading, setLoading] = useState(true);
    const [addresses, setAddresses] = useState([]);
    const [payments, setPayments] = useState([]);
    const { carrito, priceTotal, hadleBorrar, handleSum, handleRest, quantityCart, vaciarCart } = useContext(CartContext);
    const [Desc, setDesc] = useState('');
    const code = useRef('');
    const { isLogIn } = useContext(AuthContext);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedBiling, setSelectedBiling] = useState('');
    const [selectP, setSelectP] = useState('');


    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(false);
        const fetchAddresses = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/users/addresses/${userId}`);
                const responsePayment = await axios.get(`http://localhost:3000/api/users/payment`);
                setAddresses(response.data);
                setPayments(responsePayment.data);
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
        };
        fetchAddresses();
    }, [userId]);

    const validationErrors = () => {
        const errors = [];
        if (selectP === "") errors.push("Seleccione un método de pago.");
        if (selectedAddress === "") errors.push("Seleccione una dirección.");
        return errors;
    };

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
                code.current.value = "";
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

    const handleBuy = async () => {
        const errors = validationErrors();
        if (errors.length > 0) {
            errors.forEach((error) => toast.error(error));
            return;
        }
        const orderData = {
            user: userId, // ID del usuario
            shipping_address: selectedAddress, // Dirección seleccionada
            billing_address: selectedBiling || null,
            items: carrito.map((item) => ({
                product: item.product._id, // ID del producto
                quantity: item.quantity,
                price: item.product.price, // Asegúrate de que el precio sea del tipo esperado
            })),
            total_amount: Desc
                ? ((100 - Desc.percentage) / 100 * priceTotal()).toFixed(2)
                : priceTotal().toFixed(2),
            coupons: Desc ? [Desc._id] : [], // Si hay un cupón, incluirlo
            date: new Date().toISOString(), // Fecha de la orden
            payment: selectP
        };



        try {
            const response = await axios.post('http://localhost:3000/api/orders', orderData);
            if (response.status === 200) {
                vaciarCart()
                toast.success("¡Compra realizada con éxito!");
                // Aquí puedes redirigir o limpiar el carrito después de la compra
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data);
            }
            toast.error("Hubo un problema al procesar tu compra.");
        }
    };

    return (
        <div>
            <Page page="Cart" />
            <div className="container-fluid py-3 mt-4">
                {quantityCart() > 0 ? (
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
                                                    <img src={item.product.images[0]} className="img-fluid me-5 rounded-circle" style={{ width: '80px', height: '80px' }} alt="" />
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
                        <div className="mt-3 d-flex justify-content-between flex-column flex-md-row mx-5">
                            <div className="d-flex row align-items-center justify-content-center col-12 col-md-6 mb-4 mb-md-0 ">
                                <div className="d-flex flex-column gap-4 h-auto w-auto align-items-center justify-content-center bg-light rounded p-5">
                                    {
                                        !isLogIn ? (
                                            <div className="alert alert-danger" role="alert">
                                                Los botones estan bloqueados, necesitas <Link to="/login">iniciar sesion</Link>
                                            </div>) : ''
                                    }
                                    <div className='d-flex'>
                                        <input type="text" className="border-0 border-bottom rounded me-5 p-3" placeholder="Codigo de descuento"
                                            ref={code}
                                        />
                                        <button className="btn border-secondary rounded-pill px-4 py-3 text-primary bg-white" type="button"
                                            onClick={handleApplyCode}
                                        >Aplicar</button>
                                    </div>
                                    {(addresses.length === 0 && isLogIn) ? (
                                        <div className="alert alert-dark" role="alert">
                                            No tienes niguna direccion, <Link to="/add_addresses" className='text-dark fw-bold'>registrar direccion</Link>
                                        </div>
                                    ) : (isLogIn ? (
                                        <>
                                            <select name='address' className={`form-control border-0 py-3 bg-white ${(!isLogIn) ? 'btn-disabled' : ''}`} disabled={!isLogIn}
                                                value={selectedAddress}
                                                onChange={(e) => setSelectedAddress(e.target.value)}>
                                                <option value="">Seleccionar dirección</option>
                                                {addresses.map((address) => (
                                                    <option key={address._id} value={address._id}>
                                                        {address.street}, {address.city} - {address.country}
                                                    </option>
                                                ))}
                                            </select>
                                            <select name='address' className={`form-control border-0 py-3 bg-white ${(!isLogIn) ? 'btn-disabled' : ''}`} disabled={!isLogIn}
                                                value={selectedBiling}
                                                onChange={(e) => setSelectedBiling(e.target.value)}>
                                                <option value="">Seleccionar dirección</option>
                                                {addresses.map((address) => (
                                                    <option key={address._id} value={address._id}>
                                                        {address.street}, {address.city} - {address.country}
                                                    </option>
                                                ))}
                                            </select>
                                            <select name='payment' className={`form-control border-0 py-3 bg-white ${(!isLogIn) ? 'btn-disabled' : ''}`} disabled={!isLogIn}
                                                value={selectP}
                                                onChange={(e) => setSelectP(e.target.value)}>
                                                <option value="">Seleccionar metodo de pago</option>
                                                {payments.map((pay) => (
                                                    <option key={pay._id} value={pay._id}>
                                                        {pay.type}
                                                    </option>
                                                ))}
                                            </select>
                                        </>) : '')}
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
                                                <p className="mb-0">{Desc ? Desc.percentage : 0}%</p>
                                            </div>
                                        </div>
                                        <p className="mb-0 text-end">{(Desc ? '-$' + ((Desc.percentage) / 100 * priceTotal()).toLocaleString() : '')}</p>
                                    </div>
                                    <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                        <h5 className="mb-0 ps-4 me-4">Total</h5>
                                        <p className="mb-0 pe-4">${(Desc ? ((100 - Desc.percentage) / 100 * priceTotal()).toLocaleString() : priceTotal().toLocaleString())}</p>
                                    </div>
                                    <button className={`btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4 ${(!isLogIn) ? 'btn-disabled' : ''}`}
                                        type="button" disabled={!isLogIn}
                                        onClick={handleBuy}
                                    >Procesar compra</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container-fluid m-0 p-0">
                        <div className="container text-center">
                            <div className="row justify-content-center">
                                <div className="col-lg-6">
                                    <h1 className="mb-4">Tu carrito esta vacio</h1>
                                    <p className="mb-4">Compra, compra, compra...</p>
                                    <Link to="/shop" className="btn border-secondary rounded-pill py-3 px-5">Ver productos</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
        </div >
    )
}

export default Cart;