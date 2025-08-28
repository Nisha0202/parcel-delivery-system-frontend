import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { logout } from "../features/authSlice";

export default function Navbar(){
  const {token} = useSelector((s:RootState)=>s.auth);
  const dispatch=useDispatch();
  return (
    <nav className="flex justify-between p-4 bg-blue-300 text-gray-800 font-semibold">
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/track">Track</Link>
        {token && <Link to="/dashboard">Dashboard</Link>}
      </div>
      <div>
        {token ? <button onClick={()=>dispatch(logout())}>Logout</button> : <Link to="/login">Login</Link>}
      </div>
    </nav>
  )
}
