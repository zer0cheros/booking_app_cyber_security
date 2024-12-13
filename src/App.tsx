import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import AuthProvider from "./hooks/AuthProvider.tsx";
import Reservations from "./pages/Reservations.tsx";
import PrivateRoute from "./useAuth.tsx";
import TermsOfService from "./pages/Terms.tsx";
import PrivacyPolicy from "./pages/Privacy.tsx";


function App() {
  return (
    <div className="min-h-screen w-full bg-slate-900 text-slate-50">
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route element={<PrivateRoute />}>
          <Route path="/reservations" element={<Reservations />} />
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;