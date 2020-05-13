import React from "react";
import "./App.css";
import Books from "./pages/Books";
import Saved from "./pages/Saved";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  // render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="https://sites.google.com/site/hindibookspdf/_/rsrc/1468744400213/home/Download-hindi-books-pdf.png" className="App-logo" alt="logo" />
          <h2>GoogleBooks</h2> 
        </div>
        <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Books} />
          <Route exact path="/:id" component={Books} />
          <Route exact path="/saved" component={Saved} />
        </Switch>
      </div>
    </Router>
      </div>
    );
  // }
}

export default App;
