import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: {} };

export const profileSlice = createSlice({
	name     : 'profile',
	initialState,
	reducers : {
		setUserProfile: (state, action) => {
			state.data = action.payload;
		},
	},
});

// Reducers and actions
export const { setUserProfile } = profileSlice.actions;

export default profileSlice.reducer;
