import { useState } from "react";
import { useRegisterMutation } from "../api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "sender",
  });

  const [register, { isLoading }] = useRegisterMutation();
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: any = await register(form).unwrap();
      if (res.success) {
        toast.success("Registered successfully!");
        nav("/login");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="flex justify-center items-center max-w-3xl m-auto"
      style={{ minHeight: "calc(100vh - 100px)" }}
    >
      <form
        onSubmit={submit}
        className="w-full max-w-md p-8 rounded-lg shadow-xs border-2 border-gray-200 space-y-6"
      >
        <h2 className="lg:text-2xl text-xl font-semibold text-gray-900 text-center">
          FastParcel
        </h2>

        <div className="form-control w-full">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input input-bordered input-primary w-full focus:outline-none bg-transparent text-gray-900"
            required
          />
        </div>

        <div className="form-control w-full">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input input-bordered input-primary w-full focus:outline-none bg-transparent text-gray-900"
            required
          />
        </div>

        <div className="form-control w-full">
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="input input-bordered input-primary w-full focus:outline-none bg-transparent text-gray-900"
            required
          />
        </div>

        <div className="form-control w-full">
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="select select-bordered select-primary w-full bg-transparent text-gray-900"
          >
            <option value="sender">Sender</option>
            <option value="receiver">Receiver</option>
          </select>
        </div>

        <button
          type="submit"
          className={`btn w-full border-0 shadow-md font-semibold ${
            isLoading ? "bg-gray-600 cursor-not-allowed text-gray-600 " : "bg-green-500 text-white"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p className="text-gray-900 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
