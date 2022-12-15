import { syncTypes } from './_types';

const initialState = {};

export * from './actions';

const storeProfile = (state = initialState, action) => {
	switch (action.type) {
		case syncTypes.SET_STORE_STATE:
			return { ...state, ...action.data };
		default:
			return state;
	}
};

export default storeProfile;
