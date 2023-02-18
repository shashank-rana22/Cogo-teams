import { isEmpty } from '@cogoport/utils';

const getActiveCardDetails = (data = {}) => {
	const {
		channel_type = '',
		user_details = {},
		user_id = '',
		user_name = '',
		organization_id = '',
		organization_name = '',
	} = data || {};
	if (channel_type === 'chatbot') {
		return { user_id, user_name, organization_id, organization_name };
	}
	if (isEmpty(Object.keys(user_details || {}))) {
		return {
			user_name     : user_name || user_id,
			mobile_number : user_id,
			user_id       : null,
		};
	}
	const { business_name, name, organization_id:detailsOrgId, user_id:detailsUserId } = user_details || {};

	return {
		organization_name : business_name,
		user_name         : name,
		organization_id   : detailsOrgId,
		user_id           : detailsUserId,
		mobile_number     : user_id,
	};
};
export default getActiveCardDetails;
