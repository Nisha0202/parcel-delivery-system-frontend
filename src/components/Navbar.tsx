import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { logout } from "../features/authSlice";
import { Menu, X, Loader2 } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { token } = useSelector((s: RootState) => s.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // For button animation

  const links = [
    { name: "Home", to: "/" },
    ...(token ? [{ name: "Dashboard", to: "/dashboard" }] : []),
  ];

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(logout());
      setLoading(false);
    }, 500); // simulate async logout
  };

const buttonClasses = (active: boolean) =>
  `btn border-0 shadow-md font-semibold flex items-center justify-center transition whitespace-normal break-words text-center ${
    active
      ? "bg-gray-600 cursor-not-allowed text-gray-400"
      : "bg-blue-500 hover:bg-blue-600 text-white"
  }`; 


  return (
    <nav className="bg-gray-200 text-black shadow-md font-inter sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold tracking-wide">
            FastParcel
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="hover:text-gray-200 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {token ? (
              <button
                onClick={handleLogout}
                disabled={loading}
                className={`${buttonClasses(loading)} bg-red-700 hover:bg-red-600`}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Logging out...
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            ) : (
              <Link
                to="/login"
                className="w-full md:w-auto"
              >
                <button className={buttonClasses(false)}>Login</button>
              </Link>
            )}
          </div>

          <button
            className="md:hidden flex items-center p-2"
            onClick={() => setOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-100 shadow-lg text-blacktransform transition-transform duration-300 ease-in-out z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b ">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col p-4 space-y-4">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setOpen(false)}
              className="hover:bg-blue-400 px-3 py-2 transition"
            >
              {link.name}
            </Link>
          ))}

          {token ? (
            <button
              onClick={handleLogout}
              disabled={loading}
              className={`${buttonClasses(loading)} bg-red-700 hover:bg-red-600`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Logging out...
                </>
              ) : (
                "Logout"
              )}
            </button>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)}>
              <button className={buttonClasses(false)}>Login</button>
            </Link>
          )}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </nav>
  );
}
