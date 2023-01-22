import './App.css';
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';

function App() {

  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])

  useEffect(() => {
    async function getImages() {
      const result = await axios.get('/api/images')
      // setImages(result.data.images);
      setImages(result.data.images);
    }
    getImages()
  }, [])

  const submit = async event => {
    event.preventDefault() 
    const formData = new FormData()

    formData.append("image", file)
    formData.append("description", description)
    // Send the file and description to the server
    const result = await axios.post('/api/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
    setImages([result.data, ...images])
  }

  return (

    <div className="App">
      <h1>Image Uploader</h1>
      <form onSubmit={submit}>

        <input
          filename={file} 
          onChange={e => setFile(e.target.files[0])} 
          type="file" 
          accept="image/*"
          id="csv-file" name="files" class="file-upload_input"
        ></input>

        <input
          onChange={e => setDescription(e.target.value)} 
          type="text"
        ></input>
        <button type="submit">Submit</button>
      </form>
      <div className='pictures'>
        
      {images && images.map((image, i) => {
        return (
          <><p key={i}>{image.description} 
            </p><img src={`api/image/${image.file_name}`} style={{ width: '300px' }} alt={image.description}/></>
        );
      }
      )}
      </div>
    </div>
  )
}
export default App;
