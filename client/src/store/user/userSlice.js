import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        signInState: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateState: (state) => {
            state.loading = true;
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteState: (state) => {
            state.loading = true;
        },
        deleteSuccess: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
});

export const { signInState, signInSuccess, signInError,
    updateState, updateSuccess, updateError
    , deleteState, deleteSuccess, deleteError } = userSlice.actions;
export default userSlice.reducer;