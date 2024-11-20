import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //Para poder usar rutas
import Header from "./components/layouts/Header"; //Componente de la barra de navegacion
import Footer from "./components/layouts/Footer"; //Componente de la 
import Index from "./components/Pages/Index"; //Componente del carusel del index
import Shop from "./components/Pages/Shop"; //Pagina de productos
import ShopDetails from "./components/Pages/ShopDetails"; //Pagina de detalle de productos
import Cart from "./components/Pages/Cart";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes> 
          <Route path="/" element={<Index/>} /> #!Ruta principal
          <Route path="/shop" element={<Shop/>}/> #!Ruta de productos
          <Route path="/shop_details" element={<ShopDetails/>}/> #!Detalle de los productos
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
