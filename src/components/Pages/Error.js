import React from 'react'
import Page from '../elements/Page'
import { Link } from 'react-router-dom';


function Error() {

    window.scrollTo(0, 0);
    
    return (
        <div>
            <Page page="404 Error" />
            <div className="container-fluid py-5">
                <div className="container py-5 text-center">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <i className="bi bi-exclamation-triangle display-1 text-secondary"></i>
                            <h1 className="display-1">404</h1>
                            <h1 className="mb-4">Pagina no encontrada</h1>
                            <p className="mb-4">Lo sentimos, ¡la página que has buscado no existe en nuestro sitio web! ¿Quizás ir a nuestra página de inicio o intentar utilizar una búsqueda?</p>
                            <Link className="btn border-secondary rounded-pill py-3 px-5" to="/">Regresar al home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Error;
