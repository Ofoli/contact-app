import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contacts from "./components/Contacts";
import withContactForm from "./components/withContact";
import Header from "./layout/Header";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { Provider } from "./context/context";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const AddContact = withContactForm("add");
const EditContact = withContactForm("edit");
class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding="Contact Manager" />
            <div className="container">
              <Routes>
                <Route path="/" element={<Contacts />} />
                <Route path="/contact/add" element={<AddContact />} />
                <Route path="/contact/edit/:id" element={<EditContact />} />
                <Route path="/about" element={<About />} />
                <Route element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
