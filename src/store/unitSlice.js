import { createSlice } from "@reduxjs/toolkit";

const initialUnitState = { isMetric: true };

const unitSlice = createSlice({
    name: 'unit',
    initialState: initialUnitState,
    reducers: {
        toggle(state) {
            state.isMetric = !state.isMetric;
        }
    }
})
export const unitActions = unitSlice.actions;
export default unitSlice.reducer