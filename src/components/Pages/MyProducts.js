import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Page from '../elements/Page';
import Spinner from '../elements/Spinner';
import Sidebar from './Sidebar';

function MyProducts() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const userId = JSON.parse(localStorage.getItem("user")).id;

    // Cargar productos del usuario desde la API
    useEffect(() => {
        const fetchProducts = async () => {
            window.scrollTo(0, 0);
            try {
                const response = await axios.get(`http://localhost:3000/api/products/user/${userId}`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [userId]);

    const handleDelete = (e) =>{
        console.log("Eliminar")
    }   

    const handleEdit = (e) =>{
        console.log("Editar")
    }   

    return (
        <div>
            <Page page="Mis productos" />
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <h1 className="mb-4">Mis productos</h1>
                    <div className="row">
                        {/* Menú Lateral */}
                        <Sidebar />
                        {/* Contenido Principal */}
                        <div className="col-lg-9">
                            {loading ? (
                                <Spinner />
                            ) : products.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Productos</th>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Precio</th>
                                                <th scope="col">Categoría</th>
                                                <th scope="col">Stock</th>
                                                <th scope="col">Opciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((p) => (
                                                <tr key={p.product_id._id}>
                                                    <th>
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src={p.product_id.images[0]}
                                                                className="img-fluid me-3 rounded-circle"
                                                                style={{ width: '80px', height: '80px' }}
                                                                alt={p.product_id.name}
                                                            />
                                                        </div>
                                                    </th>
                                                    <td>{p.product_id.name}</td>
                                                    <td>${p.product_id.price.toLocaleString()}</td>
                                                    <td>{p.product_id.category.name}</td>
                                                    <td>{p.product_id.stock}</td>
                                                    <td>
                                                        <div className='d-flex gap-4'>
                                                            <button
                                                                onClick={() => handleEdit(p.product_id._id)}
                                                                className="btn btn-md rounded-circle bg-light border"
                                                            >
                                                                <i className="fa fa-pen text-warning"></i>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(p.product_id._id)}
                                                                className="btn btn-md rounded-circle bg-light border"
                                                            >
                                                                <i className="fa fa-times text-danger"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-center mt-4">No tienes productos publicados.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyProducts;
