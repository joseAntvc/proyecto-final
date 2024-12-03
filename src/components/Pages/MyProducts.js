import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import Page from "../elements/Page";
import Spinner from "../elements/Spinner";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function MyProducts() {
    const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?.id;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const userId = id;

  console.log(products)

  // Cargar productos del usuario desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      window.scrollTo(0, 0);
      try {
        const response = await axios.get(
          `http://54.226.228.162:3000/api/products/user/${userId}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [userId]);

  const handleDelete = async (productId) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    });
  
    if (confirm.isConfirmed) {
      try {
        //userId
        await axios.delete(`http://54.226.228.162:3000/api/products/delete/${productId}?userId=${userId}`);
        
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.product_id?._id !== productId)
        );
  
        toast.success("El producto ha sido eliminado con éxito.");
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        toast.error("Hubo un problema al eliminar el producto. Por favor, intenta nuevamente.");
      }
    }
  };

  const handleEdit = (productId) => {
    const product = products.find(p => p.product_id._id === productId)?.product_id;
    if (product) {
        navigate(`/update/${productId}`, { state: { product } });
    }
};

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
                      {products.map((p) => {
                        // Verifica si `product_id` y sus propiedades existen antes de acceder a ellas
                        const product = p?.product_id;
                        const imageUrl =
                          product?.images?.[0] || "default-image-url.jpg"; // Usa una imagen por defecto si no existe

                        if (!product) {
                          return (
                            <tr key={p._id}>
                            </tr>
                          );
                        }

                        return (
                          <tr key={product._id}>
                            <th>
                              <div className="d-flex align-items-center">
                                <img
                                  src={imageUrl}
                                  className="img-fluid me-3 rounded-circle"
                                  style={{ width: "80px", height: "80px" }}
                                  alt={product.name || "Producto"}
                                />
                              </div>
                            </th>
                            <td>{product.name || "N/A"}</td>
                            <td>${product.price?.toLocaleString() || "N/A"}</td>
                            <td>{product.category?.name || "N/A"}</td>
                            <td>{product.stock || "N/A"}</td>
                            <td>
                              <div className="d-flex gap-4">
                                <button
                                  onClick={() => handleEdit(product._id)}
                                  className="btn btn-md rounded-circle bg-light border"
                                >
                                  <i className="fa fa-pen text-warning"></i>
                                </button>
                                <button
                                  onClick={() => handleDelete(product._id)}
                                  className="btn btn-md rounded-circle bg-light border"
                                >
                                  <i className="fa fa-times text-danger"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center mt-4">
                  No tienes productos publicados.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProducts;
