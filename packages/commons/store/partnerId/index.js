import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	partnerId: 'trestinf',
};

export const partnerIdSlice = createSlice({
	name     : 'partnerIds',
	initialState,
	reducers : {
		addPartnerId: (state, action) => {
			const newpartnerId = action.payload;
			return { partnerId: newpartnerId };
		},
		removePartnerId: () => ({ partnerId: '' }),
	},
});

export const { addPartnerId, removePartnerId } = partnerIdSlice.actions;
export default partnerIdSlice.reducer;
