// src/pages/Contact.tsx
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200); 
  };

  return (
    <section className="p-8 max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Contact Us
      </h2>

      {submitted ? (
        <div className="p-4 bg-green-100 text-green-700 rounded-xl text-center shadow-sm">
          ✅ Message sent successfully!
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-transparent p-6 rounded-2xl shadow-md border border-gray-200"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Your full name"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              placeholder="Write your message here..."
              rows={4}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      )}
    </section>
  );
}
