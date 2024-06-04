import './Admin-Gallery.css'
import 'react-photo-view/dist/react-photo-view.css'
import React, {useEffect, useState} from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view'
import {IonIcon} from "@ionic/react";
import { trashBinOutline} from 'ionicons/icons';
import {api} from "../../../../services/rest-api"
import * as process from 'process'

const AdminAdminGallery = () => {

  let [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  let [file, setFile] = useState();

  const handleUploadClick = (e: any) => {
    e.preventDefault();
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };


  const handleFileUpload = async (e: any) => {
    setFile(e.target.files[0]);
    file = (e.target.files[0]);
    return file?await uploadImage(e, file):null
  };
  async function fetchImages() {
     await fetch(`${process.env.REACT_APP_REST_API_URL}/files`,{
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
         'token': localStorage.getItem('token') || ''
       }})
      .then(async(res) => await res.json())
      .then((data) => setImages(data));
  }
  async function deleteImage(e: any, id: string) {
    e.preventDefault()
    await api.delete(`/files/` + id)
      .then(async (res:Response) => {
      if (res.status.toString().includes('20')){
        await fetchImages();
        return {message:'Image deleted succesfully'}
      } else {
        throw new Error('Image deletion failed');
      }
    })
  }

  async function uploadImage(e: any, file: File) {
    e.preventDefault()
    let formData = new FormData();
    formData.append('file', file);
    api.post('/files/upload',formData)
    .then(async (res:Response) => {
      if (res.status.toString().includes('20')) {
         await fetchImages();
        return res.json();
      } else {
        throw new Error('Image UPLOAD failed');
      }
    })
  }
  let token =  localStorage.getItem('token') ;

  useEffect(() => {
   api.get('/files')
      .then((data:any) => setImages(data))
  }, [])


  if(token){
    return (
      <div className="Admin-Gallery">
        <section>
          <div className="admin-grid-container">
            <h2 id={'gallery-title'}>Галерия на админ</h2>
            {images.map((image: any,index) => (
              <section key={image._id} className="admin-gallery">
                <PhotoProvider>
                  <PhotoView
                    key={index}
                    width={200}
                    height={200}
                    src={process.env.REACT_APP_REST_API_URL + '/files/' + image?._id}
                  >
                    {index < images.length ? (
                      <img src={process.env.REACT_APP_REST_API_URL+ '/files/' + image?._id} alt=""/>
                    ) : undefined}
                  </PhotoView>
                </PhotoProvider>
                <IonIcon
                  id="delete-button"
                  icon={trashBinOutline}
                  onClick={(event) => deleteImage(event, image._id)}
                />
              </section>
            ))}
          </div>
        </section>
        <section id="upload">
          <button onClick={handleUploadClick}>Качи</button>
          {showModal && (
            <div className="modal">
            <input type="file" onChange={handleFileUpload} />
              <button onClick={handleClose}>Затвори</button>
            </div>
          )}
        </section>
      </div>
    );
  }
  else {
    return <div>Unauthorized</div>
  }
}
export default AdminAdminGallery