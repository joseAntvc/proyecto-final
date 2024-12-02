import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar"; // Importa tu componente de Sidebar
import ToastNotification from '../elements/ToastNotification';
import Page from '../elements/Page';

const AddressForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id; // Recuperar el ID del usuario desde el localStorage
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Obtener las direcciones del usuario al cargar el componente
  useEffect(() => {
    if (!userId) return; // Verifica si el ID del usuario existe
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/addresses/${userId}`);
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, [userId]);

  // Eliminar una dirección por ID
  const deleteAddress = async (addressId) => {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:3000/api/users/addresses/${userId}/${addressId}`);
      setAddresses(addresses.filter(address => address.id !== addressId));
    } catch (error) {
      console.error("Error deleting address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Page page="Direcciones" />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <h1 className="mb-4">Mis direcciones</h1>

          <div className="row">
            <Sidebar />
            <div className="col-lg-9">
              <div className="address-cards">
                <h2>Direcciones Guardadas</h2>
                {addresses.length > 0 ? (
                  addresses.map((address) => (
                    <div className="card mb-3" key={address.id}>
                      <p><strong>Calle:</strong> {address.street}</p>
                      <p><strong>Ciudad:</strong> {address.city}</p>
                      <p><strong>País:</strong> {address.country}</p>
                      <p><strong>Código Postal:</strong> {address.postal_code}</p>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteAddress(address.id)}
                        disabled={isLoading}
                      >
                        {isLoading ? "Eliminando..." : "Eliminar"}
                      </button>
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
