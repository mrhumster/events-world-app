import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from "@reduxjs/toolkit/query";
import { geocodeApi } from '../services/geocode'
import {airQualityApi} from "../services/airQuality";
import {backendApi} from "../services/backend";

export const store = configureStore({
    reducer: {
        [geocodeApi.reducerPath]: geocodeApi.reducer,
        [airQualityApi.reducerPath]: airQualityApi.reducer,
        [backendApi.reducerPath]: backendApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(geocodeApi.middleware)
            .concat(airQualityApi.middleware)
            .concat(backendApi.middleware)
})

setupListeners(store.dispatch)