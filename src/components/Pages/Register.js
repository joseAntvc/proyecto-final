import React from 'react'
import Page from '../elements/Page'
import ToastNotificaction from '../elements/ToastNotification'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Register() {

    const validate = (data) => {
        const errorMessages = [];

        // Validación del nombre
        if (!data.name.trim()) errorMessages.push("El nombre es obligatorio.");

        // Validación del apellido
        if (!data.last_name.trim()) errorMessages.push("El apellido es obligatorio.");

        // Validación del nombre de usuario
        if (!data.username.trim()) errorMessages.push("El usuario es obligatorio.");

        // Validación del teléfono
        if (!data.phone.trim()) errorMessages.push("El teléfono es obligatorio.");
        else if (!/^\d{10}$/.test(data.phone.replace(/\s+/g, ''))) errorMessages.push("El teléfono debe ser un número válido de 10 dígitos.");

        // Validación del correo electrónico
        if (!data.email.trim()) errorMessages.push("El correo electrónico es obligatorio.");
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errorMessages.push("El correo electrónico debe tener un formato válido.");

        // Validación de la contraseña
        if (!data.password.trim()) errorMessages.push("La contraseña es obligatoria.");
        else {
            if (data.password.length < 6) errorMessages.push("La contraseña debe tener al menos 6 caracteres.");
            if (!/[A-Z]/.test(data.password)) errorMessages.push("La contraseña debe contener al menos una letra mayúscula.");
            if (!/[a-z]/.test(data.password)) errorMessages.push("La contraseña debe contener al menos una letra minúscula.");
            if (!/[0-9]/.test(data.password)) errorMessages.push("La contraseña debe contener al menos un número.");
        }

        return errorMessages;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {};
        data["name"] = e.target.name.value;
        data["last_name"] = e.target.last_name.value;
        data["username"] = e.target.username.value;
        data["phone"] = e.target.phone.value;
        data["email"] = e.target.email.value;
        data["password"] = e.target.password.value;

        const validationErrors = validate(data);

        if (validationErrors.length > 0) {
            validationErrors.forEach((error) => toast.error(error));
            return;
        }

        const url = "http://localhost:3000/api/users/register";
        axios.post(url, data)
            .then((response) => {
                if (response.status === 200) {
                    // Éxito en el registro
                    e.target.reset();
                    toast.success("¡Usuario registrado con éxito!");
                }
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 400) {
                        error.response.data.errors.forEach((err) => {
                            toast.error(err);
                        });
                    }
                } else {
                    toast.error("Error: No se pudo completar la solicitud.");
                }
            });
    };
    return (
        <div>
            <Page page="Crear cuenta" />
            <div className="container-fluid py-4">
                <div className="container text-center">
                    <div className="row justify-content-center ">
                        <div className="col-lg-6 bg-light rounded p-5">
                            <i className="fas fa-user-circle display-1 text-secondary"></i>
                            <h1 className="mb-4">Crear cuenta</h1>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <form onSubmit={handleSubmit} className="w-75">
                                    <div>
                                        <input name='name' type="text" className='w-100 form-control border-0 py-3 mb-4' placeholder="Tu nombre(s)" />
                                        <input name='last_name' type="text" className='w-100 form-control border-0 py-3 mb-4' placeholder="Tu apellido(s)" />
                                        <input name='username' type="text" className='w-100 form-control border-0 py-3 mb-4' placeholder="Escoge un nombre de usuario" />
                                        <input name='phone' type="text" className='w-100 form-control border-0 py-3 mb-4' placeholder="Tu teléfono" />
                                        <input name='email' type="email" className='w-100 form-control border-0 py-3 mb-4' placeholder="Tu correo electrónico" />
                                        <input name='password' type="password" className='w-100 form-control border-0 py-3 mb-4' placeholder="Tu contraseña" />
                                    </div>
                                    <button className="w-50 btn form-control border-secondary py-3 bg-white text-secondary" type="submit">Continuar</button>
                                </form>
                            </div>
                            <div className="container text-center mt-5">
                                <span className="d-block">Si tienes una cuenta</span>
                                <Link className="d-block" to="/Login">Iniciar sesión</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastNotificaction />
        </div>
    )
}
