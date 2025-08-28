import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "sender" | "receiver" | "admin" | null;

interface AuthState {
  token: string | null;
  role: UserRole;
}

const initial: AuthState = { token: null, role: null };

const authSlice = createSlice({
  name: "auth",
  initialState: initial,
  reducers: {
    setCredentials: (s, a: PayloadAction<{ token: string; role: UserRole }>) => {
      s.token = a.payload.token;
      s.role = a.payload.role;
      localStorage.setItem("auth", JSON.stringify(a.payload));
    },
    logout: (s) => {
      s.token = null;
      s.role = null;
      localStorage.removeItem("auth");
    },
    loadStored: (s) => {
      const stored = localStorage.getItem("auth");
      if (stored) {
        const { token, role } = JSON.parse(stored) as { token: string; role: UserRole };
        s.token = token;
        s.role = role;
      }
    },
  },
});

export const { setCredentials, logout, loadStored } = authSlice.actions;
export default authSlice.reducer;
