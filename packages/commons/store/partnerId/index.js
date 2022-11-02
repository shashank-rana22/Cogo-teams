import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	partnerId: 'testing-543-5342-4323',
};

export const partnerIdSlice = createSlice({
	name     : 'partnerIds',
	initialState,
	reducers : {
		addPartnerId: (state, action) => {
			state.partnerId = action.payload;
		},
		removePartnerId: (state) => {
			state.partnerId = '';
		},
	},
});

export const { addPartnerId, removePartnerId } = partnerIdSlice.actions;
export default partnerIdSlice.reducer;
