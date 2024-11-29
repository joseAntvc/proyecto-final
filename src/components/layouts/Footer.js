import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer>
            <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-4">
                <div className="container py-5">
                    <div className="pb-4 mb-4" style={{ borderBottom: '1px solid rgba(226, 175, 24, 0.5)' }}>
                        <div className="row g-4 justify-content-between">
                            <div className="col-lg-3">
                                <Link to="#">
                                    <h1 className="text-primary mb-0">Forests</h1>
                                    <p className="text-secondary mb-0">Nuevos productos</p>
                                </Link>
                            </div>
                            <div className="col-lg-3">
                                <div className="d-flex justify-content-end pt-3">
                                    <Link className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle"><i className="fab fa-twitter"></i></Link>
                                    <Link className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"><i className="fab fa-facebook-f"></i></Link>
                                    <Link className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"><i className="fab fa-youtube"></i></Link>
                                    <Link className="btn btn-outline-secondary btn-md-square rounded-circle"><i className="fab fa-linkedin-in"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-item">
                                <h4 className="text-light mb-3">¡Porque la gente nos elige!</h4>
                                <p className="mb-4 text-justify">Somos una tienda de productos que intenta estar a la moda, con ello estamos
                                    en la vanguardia de los estilos mas nuevo de lo que quieras, ya sea ropa, muebles, electrodomesticos y más</p>
                                <Link to="/contact" className="btn border-secondary py-2 px-4 rounded-pill text-primary">Leer más</Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="d-flex flex-column text-start footer-item">
                                <h4 className="text-light mb-3">Información de la Tienda</h4>
                                <Link className="btn-link" to="">Sobre Nosotros</Link>
                                <Link className="btn-link" to="">Contáctanos</Link>
                                <Link className="btn-link" to="">Política de Privacidad</Link>
                                <Link className="btn-link" to="">Términos y Condiciones</Link>
                                <Link className="btn-link" to="">Política de Devoluciones</Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="d-flex flex-column text-start footer-item">
                                <h4 className="text-light mb-3">Cuenta</h4>
                                <Link className="btn-link" to="">Mi Cuenta</Link>
                                <Link className="btn-link" to="/cart">Carrito de Compras</Link>
                                <Link className="btn-link" to="">Historial de Pedidos</Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-item">
                                <h4 className="text-light mb-3">Contacto</h4>
                                <p>Dirección: 1429 Netus Rd, NY 48247</p>
                                <p>Correo: Ejemplo@gmail.com</p>
                                <p>Teléfono: +0123 4567 8910</p>
                                <p>Pagos Aceptados</p>
                                <img src="img/payment.png" className="img-fluid" alt="Métodos de Pago" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
