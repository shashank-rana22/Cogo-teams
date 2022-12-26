import { configureStore } from '@reduxjs/toolkit';

import reducers from './reducers';

export {
	Provider,
	connect,
	shallowEqual,
	useSelector,
	useDispatch,
	useStore,
} from 'react-redux';

export default configureStore({
	reducer: reducers,
});
