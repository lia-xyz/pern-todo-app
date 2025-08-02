import { createSlice } from '@reduxjs/toolkit';

const allowedFilters = ['all', 'completed', 'uncompleted'];

const filterSlice = createSlice({
    name: 'filter',
    initialState: 'all',
    reducers: {
        setFilter: (state, action) => {
            return allowedFilters.includes(action.payload) ? action.payload : state;
        } 
    }
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;