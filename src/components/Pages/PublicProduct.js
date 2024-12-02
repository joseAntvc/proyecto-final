import React, { useState, useEffect, useContext } from 'react';
import Page from '../elements/Page';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CreateProduct() {
    const [categories, setCategories] = useState([]);

    const { isLogIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogIn) {
            navigate('/error');
        } else {
            axios.get('http://localhost:3000/api/categories')
                .then(response => setCategories(response.data))
                .catch(error => toast.error('Error al cargar categorías.'));
        }
    }, [isLogIn, navigate]);

    const validate = (data) => {
        const errorMessages = [];

        if (!data.name.trim()) errorMessages.push("El nombre del producto es obligatorio.");
        if (!data.description.trim()) errorMessages.push("La descripción es obligatoria.");
        if (!data.price || isNaN(data.price) || data.price <= 0) errorMessages.push("El precio debe ser un número válido y mayor a 0.");
        if (!data.stock || isNaN(data.stock) || data.stock < 0) errorMessages.push("El stock debe ser un número válido y no puede ser negativo.");
        if (!data.size.trim()) errorMessages.push("El tamaño es obligatorio.");
        if (!data.color.trim()) errorMessages.push("El color es obligatorio.");
        if (!data.gender) errorMessages.push("Debes seleccionar un género.");
        if (!data.image) errorMessages.push("Debes seleccionar una imagen.");
        if (!data.category) errorMessages.push("Debes seleccionar una categoría.");

        return errorMessages;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", e.target.name.value);
        formData.append("description", e.target.description.value);
        formData.append("price", e.target.price.value);
        formData.append("stock", e.target.stock.value);
        formData.append("size", e.target.size.value);
        formData.append("color", e.target.color.value);
        formData.append("gender", e.target.gender.value);
        formData.append("image", e.target.image.files[0]);
        formData.append("category", e.target.category.value);

        const dataToValidate = Object.fromEntries(formData.entries());
        const validationErrors = validate(dataToValidate);

        if (validationErrors.length > 0) {
            validationErrors.forEach(error => toast.error(error));
            return;
        }

        axios.post('http://localhost:3000/api/products', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(response => {
                if (response.status === 200) {
                    e.target.reset();
                    toast.success("¡Producto creado con éxito!");
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    error.response.data.errors.forEach(err => toast.error(err));
                } else {
                    toast.error("Error: No se pudo completar la solicitud.");
                }
            });
    };

    return (
        <div>
            <Page page="Crear Producto" />
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <h1 className="mb-4">Publicar Producto</h1>
                    <div className="row">
                        {/* Barra lateral en la izquierda */}
                        <Sidebar />

                        {/* Contenido Principal */}
                        <div className="col-lg-9">
                            <div className="container text-center">
                                <div className="bg-light rounded p-5">
                                    <h2 className="mb-4">Producto nuevo</h2>
                                    <form onSubmit={handleSubmit} className="w-75 mx-auto">
                                        <input name='name' type="text" className='form-control border-0 py-3 mb-4' placeholder="Nombre del producto" />
                                        <textarea name='description' className='form-control border-0 py-3 mb-4' placeholder="Descripción del producto"></textarea>
                                        <input name='price' type="number" className='form-control border-0 py-3 mb-4' placeholder="Precio" />
                                        <input name='stock' type="number" className='form-control border-0 py-3 mb-4' placeholder="Stock" />
                                        <input name='size' type="text" className='form-control border-0 py-3 mb-4' placeholder="Tamaño" />
                                        <input name='color' type="text" className='form-control border-0 py-3 mb-4' placeholder="Color" />
                                        <select name='gender' className='form-control border-0 py-3 mb-4'>
                                            <option value="">Seleccionar género</option>
                                            <option value="Hombre">Hombre</option>
                                            <option value="Mujer">Mujer</option>
                                            <option value="Unisex">Unisex</option>
                                        </select>
                                        <input name='image' type="file" className='form-control border-0 py-3 mb-4' />
                                        <select name='category' className='form-control border-0 py-3 mb-4'>
                                            <option value="">Seleccionar categoría</option>
                                            {categories.map(category => (
                                                <option key={category._id} value={category._id}>{category.name}</option>
                                            ))}
                                        </select>
                                        <button type="submit" className="w-50 btn form-control border-secondary py-3 bg-white text-secondary">Publicar Producto</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
