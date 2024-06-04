import React, { useEffect, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { api } from '../../services/rest-api';
import * as process from 'process'

const Main = () => {
  const [images, setImages] = useState([]);
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [serviceType, setServiceType] = useState('');

  useEffect(() => {
    api.get('/files').then(data => setImages(data));
  }, []);

  const onSubmit = async (e:any) => {
    e.preventDefault();
    const emailString = email.trim();
    const titleString = title.trim();
    const messageString = message.trim();
    const serviceTypeString = serviceType.trim();

    if (!emailString || !titleString || !messageString || !serviceTypeString) {
      alert('Моля попълнете всички полета!');
      return;
    }
         api.post('/email', {email: emailString, title: titleString, message: messageString, serviceType: serviceTypeString}).then(data => {
        console.log(data);
        alert('Вашето запитване беше изпратено успешно!');
       }).catch(err => {
        console.log(err);
         });
  };

  return (
    <div>
      <section className="hero">
        <div className="title_container">
          <h1>July's Magic Nail Studio</h1>
          <h2>
            Julia Nails Studio is a nail salon located in the heart of the city
            of Monchengladbach. <br/>
            We specialize in manicures, pedicures, and nail design. Our goal is
            to provide a relaxing and enjoyable experience for all of our
            clients. We offer a variety of services including gel manicures,
            acrylic nails, and nail art. Our staff is friendly and professional,
            and we strive to make your visit as pleasant as possible.
          </h2>
          <h2>We look forward to seeing you soon!</h2>
        </div>
      </section>
      <section className="services">
        <div className="services_container">
          <div className="service">
            <h1>Manicure</h1>
            <p>
              Our manicures are designed to give you the perfect look for any
              occasion. We offer a variety of manicure services, including gel
              manicures, acrylic nails, and nail art. Our manicurists are
              trained in the latest techniques to ensure that your nails look
              their best.
            </p>
            {/* <button onClick={() => setServiceType('Manicure')}>
             Reserve now!
             </button> */}
          </div>
          <div className="service">
            <h1>Pedicure</h1>
            <p>
              Our manicures are designed to give you the perfect look for any
              occasion. We offer a variety of manicure services, including gel
              manicures, acrylic nails, and nail art. Our manicurists are
              trained in the latest techniques to ensure that your nails look
              their best.
            </p>
            {/* <div className="reserve-btn">
             <button>
             <span>Reserve now!</span>
             </button>
             </div> */}
          </div>
          <div className="service">
            <h1>Design</h1>
            <p>
              Our manicures are designed to give you the perfect look for any
              occasion. We offer a variety of manicure services, including gel
              manicures, acrylic nails, and nail art. Our manicurists are
              trained in the latest techniques to ensure that your nails look
              their best.
            </p>
            {/* <button onClick={() => setServiceType('Design')}>
             Reserve now!
             </button> */}
          </div>
        </div>
      </section>
      <h1 className="main-title">Най-нови дизайни</h1>
      <section className="gallery">
        <PhotoProvider>
          {images.slice(0,8).map((image: any, index) => (
            <PhotoView
              key={index}
              src={process.env.REACT_APP_REST_API_URL + '/files/' + image?._id}
            >
              {index < images.length ? (
                <img src={process.env.REACT_APP_REST_API_URL + '/files/' + image?._id} alt=""/>
              ) : undefined}
            </PhotoView>
          ))}
        </PhotoProvider>
      </section>
      <h1 className="main-title" id="contact">
        Контакт
      </h1>
      <form onSubmit={(ev) => onSubmit(ev)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="title"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </div>
        <div>
          <label htmlFor="title">Име:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </div>
        <div>
          <label htmlFor="message">Съобщение:</label>
          <textarea
            id="message"
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="serviceType">Услуга:</label>
          <select
            id="serviceType"
            onChange={(ev) => setServiceType(ev.target.value)}
          >
            <option value="">Select a service type</option>
            <option value="Manicure">Manicure</option>
            <option value="Pedicure">Pedicure</option>
            <option value="Design">Design</option>
          </select>
        </div>
        <button type="submit">Изпрати запитване до July Nails</button>
      </form>
    </div>
  );
};
export default Main;