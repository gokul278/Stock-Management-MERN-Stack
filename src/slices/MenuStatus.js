import { createSlice } from "@reduxjs/toolkit";

const initialState = { page: "dashboard", menustatus: "opened", menumobile: false };

const MenuSlice = createSlice({
    name: "MenuStatus",
    initialState,
    reducers: {
        changeMenuStatus(state, action) {
            state.page = action.payload;
        },
        changeMenubar(state, action) {
            state.menustatus = action.payload;
        },
        changeMenumobile(state, action) {
            state.menumobile = action.payload;
        }
    }
})

export const { changeMenuStatus, changeMenubar, changeMenumobile } = MenuSlice.actions;
export default MenuSlice.reducer;