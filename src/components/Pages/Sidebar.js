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
                        <Link to="/order-history" className="d-block py-2 text-dark">Historial de Pedidos</Link>
                    </li>
                    <li>
                        <Link to="/account-settings" className="d-block py-2 text-dark">Configuraciones de Cuenta</Link>
                    </li>
                    <li>
                        <Link to="/products" className="d-block py-2 text-dark">Mis productos</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
