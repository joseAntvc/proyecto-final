import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Page from '../elements/Page';
import Sidebar from './Sidebar';

const Report = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user?.id;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://54.226.228.162:3000/api/reports/sales/${id}`)
            .then((response) => {

                if (!response.ok) throw new Error('Error al obtener los datos');
                return response.json();
            })
            .then((data) => {
                console.log(data)
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error en la API:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Cargando datos...</div>;
    if (error) return <div>Error al obtener los datos.</div>;

    const yearlyChartData = {
        labels: ['Gasto', 'Ordenes'],
        datasets: [
            {
                label: 'Pedidos Anuales',
                data: [
                    data?.totalAmount || 0,
                    data?.totalOrders || 0
                ],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
            },
        ],
    };

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
                            <h2>Reporte de Actividad</h2>

                            <div className="charts-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', width: '80%' }}>
                                <div className="chart-box" style={{ width: '45%', margin: '15px 0' }}>
                                    <h3>Datos Anuales</h3>
                                    <Bar data={yearlyChartData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;