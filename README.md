Here’s a properly formatted **README.md** version for your **FastParcel – Parcel Delivery Management Frontend** project:

---

# 🚀 FastParcel – Parcel Delivery Management Frontend

FastParcel is a modern parcel delivery management web application built with **React**, **Redux Toolkit**, **TypeScript**, **Vite**, **Tailwind CSS**, and **DaisyUI**.
It provides **role-based dashboards** for Senders, Receivers, and Admins, allowing users to **send, track, and manage parcels efficiently**.

---

## ✨ Features

* **Authentication** – Register and login as **Sender, Receiver, or Admin**.
* **Role-based Dashboards:**

  * **Sender:** Create parcels, view/cancel sent parcels.
  * **Receiver:** View and confirm received parcels.
  * **Admin:** Manage users, block/unblock users, manage parcels, update parcel status, and track parcels.
* **Parcel Tracking** – Track parcels by **tracking ID**.
* **Responsive UI** – Mobile-friendly design using **Tailwind CSS** + **DaisyUI**.
* **API Integration** – Powered by [Parcel Delivery API](https://parcel-delivery-api.vercel.app/).

---

## 🛠 Tech Stack

* [React](https://react.dev/)
* [Redux Toolkit](https://redux-toolkit.js.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [DaisyUI](https://daisyui.com/)
* [Lucide React Icons](https://lucide.dev/)
* [React Router](https://reactrouter.com/)
* [React Hot Toast](https://react-hot-toast.com/)

---

## ⚡ Getting Started

### ✅ Prerequisites

* [Node.js](https://nodejs.org/) (v18+ recommended)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 🚀 Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/yourusername/fastparcel-frontend.git
   cd fastparcel-frontend
   ```

2. **Install dependencies**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## 📂 Project Structure

```
src/
  api.ts                # RTK Query API definitions
  store.ts              # Redux store setup
  features/
    authSlice.ts        # Auth state & actions
  components/           # Navbar, ProtectedRoute, etc.
  pages/
    Dashboard.tsx
    Login.tsx
    Register.tsx
    ParcelTracking.tsx
    sender/
      CreateParcel.tsx
      SenderDashboard.tsx
    receiver/
      MyParcels.tsx
      ReceiverDashboard.tsx
    admin/
      AdminDashboard.tsx
      parcels.tsx
      users.tsx
      track.tsx
```

---

## 🔧 Environment

* No `.env` required for default public API.
* To use a **custom backend**, update the `baseUrl` in `src/api.ts`.

---

## 📜 Scripts

```sh
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

✨ **FastParcel** brings efficiency, scalability, and simplicity to parcel delivery management.

---

Would you like me to also **add screenshots of the dashboards (Sender, Receiver, Admin)** section in this README so it looks more visually appealing for GitHub?
