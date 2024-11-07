import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";


function App() {
  return (
    <div className="min-h-screen w-full bg-slate-900 text-slate-50">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;