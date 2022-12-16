import { isEmpty } from '@cogoport/utils';

import { setProfileStoreState } from '../stores';

import getUserSession from './getUserSession';

const getUserData = async ({ store, isServer, req }) => {
	let user_data = null;

	const setData = async () => {
		try {
			const data = await getUserSession({ req });

			console.log('datadatadatadatadata', data);

			if (!data.hasError && !isEmpty(data) && !isEmpty(data.data)) {
				const { user, partner } = data.data;
				const partners = data.data.partners || [];

				user_data = {
					...user,
					partners: partner ? [partner] : partners,
				};

				if (user_data.id) {
					await store.dispatch(setProfileStoreState(user_data));
				}
			}
		} catch (e) {
			console.log(e);
		}
	};

	if (isServer) {
		await setData();
	} else {
		user_data = store.getState().profile;
	}

	return user_data;
};

export default getUserData;
