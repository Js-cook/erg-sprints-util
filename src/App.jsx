import { useState } from 'react'
import './App.css'

function App() {

  const [fileState, setFileState] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [downloadHref, setDownloadHref] = useState(null)

  const formSubmitHandler = async(e) => {
    e.preventDefault()
    let reader = new FileReader()
    reader.readAsDataURL(document.querySelector("#file-input").files[0])
    reader.onload = async() => {
        // return reader.result
        // console.log(reader.result)
        const resp = await fetch("https://erg-sprints-util-api.vercel.app/", {
          headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          // mode: "no-cors",
          method: "POST",
          body: JSON.stringify({"inputFile": reader.result.split(",")[1]})
        })
        // console.log(await resp.json())
        const data = await resp.json()
        console.log(data["data"])
        generateDownloadableFile(data["data"])
        setFormSubmitted(true)
    }
  }

  const generateDownloadableFile = (base64String) => {
    const byteCharacters = atob(base64String);
    const byteArray = new Uint8Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i)
    }
    
    const blob = new Blob([byteArray], { type: 'application/octet-stream' })

    // Create a download link
    const link = document.getElementById("download-link")
    setDownloadHref(URL.createObjectURL(blob))
    // link.href = URL.createObjectURL(blob)
    // link.download = "race-entries.csv"
  }

  return (
    <>
      <h1>ERG Sprints Spreadsheet Utility</h1>
      <div className="card">
        <form id="main-form" onSubmit={formSubmitHandler}>
          <label htmlFor="file-input">Input File: </label>
          <input onChange={() => setFileState(document.querySelector("#file-input").value)} type="file" id="file-input" name="file-input" />
          <button type="submit">Generate Entries</button>
        </form>
      </div>
      <p className="read-the-docs">
        NOTE: Program assumes correctly formatted input spreadsheet.
      </p>
      {formSubmitted &&
        <h2><a id="download-link" href={downloadHref} download="race-entries.csv">race-entries.csv</a></h2>
      }
    </>
  )
}

export default App
