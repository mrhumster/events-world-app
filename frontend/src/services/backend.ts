import {BaseQueryFn, createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getAccessToken, getUser} from "../hooks";
import {showToast} from "./toastSlice";
import {isErrorWithDetail} from "./helpers";

const baseQuery = fetchBaseQuery({
        baseUrl: `https://${process.env.REACT_APP_HOSTNAME}/api/`,
        prepareHeaders: (headers: Headers) => {
            headers.set("Authorization", `Bearer ${getAccessToken()}`)
            return headers
        }
    }
)

const baseQueryWithErrorHandler: BaseQueryFn = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error) {
        let text
        if (isErrorWithDetail(result.error.data)) {
            text = result.error.data.detail
        }
        api.dispatch(showToast({show: true, title: 'Error', text: text, type: 'danger'}))
    }
    return result
}

export const backendApi = createApi({
    reducerPath: 'backendApi',
    baseQuery: baseQueryWithErrorHandler,
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
                body: params,
            })
        }),
        updateUser: builder.mutation({
            query: (params) => ({
                url: `/users/${getUser()?.username}`,
                method: 'PUT',
                body: params
            })
        }),
        getUserData: builder.query({
            query: () => ({
                url: `/users/${getUser()?.username}`
            })
        })
    })
})

export const {
    useGetHistoryByNameQuery,
    useAddHistoryItemMutation,
    useDeleteHistoryMutation,
    useUpdateUserMutation,
    useGetUserDataQuery
} = backendApi