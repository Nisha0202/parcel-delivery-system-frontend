import { useState } from "react";
import { useLoginMutation } from "../api";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [login] = useLoginMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: any = await login({ email, password }).unwrap();
      dispatch(setCredentials({ token: res.token, role: res.data.role }));
      nav("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center max-w-3xl m-auto"  style={{ minHeight: "calc(100vh - 100px)" }}>
      <form
        onSubmit={submit}
        className="w-full max-w-md p-8 bg-tranparent rounded-lg shadow-xs border-2 border-gray-200 space-y-6"
      >

    <h2 className="lg:text-2xl text-xl  font-semibold text-gray-800 text-center">FastParcel</h2>
        <div className="form-control w-full">

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered input-primary w-full focus:outline-none bg-transparent text-gray-900"
            required
          />
        </div>

        <div className="form-control w-full">

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            className="input input-bordered input-primary w-full focus:outline-none bg-transparent text-gray-900"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary bg-blue-400 border-0 shadow-2xs w-full text-white font-semibold"
        >
          Login
        </button>
           <p className="text-gray-800 text-center">
          Not registered?{" "}
          <Link to="/register" className="text-green-500 font-semibold hover:underline">
            Register
          </Link>
        </p>
        
      </form>
    </div>
  );
}
