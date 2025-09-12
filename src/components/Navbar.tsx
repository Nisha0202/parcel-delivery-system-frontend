import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { logout } from "../features/authSlice";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { token } = useSelector((s: RootState) => s.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-300 text-gray-800 font-semibold shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <Link to="/" className="text-lg font-bold">
            FastParcel
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6">
            <Link to="/">Home</Link>
            {token && <Link to="/dashboard">Dashboard</Link>}
          </div>

          {/* Right Side (Login/Logout) */}
          <div className="hidden md:flex">
            {token ? (
              <button onClick={() => dispatch(logout())}>Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-200 shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header with Close Button */}
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col p-4 space-y-4">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link to="/track" onClick={() => setOpen(false)}>Track</Link>
          {token && (
            <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
          )}
          <div className="border-t pt-3">
            {token ? (
              <button
                onClick={() => {
                  dispatch(logout());
                  setOpen(false);
                }}
              >
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
            )}
          </div>
        </div>
      </div>

      {/* Overlay (click to close) */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </nav>
  );
}
