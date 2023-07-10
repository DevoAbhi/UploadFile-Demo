import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [formData, setFormData] = useState(null);
  const [fileData, setFileData] = useState([]);

  useEffect(() => {

    const fetchFiles = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/get-files");
        console.log(data);

        setFileData(data.files);
      } catch (error) {

      }
    }

    fetchFiles();
  }, [])




  const fileChangeHandler = (e) => {
    setFormData(
      e.target.files[0]
    )
  }

  const uploadHandler = async (e) => {
    console.log(formData);
    e.preventDefault();
    if (formData) {
      const upload = new FormData();
      upload.append('file', formData)
      const {data} = await axios.post("http://localhost:5000/upload", upload);
      console.log(data);
      setFileData([...fileData, data.newFile])

      console.log("File uploaded!");
    }
  }

  return (
    <div className="App">
      <input type="file" name="" id="" onChange={fileChangeHandler} />
      <button type='submit' onClick={uploadHandler}>Upload</button>

      <ul>
        {fileData.length > 0 && fileData.map((file) => (
          <li key={file._id}>
            <a href={file.fileUrl}>{file.fileName}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
