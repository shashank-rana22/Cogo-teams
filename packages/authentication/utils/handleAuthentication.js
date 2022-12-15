import { request } from '@cogoport/request/helpers/request';
import { addProfile } from '@cogoport/store/reducers/profileReducer';
import { isEmpty } from '@cogoport/utils';

const handleAuthentication = async ({
	store,
	req,
	isServer,
}) => {
	const asPrefix = '';

	let user_data = {};

	if (isServer) {
		try {
			const { data } = await request.get('/get_user_session', { req });

			if (data?.hasError) {
				// redirect({ isServer, res, path: '/login' });
				return { asPrefix };
			}

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
				partners: partner ? [partner] : partners,
				session_type,
				team_member_ids,
				permissions_navigations,
			};
			await store.dispatch(addProfile(user_data));
		} catch (e) {
			// redirect({ isServer, res, path: '/login' });
			return { asPrefix };
		}
	} else {
		user_data = store.getState().profile;
	}

	if (isEmpty(user_data) || !user_data?.partner) {
		// redirect({ isServer, res, path: '/login' });
		return { asPrefix };
	}
	return { asPrefix };
};

export default handleAuthentication;
