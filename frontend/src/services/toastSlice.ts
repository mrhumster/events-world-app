import {createSlice} from "@reduxjs/toolkit";
import logger from "../logger/logger";

export const toastSlice = createSlice({
    name: 'toast',
    initialState: {
    },
    reducers: {
        showToast: (state: any, action) => {
            logger.log(`Показано уведомление пользователю ${JSON.stringify(action.payload)}`);
            state.value = action.payload
        },
        closeToast: (state: any) => {
            state.value = {show: false}
        }
    }
})

export const {showToast, closeToast} = toastSlice.actions
export default toastSlice.reducer