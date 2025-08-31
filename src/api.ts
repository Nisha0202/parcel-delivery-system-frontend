import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://parcel-delivery-api.vercel.app/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Parcels"], // <-- move it here
  endpoints: (builder) => ({
    // 🔑 Auth
    login: builder.mutation({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    register: builder.mutation({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),

    // 📦 Parcels
    meParcels: builder.query<any, void>({ query: () => "/parcels/me" }),
    receivedParcels: builder.query<any, void>({ query: () => "/parcels/received" }),
    allParcels: builder.query<any, void>({
      query: () => "/parcels",
      providesTags: ["Parcels"], // <-- auto-refetch when invalidated
    }),
    createParcel: builder.mutation({
      query: (body) => ({ url: "/parcels", method: "POST", body }),
      invalidatesTags: ["Parcels"],
    }),
    updateParcel: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/parcels/${id}/status`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Parcels"],
    }),
    cancelParcel: builder.mutation({
      query: (id) => ({ url: `/parcels/${id}/cancel`, method: "PATCH" }),
      invalidatesTags: ["Parcels"],
    }),
    confirmParcel: builder.mutation({
      query: (id) => ({ url: `/parcels/${id}/confirm`, method: "PATCH" }),
      invalidatesTags: ["Parcels"],
    }),

    // 🛠 Admin: Block / Unblock Users
    users: builder.query<any, void>({ query: () => "/users" }),
    blockUser: builder.mutation<void, string>({
      query: (id) => ({ url: `/users/${id}/block`, method: "PATCH" }),
    }),
    unblockUser: builder.mutation<void, string>({
      query: (id) => ({ url: `/users/${id}/unblock`, method: "PATCH" }),
    }),

    // 🛠 Admin: Manage Parcels
    blockParcel: builder.mutation<void, string>({
      query: (id) => ({ url: `/parcels/${id}/block`, method: "PATCH" }),
      invalidatesTags: ["Parcels"],
    }),

    // 🔍 Tracking
    track: builder.query({
      query: (id) => `/track/${id}`,
    }),

    // 📝 Parcel Details + Logs
    parcelDetails: builder.query({
      query: (id) => `/parcels/${id}`,
    }),
    parcelStatusLog: builder.query({
      query: (id) => `/parcels/${id}/status-log`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,

  useMeParcelsQuery,
  useReceivedParcelsQuery,
  useAllParcelsQuery,
  useCreateParcelMutation,
  useUpdateParcelMutation,
  useCancelParcelMutation,
  useConfirmParcelMutation,

  useUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,

  useBlockParcelMutation,

  useTrackQuery,
  useParcelDetailsQuery,
  useParcelStatusLogQuery,
} = api;
