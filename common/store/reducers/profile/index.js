/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
	name         : 'profile',
	initialState : {
		_initialized: false,
	},
	reducers: {
		setProfileState: (state, action) => {
			console.log({ a: action.payload });
			state = { ...state, ...action.payload };
			console.log({ state });
			return state;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setProfileState } = profileSlice.actions;

export default profileSlice.reducer;
