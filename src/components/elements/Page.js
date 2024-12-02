import React from 'react'
import { Link } from 'react-router-dom';

function Page({ page }) {
    return (
        <div className="container-fluid page-header py-5">
            <h1 className="text-center text-white display-6">{ page }</h1>
            <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                { (page === "Detalles del producto") ?  
                <li className="breadcrumb-item"><Link to="/shop">Productos</Link></li>:""}
                <li className="breadcrumb-item active text-white">{ page }</li>
            </ol>
        </div>
    )
}
export default Page;
