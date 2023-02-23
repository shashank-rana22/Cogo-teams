import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useSendMessage = ({ channel_type = '', sender = null }) => {
	const API_MAPPING = {
		whatsapp      : 'create_communication',
		platform_chat : 'create_communication_platform_chat',
	};
	const {
		user:{ id },

	} = useSelector(({ profile }) => profile);
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
		try {
			await trigger({
				data: {
					type       : channel_type,
					recipient,
					message_metadata,
					user_id,
					organization_id,
					service    : 'user',
					service_id : id,
					source     : 'CogoOne:AdminPlatform',
					lead_user_id,
					sender,
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
