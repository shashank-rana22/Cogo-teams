import { isEmpty } from '@cogoport/utils';

function FormatData({ activeMessageCard, activeTab, activeVoiceCard }) {
	let userName = 'Unknown user';
	let userMail = '';
	let countryCode = '';
	let userMobile = '';
	let orgId = '';
	let userId = '';
	let agentId = '';

	if (activeTab === 'voice') {
		const { user_data, user_number, organization_id, agent_id } = activeVoiceCard || {};
		const { email = '', id = '', mobile_country_code = '', name = '' } = user_data || {};
		userName = name;
		userMail = email;
		countryCode = mobile_country_code;
		userMobile = isEmpty(user_data) ? user_number : `${mobile_country_code} ${user_number}`;
		orgId = organization_id;
		userId = id;
		agentId = agent_id;
	} else {
		const { user_details, user_id: num, agent_id, user_name, channel_type } = activeMessageCard || {};

		userMobile = channel_type === 'whatsapp' ? `+${num}` : '-';
		if (isEmpty(user_details)) {
			agentId = agent_id;
			userName = user_name;
		} else {
			const { user_id, name, email, organization_id } = user_details || {};
			userId = user_id;
			userName = name;
			userMail = email;
			orgId = organization_id;
			agentId = agent_id;
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
	};
}
export default FormatData;
