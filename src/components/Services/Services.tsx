import React, {useEffect, useState} from 'react';
import {api} from "../../services/rest-api";
import './Services.css'

export const Services = () => {

   let[services,setServices] = useState([])
   useEffect(() => {
     getServices().then(r => {
        return r;
     })
   }, []);


   async function getServices() {
      await api.get(`/services`)
        .then((res: Response) => res)
        .then((data: any) => setServices(data));
   }

   return (
     <section className="services">
        <h1 className="services-title">Our Services</h1>
        <div className="services-grid">
           {services.map((service:any,index) => (
             <div
               className="service-card"
               key={service._id}
               style={{backgroundImage: `url('${service.imageUrl}')`}} // Set background image dynamically
             >
                <p className="service-description"
                   id={'service-description'+index.toString()
                }>{service.description}</p>
                <h2 className="service-name"
                    id={'service-name'+index.toString()
                }>{service.name}</h2>
             </div>
           ))}
        </div>
     </section>
   );
};