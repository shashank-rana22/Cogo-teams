import { configureStore, autoBatchEnhancer } from '@reduxjs/toolkit';

import profileReducer from './slices/profileSlice';

export default configureStore({
	reducer: {
		profile: profileReducer,
	},
	enhancers : (existingEnhancers) => existingEnhancers.concat(autoBatchEnhancer()),
	devTools  : process.env.NODE_ENV !== 'production',
});
