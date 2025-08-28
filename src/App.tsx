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
import { AdminDashboard } from "./pages/admin/AdminDashboard.tsx";
import AdminUsers from "./pages/admin/users.tsx";
import AdminParcels from "./pages/admin/parcels.tsx";
import AdminTrack from "./pages/admin/track.tsx";

export default function App(){
  return (
    <div className="min-h-screen">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing/>} />
        {/* <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/> */}
        <Route path="/track" element={<ParcelTracking/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes (also protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/parcels"
          element={
            <ProtectedRoute>
              <AdminParcels />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/track"
          element={
            <ProtectedRoute>
              <AdminTrack />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}
