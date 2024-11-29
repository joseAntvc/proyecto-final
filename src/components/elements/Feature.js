import React from 'react';

function Features() {
  const featuresData = [
    {
      icon: "fas fa-car-side fa-3x",
      title: "Envío Gratis",
      description: "En pedidos superiores a $300"
    },
    {
      icon: "fas fa-user-shield fa-3x",
      title: "Pago Seguro",
      description: "100% de seguridad en los pagos"
    },
    {
      icon: "fas fa-exchange-alt fa-3x",
      title: "Devolución en 30 Días",
      description: "Garantía de reembolso en 30 días"
    },
    {
      icon: "fa fa-phone-alt fa-3x",
      title: "Soporte 24/7",
      description: "Atención rápida todo el tiempo"
    }
  ];

  return (
    <div className="container-fluid featurs py-5">
      <div className="container py-5">
        <div className="row g-4">
          {featuresData.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="featurs-item text-center rounded bg-light p-4">
                <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                  <i className={`${feature.icon} text-white`}></i>
                </div>
                <div className="featurs-content text-center">
                  <h5>{feature.title}</h5>
                  <p className="mb-0">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
