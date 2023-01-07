/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
	name         : 'profile',
	initialState : {
		_initialized: false,
	},
	reducers: {
		setProfileState: (state, action) => {
			state = { ...state, ...action.payload };
			return state;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setProfileState } = profileSlice.actions;

export default profileSlice.reducer;
