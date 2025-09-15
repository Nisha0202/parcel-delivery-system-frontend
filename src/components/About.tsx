
export default function About() {
  return (
    <section className="p-10 max-w-3xl mx-auto text-center ">
      <h2 className="text-3xl font-bold mb-4">About FastParcel</h2>
      <p className="mb-4">
        FastParcel is inspired by trusted services like Pathao and Sundarban. 
        Our mission is to simplify deliveries with transparency and reliability.
      </p>
      <div className="grid gap-4 md:grid-cols-3 bg-transparent">
        <div className="card  p-4 shadow-md">
          <h3 className="font-semibold">🚀 Fast Delivery</h3>
          <p>Quick and efficient parcel services nationwide.</p>
        </div>
        <div className="card p-4 shadow-md">
          <h3 className="font-semibold">🔒 Secure</h3>
          <p>Trusted system with real-time tracking.</p>
        </div>
        <div className="card p-4 shadow-md">
          <h3 className="font-semibold">👨‍💼 Our Team</h3>
          <p>Dedicated professionals ensuring seamless service.</p>
        </div>
      </div>
    </section>
  );
}
