import React, { useEffect, useState } from 'react'
import {api} from "../../services/rest-api";
import { PhotoProvider, PhotoView } from 'react-photo-view'
import '../Gallery/Gallery.css'
const Gallery = () => {
  const [images, setImages] = useState([]);
   useEffect(() => {
      api.get('/files').then((data:any) => setImages(data));
  }, []);
   let url = api.baseURL;
   return (
     <div>
        <section className="main-title-gallery">
           <h1>Галерия</h1>
        </section>
        <section className="gallery">
              <PhotoProvider>
                 {images.map((image: any, index) => (

                   <PhotoView
                     key={index}
                   >
                      {index < images.length ? (
                        <img src={`${url}/files/${image._id}`} alt={image.id}/>
                      ) : <h1>Няма намерени картини :( </h1>}
                   </PhotoView>
                 ))}
              </PhotoProvider>
        </section>
     </div>
   )
}
export default Gallery