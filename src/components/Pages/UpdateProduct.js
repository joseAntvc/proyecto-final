import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Page from "../elements/Page";
import Sidebar from "./Sidebar";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    size: "",
    color: "",
    gender: "",
    category: "",
    image: null,
  });

  // Función de validación
  const validate = (data) => {
    const errorMessages = [];

    if (!data.name.trim())
      errorMessages.push("El nombre del producto es obligatorio.");
    if (!data.description.trim())
      errorMessages.push("La descripción es obligatoria.");
    if (!data.price || isNaN(data.price) || data.price <= 0)
      errorMessages.push("El precio debe ser un número válido y mayor a 0.");
    if (!data.stock || isNaN(data.stock) || data.stock < 0)
      errorMessages.push(
        "El stock debe ser un número válido y no puede ser negativo."
      );
    if (!data.size.trim()) errorMessages.push("El tamaño es obligatorio.");
    if (!data.color.trim()) errorMessages.push("El color es obligatorio.");
    if (!data.gender) errorMessages.push("Debes seleccionar un género.");
    if (!data.image) errorMessages.push("Debes seleccionar una imagen.");
    if (!data.category) errorMessages.push("Debes seleccionar una categoría.");

    return errorMessages;
  };

  // Cargar categorías y datos del producto
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://54.226.228.162:3000/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        toast.error("Error al cargar categorías.");
      }
    };

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://54.226.228.162:3000/api/products/detail/${id}`
        );
        const product = response.data;
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          size: product.size,
          color: product.color,
          gender: product.gender,
          category: product.category._id,
          image: null, // No precargamos la imagen
        });
      } catch (error) {
        toast.error("Error al cargar el producto.");
        navigate("/my_products"); // Redirigir en caso de error
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un FormData para enviar al servidor
    const formData = new FormData();
        const user = JSON.parse(localStorage.getItem("user"));
        const idUser = user?.id;
        formData.append("userId", idUser);
        formData.append("name", e.target.name.value);
        formData.append("description", e.target.description.value);
        formData.append("price", e.target.price.value);
        formData.append("stock", e.target.stock.value);
        formData.append("size", e.target.size.value);
        formData.append("color", e.target.color.value);
        formData.append("gender", e.target.gender.value);
        formData.append("image", e.target.image.files[0]);
        formData.append("category", e.target.category.value);

    // Validar datos antes de enviar
    const validationErrors = validate(
      Object.fromEntries(formData.entries())
    );
    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => toast.error(error));
      return;
    }

    try {
      const response = await axios.put(
        `http://54.226.228.162:3000/api/products/update/${id}`,formData,{ 
            headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("¡Producto actualizado con éxito!");
        navigate('/my_products');
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        error.response.data.errors.forEach((err) => toast.error(err));
      } else {
        toast.error("Error: No se pudo completar la solicitud.");
      }
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <Page page="Actualizar Producto" />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <h1 className="mb-4">Actualizar Producto</h1>
          <div className="row">
            <Sidebar />
            <div className="col-lg-9">
              <div className="container text-center">
                <div className="bg-light rounded p-5">
                  <h2 className="mb-4">Editar Producto</h2>
                  <form onSubmit={handleSubmit} className="w-75 mx-auto">
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control border-0 py-3 mb-4"
                      placeholder="Nombre del producto"
                    />
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="form-control border-0 py-3 mb-4"
                      placeholder="Descripción del producto"
                    ></textarea>
                    <input
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      className="form-control border-0 py-3 mb-4"
                      placeholder="Precio"
                    />
                    <input
                      name="stock"
                      type="number"
                      value={formData.stock}
                      onChange={handleChange}
                      className="form-control border-0 py-3 mb-4"
                      placeholder="Stock"
                    />
                    <input
                      name="size"
                      type="text"
                      value={formData.size}
                      onChange={handleChange}
                      className="form-control border-0 py-3 mb-4"
                      placeholder="Tamaño"
                    />
                    <input
                      name="color"
                      type="text"
                      value={formData.color}
                      onChange={handleChange}
                      className="form-control border-0 py-3 mb-4"
                      placeholder="Color"
                    />
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="form-control border-0 py-3 mb-4 bg-white"
                    >
                      <option value="">Seleccionar género</option>
                      <option value="Hombre">Hombre</option>
                      <option value="Mujer">Mujer</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                    <input
                      name="image"
                      type="file"
                      onChange={handleChange}
                      className="form-control border-0 py-3 mb-4 bg-white"
                    />
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="form-control border-0 py-3 mb-4 bg-white"
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="w-50 btn form-control border-secondary py-3 bg-white text-secondary"
                    >
                      Actualizar Producto
                    </button>
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
