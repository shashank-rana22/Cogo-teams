import { configureStore } from '@reduxjs/toolkit';

import profileReducer from './slices/profileSlice';

export {
	Provider,
	connect,
	shallowEqual,
	useSelector,
	useDispatch,
	useStore,
} from 'react-redux';

export default configureStore({
	reducer  : { profile: profileReducer },
	devTools : true,
});
