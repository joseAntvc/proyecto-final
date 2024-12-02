import React, { useState } from "react";
import Page from "../elements/Page";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validate = (data) => {
    const errorMessages = [];

    if (!data.name.trim()) errorMessages.push("El nombre es obligatorio.");
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email))
      errorMessages.push("El correo electrónico no es válido.");
    if (!data.message.trim())
      errorMessages.push("El mensaje no puede estar vacío.");

    return errorMessages;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate(formData);

    if (errors.length > 0) {
      errors.forEach((error) =>
        toast.error(error, { position: "top-right" })
      );
      return;
    }

    toast.success("Formulario enviado con éxito", {
      position: "top-right",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <Page page="Contacto" />
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12">
                <div className="text-center mx-auto" style={{ maxWidth: "700px" }}>
                  <h1 className="text-primary">Contáctanos</h1>
                  <p className="mb-4">
                    Hola: {localStorage.getItem('user') 
                    ? JSON.parse(localStorage.getItem('user')).user 
                    : 'invitado'}, le damos la bienvenida al Soporte de Forests
                </p>
                </div>
              </div>
              <div className="col-lg-7">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    className="w-100 form-control border-0 py-3 mb-4"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    className="w-100 form-control border-0 py-3 mb-4"
                    placeholder="Tu correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <textarea
                    name="message"
                    className="w-100 form-control border-0 mb-4"
                    rows="5"
                    placeholder="Tu mensaje"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  <button
                    className="w-100 btn form-control border-secondary py-3 bg-white text-primary"
                    type="submit"
                  >
                    Enviar
                  </button>
                </form>
              </div>
              <div className="col-lg-5">
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Dirección</h4>
                    <p className="mb-2">123 Calle Nueva York, EE.UU.</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-envelope fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Correo</h4>
                    <p className="mb-2">forest@forest.gob.com</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded bg-white">
                  <i className="fa fa-phone-alt fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Teléfono</h4>
                    <p className="mb-2">(+012) 3456 7890</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
