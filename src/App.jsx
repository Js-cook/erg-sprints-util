import { useState } from 'react'
import { convertToBase64 } from '../util/apiUtils'
import './App.css'

function App() {

  const [fileState, setFileState] = useState(null)

  const formSubmitHandler = async(e) => {
    e.preventDefault()
    console.log("balls")
    console.log(fileState)
    let encodedFile = convertToBase64(document.querySelector("#file-input").files[0])
    const resp = await fetch("https://erg-sprints-util-iaz4lsc12-js-cooks-projects.vercel.app/", {
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*"
      },
      mode: "no-cors",
      method: "POST",
      body: JSON.stringify({"inputFile": encodedFile})
    })

    console.log(await resp.json())
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
    </>
  )
}

export default App
