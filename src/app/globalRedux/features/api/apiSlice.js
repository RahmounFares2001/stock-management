import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), 
  // tagTypes: ['Stock'],
  endpoints: (builder) => ({
    createDepartment: builder.mutation({
      query: (data) => ({
        url: '/department',
        method: 'POST',
        body: data,
      }),
    }),
    getDepartments: builder.query({
      query: () => '/department',
    }),
    updateDepartment: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/department/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/department/${id}`,
        method: 'DELETE',
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/signIn',
        method: 'POST',
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET", // Your API uses GET for logout
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: '/updatePassword',
        method: 'POST',
        body: data,
      }),
    }),
    // get stock items
    getStockItems: builder.query({
      query: ({ categories = [], types = [], q = "", page = 1 }) => {
        const params = new URLSearchParams();
        
        if (categories.length > 0 && !categories.includes("All")) {
          params.append("categories", categories.join(","));
        }
        if (types.length > 0 && !types.includes("All")) {
          params.append("types", types.join(","));
        }
        if (q) {
          params.append("q", q);
        }
        params.append("page", page);

        return `/stock?${params.toString()}`;
      },
      transformResponse: (response) => ({
        items: response.items,
        totalPages: response.totalPages,
        totalItems: response.totalItems,
        currentPage: response.currentPage,
      }),
    }),
    
      // Get stock item by ID
      getStockItemById: builder.query({
        query: (id) => `/stock/${id}`,
        providesTags: (result, error, id) => [{ type: 'Stock', id }],
      }),
    
      // Add a new stock item
      addStockItem: builder.mutation({
        query: (stockData) => ({
          url: '/stock',
          method: 'POST',
          body: stockData,
        }),
          invalidatesTags: ['Stock'],
      }),
    
      // Update a stock item
      updateStockItem: builder.mutation({
        query: ({ id, ...data }) => ({
          url: `/stock/${id}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: (result, error, { id }) => [{ type: 'Stock', id }],
      }),
    
      // Delete a stock item
      deleteStockItem: builder.mutation({
        query: (id) => ({
          url: `/stock/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Stock'],
      }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useGetDepartmentsQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useUpdatePasswordMutation,
  useGetStockItemsQuery,
  useGetStockItemByIdQuery,
  useAddStockItemMutation,
  useUpdateStockItemMutation,
  useDeleteStockItemMutation,
} = apiSlice;
