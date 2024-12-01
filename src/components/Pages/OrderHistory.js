import React, { useEffect, useState } from 'react';
import Page from '../elements/Page';
import Spinner from '../elements/Spinner';
import Sidebar from './Sidebar';

function OrderHistory() {
    const [loading, setLoading] = useState(true);

    // Datos estáticos simulados
    const orders = [
        {
            id: 1,
            date: '2024-11-01',
            status: 'Completed',
            items: [
                { name: 'Product 1', quantity: 2, price: 20 },
                { name: 'Product 2', quantity: 1, price: 40 },
            ],
        },
        {
            id: 2,
            date: '2024-10-15',
            status: 'Completed',
            items: [
                { name: 'Product 3', quantity: 1, price: 30 },
                { name: 'Product 4', quantity: 3, price: 15 },
            ],
        },
    ];

    // Simula la carga de datos
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000); // Simula 1 segundo de carga
        return () => clearTimeout(timer); // Limpia el temporizador
    }, []);

    return (
        <div>
            <Page page="Order History" />
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <h1 className="mb-4">Historial de Pedidos</h1>
                    <div className="row">
                        {/* Menú Lateral */}
                        <Sidebar/>
                        {/* Contenido Principal */}
                        <div className="col-lg-9">
                            {loading ? (
                                <Spinner />
                            ) : (
                                <div className="row">
                                    {orders.length > 0 ? (
                                        orders.map((order) => (
                                            <div key={order.id} className="col-md-6 col-lg-4 mb-4">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <h5 className="card-title text-primary">Order #{order.id}</h5>
                                                        <p className="card-text">
                                                            <strong>Fecha:</strong> {order.date}
                                                            <br />
                                                            <strong>Estado:</strong> {order.status}
                                                            <hr />
                                                            <h6>Artículos:</h6>
                                                            <ul>
                                                                {order.items.map((item, index) => (
                                                                    <li key={index}>
                                                                        {item.name} - {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </p>
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
