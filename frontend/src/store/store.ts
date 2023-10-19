import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from "@reduxjs/toolkit/query";
import { geocodeApi } from '../services/geocode'
import {airQualityApi} from "../services/airQuality";
import {backendApi} from "../services/backend";
import toastReducer from '../services/toastSlice'

export const store = configureStore({
    reducer: {
        [geocodeApi.reducerPath]: geocodeApi.reducer,
        [airQualityApi.reducerPath]: airQualityApi.reducer,
        [backendApi.reducerPath]: backendApi.reducer,
        toast: toastReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(geocodeApi.middleware)
            .concat(airQualityApi.middleware)
            .concat(backendApi.middleware)
})

setupListeners(store.dispatch)