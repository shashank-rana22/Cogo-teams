import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
	name         : 'userSettings',
	initialState : [],
	reducers     : {
		setUserSettingsState: (state, data) => ([...state, ...data.payload]),
	},
});

// Action creators are generated for each case reducer function
export const { setUserSettingsState } = counterSlice.actions;

export default counterSlice.reducer;
