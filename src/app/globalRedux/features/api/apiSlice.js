import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), 
  tagTypes: ['Stock', 'Report'],
  endpoints: (builder) => ({
    // Departments
    createDepartment: builder.mutation({
      query: (data) => ({
        url: '/department',
        method: 'POST',
        body: data,
      }),
    }),
    getDepartments: builder.query({
      query: ({ page = 1, limit = 5, searchTerm = "", id = null }) => {
        const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
        if (searchTerm) params.set("q", searchTerm);
        if (id) params.set("id", id);
        return `/department?${params.toString()}`;
      },
      providesTags: ["Departments"],
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

    // Authentication
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
        method: "GET",
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: '/updatePassword',
        method: 'POST',
        body: data,
      }),
    }),

    // Stock Items
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
    getStockItemById: builder.query({
      query: (id) => `/stock/${id}`,
      providesTags: (result, error, id) => [{ type: 'Stock', id }],
    }),
    addStockItem: builder.mutation({
      query: (stockData) => ({
        url: '/stock',
        method: 'POST',
        body: stockData,
      }),
      invalidatesTags: ['Stock'],
    }),
    updateStockItem: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/stock`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Stock', id }],
    }),
    deleteStockItem: builder.mutation({
      query: (id) => ({
        url: `/stock/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Stock'],
    }),

    // Reports API
    getReports: builder.query({
      query: ({ page = 1, limit = 5 }) => `/reports?page=${page}&limit=${limit}`,
      transformResponse: (response) => ({
        reports: response.reports,
        totalPages: response.totalPages,
        totalItems: response.totalItems,
        currentPage: response.currentPage,
      }),
    }),
    getReportById: builder.query({
      query: (id) => `/reports/${id}`,
      providesTags: (result, error, id) => [{ type: 'Report', id }],
    }),
    createReport: builder.mutation({
      query: (reportData) => ({
        url: '/reports',
        method: 'POST',
        body: reportData,
      }),
      invalidatesTags: ['Report'],
    }),
    updateReport: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/reports/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Report', id }],
    }),
    deleteReport: builder.mutation({
      query: (id) => ({
        url: `/reports/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Report'],
    }),

    // Add Inventory
    addDepartmentInventory: builder.mutation({
      query: (data) => ({
        url: '/inventory',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['DepartmentInventory'],
    }),

    // Get All Inventories with Pagination
    getDepartmentInventories: builder.query({
      query: ({ page = 1, limit = 5 }) => `/inventory?page=${page}&limit=${limit}`,
      transformResponse: (response) => ({
        inventories: response.inventory,
        totalPages: response.totalPages,
        totalItems: response.totalItems,
        currentPage: response.currentPage,
      }),
      providesTags: ['DepartmentInventory'],
    }),

    // Get Specific Inventory by ID
    getDepartmentInventoryById: builder.query({
      query: (id) => `/inventory/${id}`,
      providesTags: (result, error, id) => [{ type: 'DepartmentInventory', id }],
    }),

    // Update Inventory
    updateDepartmentInventory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/inventory/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'DepartmentInventory', id }],
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
  useGetReportsQuery,
  useGetReportByIdQuery,
  useCreateReportMutation,
  useUpdateReportMutation,
  useDeleteReportMutation,
  useAddDepartmentInventoryMutation,
  useGetDepartmentInventoriesQuery,
  useGetDepartmentInventoryByIdQuery,
  useUpdateDepartmentInventoryMutation,
} = apiSlice;
