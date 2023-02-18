import { isEmpty } from '@cogoport/utils';

function FormatData({ activeMessageCard, activeTab, activeVoiceCard }) {
	let userName = 'Unknown user';
	let userMail = '';
	let countryCode = '';
	let userMobile = '';
	let orgId = '';
	let userId = '';
	let agentId = '';
	let channelType = '';

	if (activeTab === 'voice') {
		const { user_data, user_number, organization_id, agent_id, channel_type } = activeVoiceCard || {};
		const { email = '', id = '', mobile_country_code = '', name = '' } = user_data || {};
		userName = name;
		userMail = email;
		countryCode = mobile_country_code;
		userMobile = `+91${user_number}`;
		orgId = organization_id !== null ? organization_id : '';
		userId = id;
		agentId = agent_id;
		channelType = channel_type;
	} else {
		const { user_details, user_name, channel_type, mobile_no, channel_type: channel } = activeMessageCard || {};

		userMobile = channel_type === 'whatsapp' ? `+${mobile_no}` : '';
		if (isEmpty(user_details)) {
			userName = user_name;
			channelType = channel;
		} else {
			const { name, email, organization_id, user_id } = user_details || {};
			userId = user_id;
			userName = name;
			userMail = email;
			orgId = organization_id;
			channelType = channel;
		}
	}

	return {
		userId,
		userMail,
		userMobile,
		userName,
		orgId,
		agentId,
		countryCode,
		channelType,
	};
}
export default FormatData;
