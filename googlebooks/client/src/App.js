import React from "react";
import "./App.css";
import Books from "./pages/Books"

function App() {
  // render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="https://sites.google.com/site/hindibookspdf/_/rsrc/1468744400213/home/Download-hindi-books-pdf.png" className="App-logo" alt="logo" />
          <h2>GoogleBooks</h2> 
        </div>
        <Books/>
      </div>
    );
  // }
}

export default App;
