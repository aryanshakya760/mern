import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Private from "./components/Private";
import Login from "./components/Login";

import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import Update from "./components/Update";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<Private />}>
            <Route path="/" element={<ProductList/>} />
            <Route path="/add" element={<AddProduct/>} />
            <Route path="/update/:id" element={<Update/>} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
            <Route path="/profile" element={<h1>Profile Component</h1>} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/log" element={<Login/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
