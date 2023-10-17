import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {ResponseIFace} from "../types/";

const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de';

export const geocodeApi = createApi({
    reducerPath: 'geocodeApi',
    baseQuery: fetchBaseQuery({
            baseUrl: 'https://geocode-maps.yandex.ru/1.x/'
        }),
    endpoints: (builder) => ({
        getLatLng: builder.query<ResponseIFace, string>({
            query: (place) => `?apikey=${API_KEY_YANDEX}&geocode=${place}&format=json`,
        })
    })
})

export const { useGetLatLngQuery } = geocodeApi