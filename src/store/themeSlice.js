import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = { isDark: false };
const themeSlice = createSlice({
    name: 'theme',
    initialState: initialThemeState,
    reducers: {
        set(state, action) {
            state.isDark = action.payload;
            localStorage.setItem('userPrefersDark', action.payload);
        },
        toggle(state) {
            state.isDark = !state.isDark;
            localStorage.setItem('userPrefersDark', state.isDark);
        }
    }
})

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;