import { createSlice } from "@reduxjs/toolkit";

const initialState = { loadstatus: false };

const LoadingSlice = createSlice({
    name: "LoadingStatus",
    initialState,
    reducers: {
        changeLoadingStatus(state, action) {
            state.loadstatus = action.payload;
        }
    }
});

export const { changeLoadingStatus } = LoadingSlice.actions;
export default LoadingSlice.reducer;
