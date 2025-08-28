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
  endpoints: (builder) => ({
    login: builder.mutation({ query: (body) => ({ url: "/auth/login", method: "POST", body }) }),
    register: builder.mutation({ query: (body) => ({ url: "/auth/register", method: "POST", body }) }),
    meParcels: builder.query({ query: () => "/parcels/me" }),
    receivedParcels: builder.query({ query: () => "/parcels/received" }),
    allParcels: builder.query({ query: () => "/parcels" }),
    users: builder.query({ query: () => "/users" }),
    track: builder.query({ query: (id) => `/track/${id}` }),
    createParcel: builder.mutation({ query: (body) => ({ url: "/parcels", method: "POST", body }) }),
    updateParcel: builder.mutation({ query: ({ id, ...body }) => ({ url: `/parcels/${id}/status`, method: "PATCH", body }) }),
    cancelParcel: builder.mutation({ query: (id) => ({ url: `/parcels/${id}/cancel`, method: "PATCH" }) }),
    confirmParcel: builder.mutation({ query: (id) => ({ url: `/parcels/${id}/confirm`, method: "PATCH" }) }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useMeParcelsQuery,
  useReceivedParcelsQuery,
  useAllParcelsQuery,
  useUsersQuery,
  useTrackQuery,
  useCreateParcelMutation,
  useUpdateParcelMutation,
  useCancelParcelMutation,
  useConfirmParcelMutation
} = api;
