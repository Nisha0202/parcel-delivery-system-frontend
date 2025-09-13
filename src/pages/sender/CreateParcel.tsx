import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { useCreateParcelMutation } from "../../api"; 
import { toast } from "react-hot-toast"; 

export default function CreateParcel() {
  const navigate = useNavigate();
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [createParcel] = useCreateParcelMutation(); // RTK mutation
  const [form, setForm] = useState({
    type: "",
    weight: "",
    receiverEmail: "",
    pickupAddress: "",
    deliveryAddress: "",
    deliveryDate: "",
    couponCode: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res: any = await createParcel(form).unwrap();
      // Show success toast
      toast.success(`Parcel created! Tracking ID: ${res.data.trackingId}`, {
        duration: 4000,
      });
      // Redirect to My Parcels after 1.5 sec
      setTimeout(() => navigate("/sender/parcels"), 4000);
    } catch (err: any) {
      toast.error(err?.data?.message || "Error creating parcel");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-2 sm:mt-8 p-6 rounded-lg shadow-xs border-2 border-gray-200 space-y-6 bg-transparent">
      {/* Back button */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      <h2 className="text-xl font-bold mb-8 text-gray-800">📦 Create Parcel</h2>

      <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
        {/* Parcel Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parcel Type
          </label>
          <input
            name="type"
            placeholder="Document / Box / Fragile"
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
            required
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            name="weight"
            type="number"
            step="0.01"
            placeholder="Per kg 80tk"
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
            required
          />
        </div>

        {/* Receiver Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Receiver Email
          </label>
          <input
            name="receiverEmail"
            placeholder="Receiver Email"
            type="email"
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
            required
          />
        </div>


        {/* Pickup Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pickup Address
          </label>
          <input
            name="pickupAddress"
            placeholder="Pickup Address"
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
            required
          />
        </div>

        {/* Delivery Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Delivery Address
          </label>
          <input
            name="deliveryAddress"
            placeholder="Delivery Address"
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
            required
          />
        </div>

        {/* Delivery Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Delivery Date
          </label>
          <div className="relative">
            <input
              ref={dateInputRef}
              name="deliveryDate"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              required
            />
            <Calendar
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              size={20}
              onClick={() => dateInputRef.current?.showPicker?.()}
            />
          </div>
        </div>

        {/* Coupon Code */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Coupon Code (optional)
          </label>
          <input
            name="couponCode"
            placeholder="Enter coupon code"
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 rounded-lg transition"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Parcel"}
          </button>

        </div>
      </form>
    </div>
  );
}
