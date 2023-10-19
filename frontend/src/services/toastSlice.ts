import {createSlice} from "@reduxjs/toolkit";

export const toastSlice = createSlice({
    name: 'toast',
    initialState: {
    },
    reducers: {
        showToast: (state: any, action) => {
            state.value = action.payload
        },
        closeToast: (state: any) => {
            state.value = {show: false}
        }
    }
})

export const {showToast, closeToast} = toastSlice.actions
export default toastSlice.reducer