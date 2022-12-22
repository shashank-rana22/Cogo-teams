import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
	name         : 'profile',
	initialState : {},
	reducers     : {
		setProfileState: (state, data) => {
			state = { ...(state || {}), ...(data?.payload || {}) };
		},
	},
});

// Action creators are generated for each case reducer function
export const { setProfileState } = counterSlice.actions;

export default counterSlice.reducer;
