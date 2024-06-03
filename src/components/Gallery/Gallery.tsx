import React, { useEffect, useState } from 'react'
import {api} from "../../services/rest-api";
import { PhotoProvider, PhotoView } from 'react-photo-view'
import '../Gallery/Gallery.css'
import* as process from 'process'
const Gallery = () => {
  const [images, setImages] = useState([]);
   useEffect(() => {
      api.get('/files').then((data:any) => setImages(data));
  }, []);
   console.log(images)
   return (
     <div>
        <section className="main-title-gallery">
           <h1>Gallery</h1>
           <section className="gallery">
              <PhotoProvider>
                 {images.map((image: any, index) => (

                   <PhotoView
                     key={index}
                   >
                      {index < images.length ? (
                        <img src={`${process.env.REACT_APP_REST_API_URL}/files/${image._id}`} alt="ss"/>
                      ) : <h1>No Images</h1>}
                   </PhotoView>
                 ))}
              </PhotoProvider>
           </section>
        </section>
     </div>
   )
}
export default Gallery