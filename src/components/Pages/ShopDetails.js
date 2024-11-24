import React, { useEffect, useState } from 'react'
import Page from '../elements/Page'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';

function ShopDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/products/detail/${id}`);
                setProduct(response.data);
            } catch (error) {
                navigate('/error');
            }
        };

        fetchProduct();
    }, [id, navigate]);

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Page page="Shop Details" />
            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="row g-4 mb-5">
                        <div className="col-lg-8 col-xl-9">
                            <div className="row g-4">
                                <div class="col-lg-6">
                                    <div class="border rounded" style={{ height: '100%' }}>
                                        <img src={`${process.env.PUBLIC_URL}/img/${product.images[0]}`} class="img-fluid rounded" alt="Imag" style={{ width: '100%', height: 'auto' }} />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <h4 className="fw-bold mb-3">{product.name}</h4>
                                    <p className="mb-3">Category: {product.categories[0]?.name}</p>
                                    <h5 className="fw-bold mb-3">$ {product.price}</h5>
                                    <div className="d-flex mb-4">
                                        <i className="fa fa-star text-secondary"></i>
                                        <i className="fa fa-star text-secondary"></i>
                                        <i className="fa fa-star text-secondary"></i>
                                        <i className="fa fa-star text-secondary"></i>
                                        <i className="fa fa-star"></i>
                                    </div>
                                    <p className="mb-4">{product.description}</p>
                                    <div className="input-group quantity mb-5" style={{ width: '100px' }}>
                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-minus rounded-circle bg-light border" >
                                                <i className="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <input type="text" className="form-control form-control-sm text-center border-0" value="1" />
                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-plus rounded-circle bg-light border">
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <Link to="#" className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</Link>
                                </div>
                                <div className="col-lg-12">
                                    <nav>
                                        <div className="nav nav-tabs mb-3">
                                            <button className="nav-link active border-white border-bottom-0" type="button" role="tab"
                                                id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                                                aria-controls="nav-about" aria-selected="true">Description</button>
                                            <button className="nav-link border-white border-bottom-0" type="button" role="tab"
                                                id="nav-mission-tab" data-bs-toggle="tab" data-bs-target="#nav-mission"
                                                aria-controls="nav-mission" aria-selected="false">Reviews</button>
                                        </div>
                                    </nav>
                                    <div className="tab-content mb-5">
                                        <div className="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                            <p>{product.description}</p>
                                            <div className="px-2">
                                                <div className="row g-4">
                                                    <div className="col-6">
                                                        <div className="row bg-light align-items-center text-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Weight</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">1 kg</p>
                                                            </div>
                                                        </div>
                                                        <div className="row text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Country of Origin</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">Agro Farm</p>
                                                            </div>
                                                        </div>
                                                        <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Quality</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">Organic</p>
                                                            </div>
                                                        </div>
                                                        <div className="row text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Сheck</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">Healthy</p>
                                                            </div>
                                                        </div>
                                                        <div className="row bg-light text-center align-items-center justify-content-center py-2">
                                                            <div className="col-6">
                                                                <p className="mb-0">Min Weight</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <p className="mb-0">250 Kg</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="nav-mission" role="tabpanel" aria-labelledby="nav-mission-tab">
                                            <div className="d-flex">
                                                <img src="img/avatar.jpg" className="img-fluid rounded-circle p-3" style={{ width: '100px', height: '100px' }} alt="" />
                                                <div className="">
                                                    <p className="mb-2" style={{ fontSize: '14px' }}>April 12, 2024</p>
                                                    <div className="d-flex justify-content-between">
                                                        <h5>Jason Smith</h5>
                                                        <div className="d-flex mb-3">
                                                            <i className="fa fa-star text-secondary"></i>
                                                            <i className="fa fa-star text-secondary"></i>
                                                            <i className="fa fa-star text-secondary"></i>
                                                            <i className="fa fa-star text-secondary"></i>
                                                            <i className="fa fa-star"></i>
                                                        </div>
                                                    </div>
                                                    <p>The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic
                                                        words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <img src="img/avatar.jpg" className="img-fluid rounded-circle p-3" style={{ width: '100px', height: '100px' }} alt="" />
                                                <div className="">
                                                    <p className="mb-2" style={{ fontSize: '14px' }}>April 12, 2024</p>
                                                    <div className="d-flex justify-content-between">
                                                        <h5>Sam Peters</h5>
                                                        <div className="d-flex mb-3">
                                                            <i className="fa fa-star text-secondary"></i>
                                                            <i className="fa fa-star text-secondary"></i>
                                                            <i className="fa fa-star text-secondary"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                        </div>
                                                    </div>
                                                    <p className="text-dark">The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic
                                                        words etc. Susp endisse ultricies nisi vel quam suscipit </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="nav-vision" role="tabpanel">
                                            <p className="text-dark">Tempor erat elitr rebum at clita. Diam dolor diam ipsum et tempor sit. Aliqu diam
                                                amet diam et eos labore. 3</p>
                                            <p className="mb-0">Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam et eos labore.
                                                Clita erat ipsum et lorem et sit</p>
                                        </div>
                                    </div>
                                </div>
                                <form action="#">
                                    <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                                    <div className="row g-4">
                                        <div className="col-lg-6">
                                            <div className="border-bottom rounded">
                                                <input type="text" className="form-control border-0 me-4" placeholder="Yur Name *" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="border-bottom rounded">
                                                <input type="email" className="form-control border-0" placeholder="Your Email *" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="border-bottom rounded my-4">
                                                <textarea name="" id="" className="form-control border-0" cols="30" rows="8" placeholder="Your Review *" spellcheck="false"></textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="d-flex justify-content-between py-3 mb-5">
                                                <div className="d-flex align-items-center">
                                                    <p className="mb-0 me-3">Please rate:</p>
                                                    <div className="d-flex align-items-center" style={{ fontSize: '12px' }}>
                                                        <i className="fa fa-star text-muted"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                    </div>
                                                </div>
                                                <Link to="#" className="btn border border-secondary text-primary rounded-pill px-4 py-3"> Post Comment</Link>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-3">
                            <div className="row g-4 fruite">
                                <div className="col-lg-12">
                                    <h4 className="mb-4">Featured products</h4>
                                    {/* Para ver otros productos */}
                                    <div className="d-flex align-items-center justify-content-start">
                                        <div className="rounded me-4" style={{ width: '100px', height: '100px' }}>
                                            <img src="img/vegetable-item-6.jpg" className="img-fluid rounded" alt="" />
                                        </div>
                                        <div>
                                            <h6 className="mb-2">Big Banana</h6>
                                            <div className="d-flex mb-2">
                                                <i className="fa fa-star text-secondary"></i>
                                                <i className="fa fa-star text-secondary"></i>
                                                <i className="fa fa-star text-secondary"></i>
                                                <i className="fa fa-star text-secondary"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <div className="d-flex mb-2">
                                                <h5 className="fw-bold me-2">2.99 $</h5>
                                                <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center my-4">
                                        <Link to="#" className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">Vew More</Link>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="position-relative">
                                        <img src={ `${process.env.PUBLIC_URL}/img/banner-clothes.png` } className="img-fluid w-100 rounded" alt="" />
                                        <div className="position-absolute" style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                                            <h3 className="text-secondary fw-bold text-white">Fresh <br /> Cool <br /> Clothes</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/** 
                    <h1 class="fw-bold mb-0">Related products</h1>
                    <div class="vesitable"> 
                        <div class="owl-carousel vegetable-carousel justify-content-center">
                            <div class="border border-primary rounded position-relative vesitable-item">
                                <div class="vesitable-img">
                                    <img src="img/vegetable-item-6.jpg" class="img-fluid w-100 rounded-top" alt="" />
                                </div>
                                <div class="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: '10px', right: '10px' }}>Vegetable</div>
                                <div class="p-4 pb-0 rounded-bottom">
                                    <h4>Parsely</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div class="d-flex justify-content-between flex-lg-wrap">
                                        <p class="text-dark fs-5 fw-bold">$4.99 / kg</p>
                                        <Link to="#" class="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                            <div class="border border-primary rounded position-relative vesitable-item">
                                <div class="vesitable-img">
                                    <img src="img/vegetable-item-1.jpg" class="img-fluid w-100 rounded-top" alt="" />
                                </div>
                                <div class="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: '10px', right: '10px' }}>Vegetable</div>
                                <div class="p-4 pb-0 rounded-bottom">
                                    <h4>Parsely</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div class="d-flex justify-content-between flex-lg-wrap">
                                        <p class="text-dark fs-5 fw-bold">$4.99 / kg</p>
                                        <Link to="#" class="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                            <div class="border border-primary rounded position-relative vesitable-item">
                                <div class="vesitable-img">
                                    <img src="img/vegetable-item-3.png" class="img-fluid w-100 rounded-top bg-light" alt="" />
                                </div>
                                <div class="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: '10px', right: '10px' }}>Vegetable</div>
                                <div class="p-4 pb-0 rounded-bottom">
                                    <h4>Banana</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div class="d-flex justify-content-between flex-lg-wrap">
                                        <p class="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <Link to="#" class="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                            <div class="border border-primary rounded position-relative vesitable-item">
                                <div class="vesitable-img">
                                    <img src="img/vegetable-item-4.jpg" class="img-fluid w-100 rounded-top" alt="" />
                                </div>
                                <div class="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: '10px', right: '10px' }}>Vegetable</div>
                                <div class="p-4 pb-0 rounded-bottom">
                                    <h4>Bell Papper</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div class="d-flex justify-content-between flex-lg-wrap">
                                        <p class="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <Link to="#" class="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                            <div class="border border-primary rounded position-relative vesitable-item">
                                <div class="vesitable-img">
                                    <img src="img/vegetable-item-5.jpg" class="img-fluid w-100 rounded-top" alt="" />
                                </div>
                                <div class="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: '10px', right: '10px' }}>Vegetable</div>
                                <div class="p-4 pb-0 rounded-bottom">
                                    <h4>Potatoes</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div class="d-flex justify-content-between flex-lg-wrap">
                                        <p class="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <Link to="#" class="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                            <div class="border border-primary rounded position-relative vesitable-item">
                                <div class="vesitable-img">
                                    <img src="img/vegetable-item-6.jpg" class="img-fluid w-100 rounded-top" alt="" />
                                </div>
                                <div class="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: '10px', right: '10px' }}>Vegetable</div>
                                <div class="p-4 pb-0 rounded-bottom">
                                    <h4>Parsely</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div class="d-flex justify-content-between flex-lg-wrap">
                                        <p class="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <Link to="#" class="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                            <div class="border border-primary rounded position-relative vesitable-item">
                                <div class="vesitable-img">
                                    <img src="img/vegetable-item-5.jpg" class="img-fluid w-100 rounded-top" alt="" />
                                </div>
                                <div class="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: '10px', right: '10px' }}>Vegetable</div>
                                <div class="p-4 pb-0 rounded-bottom">
                                    <h4>Potatoes</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div class="d-flex justify-content-between flex-lg-wrap">
                                        <p class="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <Link to="#" class="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                            <div class="border border-primary rounded position-relative vesitable-item">
                                <div class="vesitable-img">
                                    <img src="img/vegetable-item-6.jpg" class="img-fluid w-100 rounded-top" alt="" />
                                </div>
                                <div class="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: '10px', right: '10px' }}>Vegetable</div>
                                <div class="p-4 pb-0 rounded-bottom">
                                    <h4>Parsely</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                                    <div class="d-flex justify-content-between flex-lg-wrap">
                                        <p class="text-dark fs-5 fw-bold">$7.99 / kg</p>
                                        <Link to="#" class="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>*/}
                </div>
            </div>
        </div>
    )
}
export default ShopDetails;
