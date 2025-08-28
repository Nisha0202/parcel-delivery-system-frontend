import { useState } from "react";
import { useLoginMutation } from "../api";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: any = await login({ email, password }).unwrap();
      dispatch(setCredentials({ token: res.token, role: res.data.role.toLowerCase() }));
      toast.success("Logged in successfully!");
      nav("/dashboard");
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="flex justify-center items-center max-w-3xl m-auto"
      style={{ minHeight: "calc(100vh - 100px)" }}
    >
      <form
        onSubmit={submit}
        className="w-full max-w-md p-8 rounded-lg shadow-xs border-2 border-gray-200 space-y-6 bg-transparent"
      >
        <h2 className="lg:text-2xl text-xl font-semibold text-gray-900 text-center">
          FastParcel
        </h2>

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
          disabled={isLoading}
          className={`btn w-full border-0 shadow-md  font-semibold ${
            isLoading ? "bg-gray-600 cursor-not-allowed text-gray-600" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p className="text-gray-900 text-center">
          Not registered?{" "}
          <Link to="/register" className="text-green-500 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
