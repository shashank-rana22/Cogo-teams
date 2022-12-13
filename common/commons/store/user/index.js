import { setCookie } from '@cogoport/utils';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	token      : '',
	auth_scope : '',
	data       : {},
};

export const userSlice = createSlice({
	name     : 'users',
	initialState,
	reducers : {
		addUserLoginData: (state, action) => {
			const { token, auth_scope } = action.payload;
			setCookie('token', token, 1);
			setCookie('auth_scope', auth_scope, 1);
			return { ...state, token, auth_scope };
		},
		addUserProfileData: (state, action) => {
			const { payload } = action;
			return { ...state, data: payload };
		},
	},
});
export const { addUserLoginData, addUserProfileData } = userSlice.actions;
export default userSlice.reducer;
