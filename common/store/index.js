import { devToolsEnhancer } from '@redux-devtools/extension';
import { configureStore } from '@reduxjs/toolkit';

import profileReducer from './slices/profileSlice';

export default configureStore({
	reducer   : { profile: profileReducer },
	enhancers : () => [devToolsEnhancer({ realtime: true, port: 8000 })],
	devTools  : false,
});
