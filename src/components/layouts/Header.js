import React, { useState, useContext } from 'react'
import Search from '../elements/Search';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext'
import { AuthContext } from '../../context/AuthContext'

function Header() {
    const { quantityCart } = useContext(CartContext);
    const { isLogIn, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header>
            <div className="container-fluid fixed-top">
                <div className="container topbar bg-primary d-none d-lg-block">
                    <div className="d-flex justify-content-between">
                        <div className="top-info ps-2">
                            <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary"></i> <Link to="#" className="text-white">123 Street, New York</Link></small>
                            <small className="me-3"><i className="fas fa-envelope me-2 text-secondary"></i><Link to="#" className="text-white">Email@Example.com</Link></small>
                        </div>
                        <div className="top-link pe-2">
                            <Link to="#" className="text-white"><small className="text-white mx-2">Privacy Policy</small>/</Link>
                            <Link to="#" className="text-white"><small className="text-white mx-2">Terms of Use</small>/</Link>
                            <Link to="#" className="text-white"><small className="text-white ms-2">Sales and Refunds</small></Link>
                        </div>
                    </div>
                </div>
                <div className="container px-0">
                    <nav className="navbar navbar-light bg-white navbar-expand-xl">
                        <Link to="/" className="navbar-brand"><h1 className="text-primary display-6">Forests</h1></Link>
                        <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="fa fa-bars text-primary"></span>
                        </button>
                        <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                            <div className="navbar-nav mx-auto">
                                <Link to="/" className="nav-item nav-link active">Home</Link>
                                <Link to="/shop" className="nav-item nav-link">Shop</Link>
                                <div className="nav-item dropdown">
                                    <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
                                    <div className="dropdown-menu m-0 bg-secondary rounded-0">
                                        <Link to="/checkout" className="dropdown-item">Checkout</Link>
                                        <Link to="/testimonial" className="dropdown-item">Testimonial</Link>
                                    </div>
                                </div>
                                <Link to="/contact" className="nav-item nav-link">Contact</Link>
                            </div>
                            <div className="d-flex m-3 me-0">
                                <button className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search text-primary"></i></button>
                                <Link to="/cart" className="position-relative me-4 my-auto">
                                    <i className="fa fa-shopping-bag fa-2x"></i>
                                    <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style={{ top: '-5px', left: '15px', height: '20px', minWidth: '20px' }}>{quantityCart()}</span>
                                </Link>
                                {isLogIn ? (
                                    <div className="dropdown" onMouseLeave={() => setIsOpen(false)}>
                                        <button
                                            className="btn btn-secondary dropdown-toggle text-primary"
                                            onClick={toggleDropdown}
                                            style={{ background: "none", border: "none" }}
                                        >
                                            <i className="fas fa-user fa-2x text-primary"></i>
                                        </button>
                                        {isOpen && (
                                            <div className="dropdown-menu show">
                                                <Link className="dropdown-item" to="/profile">
                                                    Mi perfil
                                                </Link>
                                                <Link className="dropdown-item" to="/public">
                                                    Mis poductos
                                                </Link>
                                                <Link className="dropdown-item" to="/settings">
                                                    Configuración
                                                </Link>
                                                <Link className="dropdown-item" to="/address">
                                                    Mis Direcciones
                                                </Link>
                                                <button className="dropdown-item" onClick={logout}>
                                                    Cerrar sesión
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        <Link to="/login" className="btn btn-primary me-2">Iniciar Sesión</Link>
                                        <Link to="/register" className="btn btn-secondary">Crear cuenta</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            <Search />
        </header>
    );
}

export default Header;