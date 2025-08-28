import './App.css'
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing.tsx";
// import About from "./pages/About.tsx";
// import Contact from "./pages/Contact.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ParcelTracking from "./pages/ParcelTracking.tsx";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App(){
  return (
    <div className="min-h-screen">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        {/* <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/> */}
        <Route path="/track" element={<ParcelTracking/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard/></ProtectedRoute>
        }/>
      </Routes>
    </div>
  )
}
