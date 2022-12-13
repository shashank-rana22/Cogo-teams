import { configureStore } from '@reduxjs/toolkit';

import partnerIdReducer from './partnerId';
import userReducer from './user';

const store = configureStore({
	reducer: {
		partnerIdStore : partnerIdReducer,
		userStore      : userReducer,
	},
});

export default store;
