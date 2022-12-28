import { createSlice } from '@reduxjs/toolkit';

const isServer = typeof window === 'undefined';

export const counterSlice = createSlice({
	name         : 'general',
	initialState : {
		scope: 'partner',
		isServer,
	},
	reducers: {
		setGeneralState: (state, data) => {
			state = { ...(state || {}), ...(data?.payload || {}) };
			return state;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setGeneralState } = counterSlice.actions;

export default counterSlice.reducer;
