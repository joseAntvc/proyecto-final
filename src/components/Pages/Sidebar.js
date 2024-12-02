import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="col-lg-3">
            <div className="bg-light p-4 rounded">
                <h4>Menú</h4>
                <ul className="list-unstyled">
                    <li>
                        <Link to="/profile" className="d-block py-2 text-dark">Mi Perfil</Link>
                    </li>
                    <li>
                        <Link to="/my_addresses" className="d-block py-2 text-dark">Mis Direcciones</Link>
                    </li>
                    <li>
                        <Link to="/order_history" className="d-block py-2 text-dark">Historial de Pedidos</Link>
                    </li>
                    <li>
                        <Link to="/my_products" className="d-block py-2 text-dark">Mis Productos</Link>
                    </li>
                    <li>
                        <Link to="/public" className="d-block py-2 text-dark">Publicar Producto</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
