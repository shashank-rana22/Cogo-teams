import { setUserProfile } from '@cogoport/store/slices/profileSlice';
import { isEmpty } from '@cogoport/utils';

import getUserSession from './getUserSession';

const getUserData = async ({
	store, isServer, pathname, req,
}) => {
	let user_data = null;

	const setData = async () => {
		try {
			const data = await getUserSession({ req });

			if (!data.hasError && !isEmpty(data) && !isEmpty(data.data)) {
				const {
					user,
					partner,
					partners,
					session_type,
					team_member_ids,
					permissions_navigations,
				} = (data || {}).data || {};

				user_data = (data || {}).data || {};
				user_data = {
					...user,
					partner,
					partners : partner ? [partner] : partners,
					session_type,
					team_member_ids,
					permissions_navigations,
					asPrefix : partner?.id,
					// authorizationparameters : getAuthParam(
					// 	permissions_navigations,
					// 	routeConfig,
					// 	pathname,
					// ),
				};
			}
			// console.log('user_data', user_data);
			await store.dispatch(setUserProfile(user_data));
		} catch (e) {
			console.log('in catch');
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
