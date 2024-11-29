import React, { useEffect, useState } from 'react'
import Page from '../elements/Page'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../elements/Spinner'

function Shop() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const itemsForPage = 15;

    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            try {
                let productsUrl = selectedCategory
                    ? `http://localhost:3000/api/products/category/${selectedCategory._id}` : 'http://localhost:3000/api/products';

                const [productsResponse, categoriesResponse] = await Promise.all([
                    axios.get(productsUrl),
                    axios.get('http://localhost:3000/api/categories/count')
                ]);
                setProducts(productsResponse.data);
                setCategories(categoriesResponse.data.categories);
                setTotal(categoriesResponse.data.total);
            } catch (error) {
                console.error('Error fetching productos:', error);
            } finally {
                setLoading(false); // Ocultar spinner una vez que se haya terminado de cargar
            }
        };

        fetchProductsAndCategories();
    }, [selectedCategory]);

    const indexOfLastItem = currentPage * itemsForPage; //Es el indice del ultimo producto
    const indexOfFirstItem = indexOfLastItem - itemsForPage; //Para ver el primer indice, podria ser 0 - 11 o asi
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem); //Muestra los productos del primero al ultimo indice 0 - 10

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const totalPages = Math.ceil(products.length / itemsForPage);//Para el numero de paginaciones

    const handleCategorySelect = (category) => {
        if (category === null) {
            setSelectedCategory(null);  // Muestra todos los productos
        } else {
            setSelectedCategory(category);  // Muestra los productos de la categoría seleccionada
        }
        setCurrentPage(1);  // Resetear la página al cambiar de categoría
    };

    useEffect(() => {
        const productItems = document.querySelectorAll('.fade-in');
        productItems.forEach((item) => {
            item.classList.add('visible');
        });
    }, [currentProducts]);

    return (
        <div>
            <Page page="Shop" />
            <div className="container-fluid fruite py-5">
                <div className="container py-5">
                    <h1 className="mb-4">Productos</h1>
                    <div className="row g-4">
                        <div className="col-lg-12">
                            <div className="row g-4">
                                <div className="col-xl-3">
                                    <div className="input-group w-100 mx-auto d-flex">
                                        <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                        <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                                    </div>
                                </div>
                                <div className="col-6"></div>
                                <div className="col-xl-3">
                                    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                        <label htmlFor="fruits">Ordenacion: </label>
                                        <select id="fruits" name="fruitlist" className="border-0 form-select-sm bg-light me-3" form="fruitform">
                                            <option value="lower">Menor precio</option>
                                            <option value="higher">Mayor precio</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-lg-3">
                                    <div className="row g-4">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4>Categorias</h4>
                                                {loading ? (
                                                    <Spinner />
                                                ) : (
                                                    <ul className="list-unstyled fruite-categorie fade-in">
                                                        <li onClick={() => handleCategorySelect(null)}>
                                                            <div className="d-flex justify-content-between fruite-name">
                                                                <Link to="#" className={selectedCategory === null ? 'text-warning' : ''}><i className="fa fa-tshirt me-2"></i>All</Link><span>({total})</span>
                                                            </div>
                                                        </li>
                                                        {categories.map((category) => (
                                                            <li key={category._id} onClick={() => handleCategorySelect(category)}>
                                                                <div className="d-flex justify-content-between fruite-name">
                                                                    <Link to="#" className={selectedCategory && selectedCategory._id === category._id ? 'text-warning' : ''}><i className="fa fa-tshirt me-2"></i>{category.name}</Link><span>({category.productCount})</span>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="position-relative">
                                                <img src="img/banner-clothes.png" className="img-fluid w-100 rounded" alt="" />
                                                <div className="position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                                                    <h3 className="text-secondary fw-bold text-white">Fresh <br /> Cool <br /> Clothes</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    {loading ? (
                                        <Spinner />
                                    ) : (
                                        <div className="row g-4 justify-content-center">
                                            {currentProducts.map((product) => (
                                                <div className="col-md-6 col-lg-6 col-xl-4 fade-in" key={product._id} style={{ maxHeight: '500px' }} >
                                                    <div className="rounded position-relative fruite-item">
                                                        <div className="fruite-img">
                                                            <img src={"img/" + product.images[0]} className="img-fluid rounded-top" alt={product.name} />
                                                        </div>
                                                        <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: '10px', left: '10px' }}>{product.category.name}</div>
                                                        <div className="p-4 border border-secondary border-top-0 rounded-bottom text-product">
                                                            <h4>{product.name}</h4>
                                                            <div className="d-flex justify-content-between flex-lg-wrap align-items-center">
                                                                <p className="text-dark fs-5 fw-bold mb-0">${product.price}</p>
                                                                <div className='d-flex gap-2'>
                                                                    <Link to={`/shop_details/${product._id}`} className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-search text-primary"></i></Link>
                                                                    <Link to="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-list text-primary"></i></Link>
                                                                    <Link to="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag text-primary"></i></Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="col-12">
                                                <div className="pagination d-flex justify-content-center mt-5">
                                                    {/* Se declara la flecha para ir hacia atras */}
                                                    <Link to="#" className="rounded" onClick={(e) => {
                                                        e.preventDefault();
                                                        if (currentPage > 1) paginate(currentPage - 1);
                                                    }}>
                                                        &laquo;
                                                    </Link>
                                                    {[...Array(totalPages)].map((_, index) => (
                                                        <Link to="#" key={index} className={`rounded ${currentPage === index + 1 ? 'active' : ''}`} onClick={(e) => {
                                                            e.preventDefault();
                                                            paginate(index + 1);
                                                        }} >
                                                            {index + 1}
                                                        </Link>
                                                    ))}
                                                    {/* Se declara la flecha para ir hacia delante */}
                                                    <Link to="#" className="rounded" onClick={(e) => {
                                                        e.preventDefault();
                                                        if (currentPage < totalPages) paginate(currentPage + 1);
                                                    }}>
                                                        &raquo;
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop;
