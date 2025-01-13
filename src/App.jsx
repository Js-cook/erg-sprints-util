import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
      <h1>ERG Sprints Spreadsheet Utility</h1>
      <div className="card">
        <form>
          <label for="file-input">Input File: </label>
          <input type="file" id="file-input" />
        </form>
      </div>
      <p className="read-the-docs">
        NOTE: Program assumes correctly formatted input spreadsheet.
      </p>
    </>
  )
}

export default App
