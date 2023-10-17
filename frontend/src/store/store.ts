import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from "@reduxjs/toolkit/query";
import { geocodeApi } from '../services/geocode'
import {airQualityApi} from "../services/airQuality";

export const store = configureStore({
    reducer: {
        [geocodeApi.reducerPath]: geocodeApi.reducer,
        [airQualityApi.reducerPath]: airQualityApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(geocodeApi.middleware).concat(airQualityApi.middleware)
})

setupListeners(store.dispatch)