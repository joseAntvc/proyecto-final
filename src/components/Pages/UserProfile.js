import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import Page from '../elements/Page';
import axios from 'axios';
import Spinner from '../elements/Spinner';
import { toast } from 'react-toastify';

function UserProfile() {
    const { id } = useParams(); // Extrae el parámetro 'id' de la URL
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
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
    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/users/profile/${id}`);
                const userDataFromApi = {
                    firstName: response.data.name,
                    lastName: response.data.last_name,
                    email: response.data.email,
                    company: response.data.billings.company,
                    phone: response.data.phone,
                    address: {
                        street: response.data.addresses.street,
                        city: response.data.addresses.city,
                        country: response.data.addresses.country,
                        postalCode: response.data.addresses.postal_code,
                    },
                    billing: {
                        company: response.data.billings.company,
                        email: response.data.billings.email,
                        phone: response.data.billings.phone,
                        address: response.data.billings.address,
                    },
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
            <Page page="User Profile" />
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <h1 className="mb-4">Perfil del Usuario</h1>
                    <div className="row">
                        {/* Menú Lateral */}
                        <div className="col-lg-3">
                            <div className="bg-light p-4 rounded">
                                <h4>Menú</h4>
                                <ul className="list-unstyled">
                                    <li>
                                        <a href="#profile" className="d-block py-2 text-dark">Mi Perfil</a>
                                    </li>
                                    <li>
                                        <a href="#orderHistory" className="d-block py-2 text-dark">Historial de Pedidos</a>
                                    </li>
                                    <li>
                                        <a href="#accountSettings" className="d-block py-2 text-dark">Configuraciones de Cuenta</a>
                                    </li>
                                    <li>
                                        <a href="#accountSettings" className="d-block py-2 text-dark">Mis productos</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

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
                                                <label className="form-label"><strong>Nombre</strong></label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="company"
                                                        className="form-control"
                                                        value={userData.company|| ''}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                ) : (
                                                    <p>{userData.company}</p>
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

                                        <h4>Dirección</h4>
                                        <div className="mb-3">
                                            <label className="form-label"><strong>Calle</strong></label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="address.street"
                                                    className="form-control"
                                                    value={userData.address.street}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            ) : (
                                                <p>{userData.address.street}</p>
                                            )}
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4 mb-3">
                                                <label className="form-label"><strong>Ciudad</strong></label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="address.city"
                                                        className="form-control"
                                                        value={userData.address.city}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                ) : (
                                                    <p>{userData.address.city}</p>
                                                )}
                                            </div>

                                            <div className="col-md-4 mb-3">
                                                <label className="form-label"><strong>País</strong></label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="address.country"
                                                        className="form-control"
                                                        value={userData.address.country}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                ) : (
                                                    <p>{userData.address.country}</p>
                                                )}
                                            </div>

                                            <div className="col-md-4 mb-3">
                                                <label className="form-label"><strong>Código Postal</strong></label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="address.postalCode"
                                                        className="form-control"
                                                        value={userData.address.postalCode}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                ) : (
                                                    <p>{userData.address.postalCode}</p>
                                                )}
                                            </div>
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

                                    {/* Historial de Pedidos */}
                                    <div id="orderHistory" className="mb-5">
                                        <h3>Historial de Pedidos</h3>
                                        {orderHistory.length > 0 ? (
                                            <ul>
                                                {orderHistory.map((order) => (
                                                    <li key={order._id}>
                                                        <div className="d-flex justify-content-between">
                                                            <span>{order.date}</span>
                                                            <span>{order.totalPrice}</span>
                                                        </div>
                                                        <div>
                                                            {order.products.map((product) => (
                                                                <div key={product._id}>
                                                                    <p>{product.name} - {product.quantity} x ${product.price}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No tienes pedidos realizados.</p>
                                        )}
                                    </div>

                                    {/* Configuraciones de Cuenta */}
                                    <div id="accountSettings">
                                        <h3>Configuraciones de Cuenta</h3>
                                        <p>Desde aquí puedes cambiar tu información personal y de pago.</p>
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
