import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';

function App() {

  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [image, setImage] = useState()
  const [images, setImages] = useState([])

  useEffect(() => {
    async function getImages() {
      const result = await axios.get('/api/images')
      console.log(result.data.images,"result");
      setImages(result.data.images);
      console.log(images);
    }
    getImages()
  }, [])


  const submit = async event => {
 
    event.preventDefault()

    const formData = new FormData()
    formData.append("image", file)
    formData.append("description", description)

    const result = await axios.post('/api/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
    setImage(result.data.imagePath)

    // Send the file and description to the server
  }




  return (
    <div className="App">
      <form onSubmit={submit}>
        <input
          filename={file} 
          onChange={e => setFile(e.target.files[0])} 
          type="file" 
          accept="image/*"
        ></input>
        <input
          onChange={e => setDescription(e.target.value)} 
          type="text"
        ></input>
        <button type="submit">Submit</button>
      </form>
      <div>
        
      {images && images.map((image, i) => {
        return (
          <><p key={i}>{image.description} </p><img src={`api/image/${image.file_path}`} style={{ width: '300px' }} /></>
          

        );
      }
      )}
      </div>

    </div>
  )
}

export default App;
