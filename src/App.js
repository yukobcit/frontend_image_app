import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import axios from 'axios'

function App() {

  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [image, setImage] = useState()

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
    </div>
  )
}

export default App;
