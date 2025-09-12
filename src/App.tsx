import './App.css'
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ParcelTracking from "./pages/ParcelTracking";
import ProtectedRoute from "./components/ProtectedRoute";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/users";
import AdminParcels from "./pages/admin/parcels";
import AdminTrack from "./pages/admin/track";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadStored } from './features/authSlice.ts';
import PublicRoute from './components/PublicRoute.tsx';
import CreateParcel from './pages/sender/CreateParcel';
import MyParcels from './pages/sender/MyParcels.tsx';
import ReceivedParcels from './pages/receiver/MyParcels.tsx';
import { SenderDashboard } from "./pages/sender/SenderDashboard";

export default function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadStored());
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/track" element={<ParcelTracking />} />

        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
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

        <Route
          path="/sender"
          element={
            <ProtectedRoute>
              <SenderDashboard />
            </ProtectedRoute>
          }
        />
       <Route
          path="/sender/create-parcel"
          element={
            <ProtectedRoute>
              <CreateParcel />
            </ProtectedRoute>
          }
        />
               <Route
          path="/sender/parcels"
          element={
            <ProtectedRoute>
              <MyParcels />
            </ProtectedRoute>
          }
        />
         <Route
          path="/receiver/my-parcels"
          element={
            <ProtectedRoute>
              <ReceivedParcels />
            </ProtectedRoute>
          }
        />



      </Routes>
    </div>
  )
}
