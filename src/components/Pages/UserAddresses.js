import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar"; // Importa tu componente de Sidebar
import ToastNotification from '../elements/ToastNotification';
import Page from '../elements/Page';


const AddressForm = ({ userId }) => {
  const [addresses, setAddresses] = useState([]);
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    country: "",
    cp: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Obtener lista de países al cargar el componente
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryList = response.data.map((country) => country.name.common);
        setCountries(countryList.sort()); // Ordenar alfabéticamente
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // Obtener las direcciones del usuario al cargar el componente
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`http://localhost/3001/api/addresses/${userId}`);
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, [userId]);

  // Manejar los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/addresses", {
        ...formData,
        userId,
      });
      setAddresses([...addresses, response.data]); // Agregar la nueva dirección a la lista
      setFormData({ street: "", city: "", country: "", cp: "" }); // Limpiar el formulario
    } catch (error) {
      console.error("Error adding address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
        <Page page="Direcciones" />
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <h1 className="mb-4">Agregar Dirección</h1>

                    <div className="row">
                        <Sidebar />
                        <div className="col-lg-9">
                            <div className="container text-center">
                                <div className="bg-light rounded p-5">
                                    <h2 className="mb-4">Nueva Dirección</h2>

                                    <form onSubmit={handleSubmit} className="w-75 mx-auto">
                                        {/* Campo: Calle */}
                                            <input
                                                type="text"
                                                name="street"
                                                className="form-control border-0 py-3 mb-4"
                                                value={formData.street}
                                                onChange={handleChange}
                                                placeholder="Calle"
                                                required
                                            />
                                        {/* Campo: Ciudad */}
                                            <input
                                                type="text"
                                                name="city"
                                                className="form-control border-0 py-3 mb-4"
                                                value={formData.city}
                                                onChange={handleChange}
                                                placeholder="Ciudad"
                                                required
                                            />
                                        {/* Campo: País */}
                                            <select
                                                name="country"
                                                className="form-control border-0 py-3 mb-4"
                                                value={formData.country}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="" disabled>
                                                    Selecciona un país
                                                </option>
                                                {countries.map((country, index) => (
                                                    <option key={index} value={country}>
                                                        {country}
                                                    </option>
                                                ))}
                                            </select>

                                        {/* Campo: Código Postal */}
                                            <input
                                                type="text"
                                                name="cp"
                                                className="form-control border-0 py-3 mb-4"
                                                value={formData.cp}
                                                onChange={handleChange}
                                                placeholder="Código Postal"
                                                required
                                            />

                                        {/* Botón de envío */}
                                        <button
                                            type="submit"
                                            className="w-50 btn form-control border-secondary py-3 bg-white text-secondary"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Guardando..." : "Agregar Dirección"}
                                        </button>
                                    </form>

                                </div>
                            </div>
                            <div className="address-cards">
                            <h2>Direcciones Guardadas</h2>
                            {addresses.length > 0 ? (
                                addresses.map((address, index) => (
                                <div className="card" key={index}>
                                    <p><strong>Calle:</strong> {address.street}</p>
                                    <p><strong>Ciudad:</strong> {address.city}</p>
                                    <p><strong>País:</strong> {address.country}</p>
                                    <p><strong>Código Postal:</strong> {address.cp}</p>
                                </div>
                                ))
                            ) : (
                                <p>No hay direcciones guardadas aún.</p>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <ToastNotification />
    </div>
    
  );
};

export default AddressForm;
