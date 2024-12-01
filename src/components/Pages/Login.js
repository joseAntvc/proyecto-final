import React, { useContext } from 'react'
import Page from '../elements/Page';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

function Fomulario() {

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    
    const validate = (data) => {
        const errorMessages = [];

        // Validación del correo electrónico
        if (!data.username.trim()) errorMessages.push("El usuario es obligatorio.");

        // Validación de la contraseña
        if (!data.password.trim()) errorMessages.push("La contraseña es obligatoria.");

        return errorMessages;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {};
        data["username"] = e.target.username.value;
        data["password"] = e.target.password.value;

        const validationErrors = validate(data);

        if (validationErrors.length > 0) {
            validationErrors.forEach((error) => toast.error(error));
            return;
        }

        const url = "http://localhost:3000/api/users/login";
        axios.post(url, data)
            .then((response) => {
                if (response.status === 200) {
                    // Éxito en el registro
                    login(response.data)
                    e.target.reset();
                    toast.success("¡Se a iniciado con éxito!");
                    navigate('/');
                }
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 400) {
                        const errorMessage = error.response.data;
                        toast.error(errorMessage);
                    }
                } else {
                    toast.error("Error: No se pudo completar la solicitud.");
                }
            });
    };

    return (
        <div>
            <Page page="Iniciar sesión" />
            <div className="container-fluid py-4">
                <div className="container text-center">
                    <div className="row justify-content-center ">
                        <div className="col-lg-6 bg-light rounded p-5">
                            <i className="fas fa-user-circle display-1 text-primary"></i>
                            <h1 className="mb-4">Iniciar sesión</h1>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <form onSubmit={handleSubmit} className="w-75">
                                    <input name='username' type="text" className='w-100 form-control border-0 py-3 mb-4' placeholder="Nombre de usuario" />
                                    <input name='password' type="password" className='w-100 form-control border-0 py-3 mb-4' placeholder="Contraseña" />
                                    <button className="w-50 btn form-control border-primary py-3 bg-white text-primary " type="submit">Continuar</button>
                                </form>
                            </div>
                            <div className="container text-center mt-5">
                                <span className="d-block">Si tu no tienes una cuenta</span>
                                <Link className="d-block text-warning" to="/Register">Crear cuenta</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Fomulario;
