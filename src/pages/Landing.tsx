import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import About from "../components/About";
import Contact from "../components/Contact";

export default function Home() {
  const navigate = useNavigate();
  const { token } = useSelector((s: RootState) => s.auth);

  return (
    <section className="p-10 text-center">
      <h1 className="text-4xl font-bold mb-4 mt-4 sm:mt-16">
        Delivering Trust, One Parcel at a Time
      </h1>
      <p className="text-lg mb-6 sm:mb-12">
        Fast, secure, and reliable parcel delivery for everyone.
      </p>

      {!token && (
        <button className="btn btn-primary" onClick={() => navigate("/login")}>
          Get Started
        </button>
      )}

      <About />
      <Contact />
    </section>
  );
}
