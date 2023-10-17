import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const airQualityApi = createApi({
    reducerPath: 'airQualityApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://air-quality-api.open-meteo.com/v1/air-quality'
    }),
    endpoints: (builder) => ({
        getStatistic: builder.query({
            query: (coordinates) => `?latitude=${coordinates.lat}&longitude=${coordinates.lng}&hourly=pm10,pm2_5`,
        })
    })
})

export const { useGetStatisticQuery } = airQualityApi