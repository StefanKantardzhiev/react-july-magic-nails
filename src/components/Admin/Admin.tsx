import React, {  useEffect } from 'react'
import {api} from "../../services/rest-api";
import './Admin.css'
import AdminGallery from './Admin-Gallery/Admin/Admin-Gallery'
import {isAdmin} from "../middleware/auth-middleware";
import {pencilOutline, trashBinOutline} from "ionicons/icons";
import {IonIcon} from "@ionic/react"
import * as process from "process";

const Admin = () => {
  const [services, setService] = React.useState([])
  const [isGallery, setIsGallery] = React.useState(false)
  const [isServices, setIsServices] = React.useState(false)
  const [isOrders, setIsOrders] = React.useState(false)
   let userToParse:any =  localStorage.getItem('user');
   let user = JSON.parse(userToParse);
   useEffect(() => {
      api.get('/services').then((data:any) => {
         console.log(data);
         setService(data)
      })
   },[]);



   async function deleteService(e: any, id: string) {
      e.preventDefault()
      await fetch(`${process.env.REACT_APP_REST_API_URL}/services/` + id, {
         method: 'DELETE',
         headers:{
            'token': localStorage.getItem('token') || '',
         }
      }).then((res:Response) => {
         if (res.status === 200) {
            return res.json();
         } else {
            throw new Error('Image deletion failed');
         }
      })
      // await fetchServices();
   }
   console.log(user)
     if(user?.role&&isAdmin(user?.role.toString())){
        return (
          <div className="Admin">
             <section className='main-title'>
                <h1>Админ панел</h1>
             </section>
             <section className="admin-options">
                <ul>
                   <li onClick={(e) => { setIsGallery(true); setIsServices(false); setIsOrders(false); }}>Manage Gallery</li>
                   <li onClick={(e) => { setIsGallery(false); setIsServices(true); setIsOrders(false); }}>Manage Services</li>
                   <li onClick={(e) => { setIsGallery(false); setIsServices(false); setIsOrders(true); }}>Manage Orders</li>
                </ul>
             </section>
             <section>
                {isGallery && <AdminGallery />}
                {isServices && (
                  <section>
                     <div className="grid-container">
                        <div className="grid-item">
                           <h2>Управление на услуги</h2>
                           {services.map((service: any) => {
                              return (
                                <div className="grid-item" key={service._id}>
                                   <p>{service.name}</p>
                                </div>
                              );
                           })}
                        </div>
                        <div className="grid-item">
                           <h2>Обозначение</h2>
                           {services.map((service: any) => {
                              return (
                                <div className="grid-item" key={service._id}>
                                   <p>{service.description + '-isServices'}</p>
                                </div>
                              );
                           })}
                        </div>
                        <div className="grid-item">
                           <h2>ЦЕНА</h2>
                           {services.map((service: any) => {
                              return (
                                <div className="grid-item" key={service._id}>
                                   <p>{service.price} ЕВРО</p>
                                </div>
                              );
                           })}
                        </div>
                        <div className="grid-item">
                           <h2>Поднови / Изтрий</h2>
                           {services.map((service: any) => {
                              return (
                                <div className="grid-item" key={service._id}>
                                   <IonIcon
                                        id="delete-button-services"
                                        icon={pencilOutline}
                                        onClick={(event) => deleteService(event, service._id)}
                                      />
                                      <IonIcon
                                        id="delete-button-services"
                                        icon={trashBinOutline}
                                        onClick={(event) => deleteService(event, service._id)}
                                      />
                                </div>
                              );
                           })};
                        </div>
                     </div>
                  </section>
                )}
                {isOrders && (
                  <section>
                     <div className="grid-container">
                        <div className="grid-item">
                           <h2>Управлявай Галерия</h2>
                           {services.map((image: any) => {
                              return (
                                <div className="grid-item" key={image._id}>
                                <p>${image.filename}</p>
                                </div>
                              )
                           })}
                        </div>
                        <div className="grid-item">
                           <h2>Управлявай Услуги</h2>
                           {services.map((image: any) => {
                              return (
                                <div className="grid-item" key={image._id}>
                                   <p>{image.filename + '-order'}</p>
                                </div>
                              )
                           })}
                        </div>
                        <div className="grid-item">
                           <h2>Управлявай Запитвания</h2>
                           {services.map((image: any) => {
                              return (
                                <div className="grid-item" key={image._id}>
                                   <p>${image.filename + '-orders'}</p>
                                </div>
                              )
                           })}
                        </div>
                     </div>
                  </section>
                )}
             </section>
          </div>
        )
     }else{
        return <h1 id='not-authorized'>Not Authorized</h1>
     }

}

export default Admin