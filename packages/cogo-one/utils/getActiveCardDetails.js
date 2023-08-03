import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

const getActiveCardDetails = (data = {}) => {
	const {
		channel_type = '',
		user_details = {},
		user_id = '',
		user_name = 'User',
		organization_id = '',
		organization_name = '',
		mobile_no = '',
		lead_user_id = '',
		user_email = '',
		user_type = '',
		sender = null,
		country_code = '',
		cogo_entity_id = '',
		...rest
	} = data || {};
	const lowerCasedName = user_name?.toLowerCase();
	const cogoEntityId = cogo_entity_id || GLOBAL_CONSTANTS.country_entity_ids[country_code] || '';

	if (isEmpty(user_details)) {
		return {
			...rest,
			user_name,
			mobile_no,
			lead_user_id,
			user_id,
			channel_type,
			user_type,
			search_user_name : lowerCasedName,
			cogo_entity_id   : cogoEntityId,
			sender,
			organization_id,
			organization_name,
			email            : user_email,
		};
	}

	const {
		business_name,
		name,
		organization_id: detailsOrgId,
		user_id: detailsUserId,
		email,
		cogo_entity_id:orgCogoEntityId = '',
		account_type = '',
		kyc_status = '',
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
		search_user_name  : lowerCasedName,
		cogo_entity_id    : orgCogoEntityId,
		account_type,
		sender,
		kyc_status,
	};
};
export default getActiveCardDetails;
