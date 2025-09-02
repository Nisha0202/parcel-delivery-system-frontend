import { useState } from "react";
import axios from "axios";

export default function CreateParcel() {
  const [form, setForm] = useState({
    type: "",
    weight: "",
    receiverId: "",
    pickupAddress: "",
    deliveryAddress: "",
    deliveryDate: "",
    couponCode: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/parcels", form, { withCredentials: true });
      setMessage(`Parcel created! Tracking ID: ${data.data.trackingId}`);
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error creating parcel");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Parcel</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="type" placeholder="Parcel Type" className="border p-2 w-full" onChange={handleChange} />
        <input name="weight" placeholder="Weight (kg)" type="number" className="border p-2 w-full" onChange={handleChange} />
        <input name="receiverId" placeholder="Receiver ID" className="border p-2 w-full" onChange={handleChange} />
        <input name="pickupAddress" placeholder="Pickup Address" className="border p-2 w-full" onChange={handleChange} />
        <input name="deliveryAddress" placeholder="Delivery Address" className="border p-2 w-full" onChange={handleChange} />
        <input name="deliveryDate" type="date" className="border p-2 w-full" onChange={handleChange} />
        <input name="couponCode" placeholder="Coupon Code (optional)" className="border p-2 w-full" onChange={handleChange} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
