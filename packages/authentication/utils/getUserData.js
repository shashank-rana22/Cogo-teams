import getAuthParam from '@cogoport/request/helpers/get-auth-params';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { isEmpty } from '@cogoport/utils';

import getUserSession from './getUserSession';

const getUserData = async ({
	store, isServer, pathname, req,
}) => {
	let user_data = {};

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

				user_data = {
					...user,
					partner,
					partners                : partner ? [partner] : partners,
					session_type,
					team_member_ids,
					permissions_navigations,
					asPrefix                : partner?.id,
					pathname,
					authorizationparameters : getAuthParam(
						permissions_navigations,
						pathname,
					),
				};
			}
			if (user_data.id) {
				await store.dispatch(setProfileState(user_data));
			}
		} catch (e) {
			// console.log(e.error);
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
