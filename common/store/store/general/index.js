import { syncTypes } from './_types';

const initialState = {};

const storeGeneral = (state = initialState, action) => {
	switch (action.type) {
		case syncTypes.SET_STORE_STATE:
			return { ...state, ...action.data };
		default:
			return state;
	}
};

export * from './actions';

export default storeGeneral;
