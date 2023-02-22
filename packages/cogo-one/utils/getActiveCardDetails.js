import { isEmpty } from '@cogoport/utils';

const getActiveCardDetails = (data = {}) => {
	const {
		channel_type = '',
		user_details = {},
		user_id = '',
		user_name = '',
		organization_id = '',
		organization_name = '',
		mobile_no = '',
		lead_user_id = '',
		user_email = '',
		user_type = '',
		sender = null,
		...rest
	} = data || {};

	if (channel_type === 'platform_chat') {
		return {
			...rest,
			user_id,
			user_name,
			organization_id,
			organization_name,
			lead_user_id,
			channel_type,
			mobile_no,
			user_type,
			sender,
			email: user_email,

		};
	}
	if (isEmpty(Object.keys(user_details || {}))) {
		return {
			...rest,
			user_name,
			mobile_no,
			lead_user_id,
			user_id: null,
			channel_type,
			user_type,
		};
	}

	const {
		business_name,
		name,
		organization_id: detailsOrgId,
		user_id: detailsUserId,
		email,
	} = user_details || {};

	return {
		...rest,
		organization_name : business_name,
		user_name         : name,
		organization_id   : detailsOrgId,
		user_id           : detailsUserId,
		mobile_no,
		lead_user_id,
		channel_type,
		email,
		user_type,
	};
};
export default getActiveCardDetails;
