import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //Para poder usar rutas
//Layouts componentes
import Header from "./components/layouts/Header"; //Componente de la barra de navegacion
import Footer from "./components/layouts/Footer"; //Componente de la 
import ToastNotificaction from './components/elements/ToastNotification' //Los mensajes
//Componentes de la vista
import Index from "./components/Pages/Index";
import Shop from "./components/Pages/Shop";
import ShopDetails from "./components/Pages/ShopDetails";
import Cart from "./components/Pages/Cart";
import Checkout from "./components/Pages/Checkout"
import Contact from "./components/Pages/Contact";
import Error from "./components/Pages/Error"
import Login from "./components/Pages/Login"
import Register from "./components/Pages/Register"
import Testimonial from "./components/Pages/Testimonial"
import MyAddress from "./components/Pages/MyAddress";
import CreateProduct from "./components/Pages/PublicProduct";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import UserProfile from "./components/Pages/UserProfile";
import OrderHistory from "./components/Pages/OrderHistory";
import UserAddresses from "./components/Pages/UserAddresses"
import MyProducts from "./components/Pages/MyProducts";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Index />} /> {/* Ruta principal*/}
              <Route path="/shop" element={<Shop />} /> {/*Ruta de productos*/}
              <Route path="/shop_details/:id" element={<ShopDetails />} /> {/*Detalle de los productos*/}
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/testimonial" element={<Testimonial />} />
              <Route path="/address" element={<MyAddress />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/public" element={<CreateProduct />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/order_history" element={<OrderHistory />} />
              <Route path="/my_addresses" element={<UserAddresses />} /> {/*Ruta para ver las direcciones del usuario*/}
              <Route path="/my_products" element={<MyProducts />} />
              {/*Se redirigira a la pagina cuando se quiera acceder a algo que no*/}
              <Route path="*" element={<Error />} />
            </Routes>
            <ToastNotificaction />
            <Footer />
          </Router>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
