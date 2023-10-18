import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const backendApi = createApi({
    reducerPath: 'backendApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost/api/'
    }),
    endpoints: (builder) => ({
        getHistoryByName: builder.query({
            query: (username) => `/history/${username}`,
        }),
        addHistoryItem: builder.mutation({
            query: (newHistoryItem) => ({
                url: '/history/',
                method: 'POST',
                body: newHistoryItem,
            }),
        }),
        deleteHistory: builder.mutation({
            query: (params) => ({
                url: '/history/delete',
                method: 'POST',
                body: params
            })
        })
    })
})

export const {
    useGetHistoryByNameQuery,
    useAddHistoryItemMutation,
    useDeleteHistoryMutation
} = backendApi