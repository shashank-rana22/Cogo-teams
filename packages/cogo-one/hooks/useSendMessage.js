import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useSendMessage = ({ channel_type = '' }) => {
	const API_MAPPING = {
		whatsapp      : 'create_communication',
		platform_chat : 'create_communication_platform_chat',
	};

	const [{ loading }, trigger] = useRequest(
		{
			url    : `/${API_MAPPING[channel_type]}`,
			method : 'post',
		},
		{ manual: true },
	);

	const sendMessage = async ({
		recipient,
		message_metadata,
		user_id = null,
		organization_id = null,
		lead_user_id = null,
	}) => {
		let service = 'user';
		if (!user_id && lead_user_id) {
			service = 'lead_user';
		}
		let service_id;
		if (user_id) {
			service_id = user_id;
		} else if (!user_id && lead_user_id) {
			service_id = lead_user_id;
		}
		try {
			await trigger({
				data: {
					type   : channel_type,
					recipient,
					message_metadata,
					user_id,
					organization_id,
					service,
					service_id,
					source : 'CogoOne:AdminPlatform',
					lead_user_id,
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err));
		}
	};
	return {
		sendMessage,
		loading,
	};
};
export default useSendMessage;
