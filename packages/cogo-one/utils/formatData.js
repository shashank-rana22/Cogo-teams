import { isEmpty } from '@cogoport/utils';

function FormatData({
	activeMessageCard = {},
	activeTab = 'message',
	activeVoiceCard = {},
}) {
	let userName = '';
	let userMail = '';
	let userMobile = '';
	let orgId = '';
	let userId = '';
	let channelType = '';
	let leadUserId = '';
	let businessName = '';

	if (activeTab === 'voice') {
		const { user_data = {}, user_number = '', organization_id = '', channel_type = '' } = activeVoiceCard || {};
		const { email = '', id = '', name = '' } = user_data || {};
		userName = name;
		userMail = email;
		userMobile = user_number === null ? '' : `+91 ${user_number}`;
		orgId = organization_id !== null ? organization_id : '';
		userId = id;
		channelType = channel_type;
	} else {
		const { user_details = null, channel_type } = activeMessageCard || {};

		const { user_name, mobile_no } = activeMessageCard || {};
		if (!isEmpty(user_details) && channel_type === 'whatsapp') {
			const { business_name, email, organization_id, user_id } = user_details || {};
			userName = user_name;
			userMobile = mobile_no;
			businessName = business_name;
			userMail = email;
			orgId = organization_id;
			userId = user_id;
		} else {
			const { lead_user_id, organization_id, user_id } = activeMessageCard || {};
			userId = user_id;
			userName = user_name;

			if (isEmpty(user_details) && channel_type === 'whatsapp') {
				userMobile = mobile_no;
			} else {
				leadUserId = lead_user_id;
				orgId = organization_id;
			}
		}
	}

	return {
		userId,
		userMail,
		userMobile,
		userName,
		orgId,
		leadUserId,
		businessName,
		channelType,
	};
}
export default FormatData;
