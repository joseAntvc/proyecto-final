import React, { useEffect, useState } from 'react';
import Page from '../elements/Page';
import axios from 'axios';
import Spinner from '../elements/Spinner';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';

function UserProfile() {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user?.id;
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        phone: '',
        address: {
            street: '',
            city: '',
            country: '',
            postalCode: '',
        },
        billing: {
            company: '',
            email: '',
            phone: '',
            address: '', // Se guarda el ID de la dirección de facturación
        }
    });
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar la edición
    const [originalData, setOriginalData] = useState(null); // Guarda los datos originales para cancelar
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return; // Verificar si el id está presente

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/users/profile/${id}`);
                const userDataFromApi = {
                    firstName: response.data.name,
                    lastName: response.data.last_name,
                    email: response.data.email,
                    username: response.data.username,
                    phone: response.data.phone,
                };
                setUserData(userDataFromApi);
                setOriginalData(userDataFromApi);

                // setOrderHistory(response.data.orderHistory); // Descomenta si necesitas el historial de pedidos
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const field = name.split('.')[1];
            setUserData((prevData) => ({
                ...prevData,
                address: {
                    ...prevData.address,
                    [field]: value,
                },
            }));
        } else if (name.startsWith('billing.')) {
            const field = name.split('.')[1];
            setUserData((prevData) => ({
                ...prevData,
                billing: {
                    ...prevData.billing,
                    [field]: value,
                },
            }));
        } else {
            setUserData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!id) return; // Verifica si el id está presente

        try {
            const response = await axios.put(`http://localhost:3001/api/users/profile/${id}`, userData);
            if (response.status === 200) {
                toast.success('Perfil actualizado correctamente.');
                setIsEditing(false); // Salir del modo edición
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Error al actualizar el perfil.');
        }
    };

    const handleCancel = () => {
        setUserData(originalData); // Restaura los datos originales
        setIsEditing(false);
    };

    return (
        <div>
            <Page page="Perfil del usuario" />
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <h1 className="mb-4">Perfil del Usuario</h1>
                    <div className="row">
                        {/* Menú Lateral */}
                        <Sidebar/>

                        {/* Contenido Principal */}
                        <div className="col-lg-9">
                            {loading ? (
                                <Spinner />
                            ) : (
                                <div>
                                    {/* Sección Perfil */}
                                    <div id="profile" className="mb-5">
                                        <h3>Mi Perfil</h3>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label className="form-label"><strong>Nombre</strong></label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        className="form-control"
                                                        value={userData.firstName || ''}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                ) : (
                                                    <p>{userData.firstName} {userData.lastName}</p>
                                                )}
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label"><strong>Correo Electrónico</strong></label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        className="form-control"
                                                        value={userData.email || ''}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                ) : (
                                                    <p>{userData.email}</p>
                                                )}
                                            </div>

                                            <div className="mb-3">
                                                <label className="form-label"><strong>Username</strong></label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="company"
                                                        className="form-control"
                                                        value={userData.username|| ''}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                ) : (
                                                    <p>{userData.username}</p>
                                                )}
                                            </div>

                                            <div className="mb-3">
                                            <label className="form-label"><strong>Teléfono</strong></label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    className="form-control"
                                                    value={userData.phone}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            ) : (
                                                <p>{userData.phone}</p>
                                            )}
                                        </div>

                                        <div className="mt-4">
                                                {!isEditing ? (
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        onClick={() => setIsEditing(true)}
                                                    >
                                                        Editar Perfil
                                                    </button>
                                                ) : (
                                                    <div>
                                                        <button type="submit" className="btn btn-success me-2">
                                                            Guardar Cambios
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary"
                                                            onClick={handleCancel}
                                                        >
                                                            Cancelar
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
