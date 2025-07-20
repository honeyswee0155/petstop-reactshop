// src/components/Services.jsx
import React from 'react';

const Services = () => {
  const services = [
    { icon: 'fa-bath', title: 'Grooming', text: 'Professional grooming services' },
    { icon: 'fa-hotel', title: 'Pet Hotel', text: 'Comfortable pet boarding' },
    { icon: 'fa-shopping-bag', title: 'Shop', text: 'Premium pet supplies' },
    { icon: 'fa-stethoscope', title: 'Vet Care', text: 'On-call veterinary support' }
  ];

  return (
    <section id="services" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5">Our <span className="text-primary">Services</span></h2>
        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="service-icon mb-3">
                    <i className={`fas ${service.icon} fa-3x text-primary`}></i>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <button
                    className="btn btn-link"
                    onClick={() => alert(`Learn more about ${service.title}`)}
                  >
                    Learn More <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
