import React from "react";
import Page from "../elements/Page";

function Testimonial() {
  return (
    <div>
      <Page page="Testimonial" />
      <div className="container-fluid testimonial py-5">
        <div className="container py-5">
          <div className="testimonial-header text-center">
            <h4 className="text-primary">Our Testimonial</h4>
            <h1 className="display-5 mb-5 text-dark">Our Client Saying!</h1>
          </div>
          <div
            id="testimonialCarousel"
            className="carousel slide testimonial"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#testimonialCarousel"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#testimonialCarousel"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#testimonialCarousel"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>

            <div className="carousel-inner">
              {/* Testimonio 1 */}
              <div className="carousel-item active">
                <div className="testimonial-item img-border-radius bg-light rounded p-4">
                  <div className="position-relative">
                    <i
                      className="fa fa-quote-right fa-2x text-secondary position-absolute"
                      style={{ bottom: "30px", right: "0" }}
                    ></i>
                    <div className="mb-4 pb-4 border-bottom border-secondary">
                      <p className="mb-0">
                        Lorem Ipsum is simply dummy text of the printing Ipsum
                        has been the industry's standard dummy text ever since
                        the 1500s.
                      </p>
                    </div>
                    <div className="d-flex align-items-center flex-nowrap">
                      <div className="bg-secondary rounded">
                        <img
                          src="img/testimonial-1.jpg"
                          className="img-fluid rounded"
                          style={{ width: "100px", height: "100px" }}
                          alt="Client 1"
                        />
                      </div>
                      <div className="ms-4 d-block">
                        <h4 className="text-dark">John Doe</h4>
                        <p className="m-0 pb-3">Software Engineer</p>
                        <div className="d-flex pe-5">
                          <i className="fas fa-star text-primary"></i>
                          <i className="fas fa-star text-primary"></i>
                          <i className="fas fa-star text-primary"></i>
                          <i className="fas fa-star text-primary"></i>
                          <i className="fas fa-star"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonio 2 */}
              <div className="carousel-item">
                <div className="testimonial-item img-border-radius bg-light rounded p-4">
                  <div className="position-relative">
                    <i
                      className="fa fa-quote-right fa-2x text-secondary position-absolute"
                      style={{ bottom: "30px", right: "0" }}
                    ></i>
                    <div className="mb-4 pb-4 border-bottom border-secondary">
                      <p className="mb-0">
                        Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s. It has survived not only five
                        centuries.
                      </p>
                    </div>
                    <div className="d-flex align-items-center flex-nowrap">
                      <div className="bg-secondary rounded">
                        <img
                          src="img/testimonial-1.jpg"
                          className="img-fluid rounded"
                          style={{ width: "100px", height: "100px" }}
                          alt="Client 2"
                        />
                      </div>
                      <div className="ms-4 d-block">
                        <h4 className="text-dark">Jane Smith</h4>
                        <p className="m-0 pb-3">UX Designer</p>
                        <div className="d-flex pe-5">
                          <i className="fas fa-star text-primary"></i>
                          <i className="fas fa-star text-primary"></i>
                          <i className="fas fa-star text-primary"></i>
                          <i className="fas fa-star text-primary"></i>
                          <i className="fas fa-star text-primary"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#testimonialCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#testimonialCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;