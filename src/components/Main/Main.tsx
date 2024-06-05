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
          <h2>July's Magic Nail Studio е моят домашен салон, разположен в град
            Essen. <br/>
            Аз специализирам в маникюри, педикюри и дизайн на нокти. Моята цел е да осигуря
            релаксиращо и приятно изживяване за всички наши клиенти. Предлагам разнообразие от
            услуги, включително гел маникюр, акрилни нокти и изкуство на ноктите. Аз съм
            дружелюбна и социална личност, както и добър професионалист,затова се стремя да направя вашето посещение възможно
            най-приятно.
          </h2>
          <h2>Очаквам с нетърпение да се видим !</h2>
        </div>
      </section>
      <section className="services">
        <div className="services_container">
          <div className="service">
            <h1>Маникюр</h1>
            <p>
              Нашите маникюри са създадени, за да ви осигурят перфектния външен вид за всеки
              повод.
            </p>
          </div>
          <div className="service">
            <h1>Педикюр</h1>
            <p>
              Нашите педикюри предлагат класически, гел и
              SPA процедури за перфектна грижа и хидратация на краката ви.
            </p>
            {/* <div className="reserve-btn">
             <button>
             <span>Reserve now!</span>
             </button>
             </div> */}
          </div>
          <div className="service">
            <h1>Дизайн</h1>
            <p>
              Нашите услуги за дизайн на нокти включват иновативни и персонализирани решения, които подчертават вашата индивидуалност.
            </p>
            {/* <button onClick={() => setServiceType('Design')}>
             Reserve now!
             </button> */}
          </div>
        </div>
      </section>
      <h1 className="main-title">Последни дизайни</h1>
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