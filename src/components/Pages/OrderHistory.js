import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Page from '../elements/Page';
import Spinner from '../elements/Spinner';
import Sidebar from './Sidebar';

function OrderHistory() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const userId = JSON.parse(localStorage.getItem("user")).id;

    // Cargar órdenes del usuario desde la API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/orders/${userId}`);
                setOrders(response.data);
            } catch (error) {
                console.error('Error al obtener las órdenes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    return (
        <div>
            <Page page="Order History" />
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <h1 className="mb-4">Historial de Pedidos</h1>
                    <div className="row">
                        {/* Menú Lateral */}
                        <Sidebar />
                        {/* Contenido Principal */}
                        <div className="col-lg-9">
                            {loading ? (
                                <Spinner />
                            ) : (
                                <div className="row">
                                    {orders.length > 0 ? (
                                        orders.map((order, index) => (
                                            <div key={index} className="col-md-6 col-lg-4 mb-4">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <h5 className="card-title text-primary">Orden #{index + 1}</h5>
                                                        <div className="card-text">
                                                            <strong>Fecha:</strong> {new Date(order.date).toLocaleDateString()}
                                                            <br />
                                                            <strong>Total:</strong> $
                                                            {parseFloat(order.total_amount.$numberDecimal).toFixed(2)}
                                                            <hr />
                                                            <h6>Artículos:</h6>
                                                            <ul>
                                                                {order.items.map((item, idx) => (
                                                                    <li key={idx}>
                                                                        {item.product_name} - {item.quantity} x $
                                                                        {parseFloat(item.price).toFixed(2)} = $
                                                                        {(item.quantity * parseFloat(item.price)).toFixed(2)}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <button className="btn btn-outline-primary btn-sm">Ver Detalles</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No tienes pedidos realizados.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderHistory;
