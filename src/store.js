import { configureStore } from "@reduxjs/toolkit";
import LoadingStatus from "./slices/LoadingStatus";
import MenuStatus from "./slices/MenuStatus";

export const store = configureStore({
    devTools: true,
    reducer: {
        loading: LoadingStatus,
        menu: MenuStatus
    }
})