import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useSendMessage = ({ channel_type = '' }) => {
	const {
		user_data:{ user:{ id } },
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const API_MAPPING = {
		whatsapp : 'create_communication',
		chatbot  : 'create_communication_platform_chat',
	};

	const [{ loading }, trigger] = useRequest({
		url    : `/${API_MAPPING[channel_type]}`,
		method : 'post',
	}, { manual: true });

	const sendMessage = async ({ recipient, message_metadata, user_id, organization_id }) => {
		await trigger({
			data: {
				type       : 'whatsapp',
				recipient,
				message_metadata,
				user_id,
				organization_id,
				service    : 'user',
				service_id : id,
				source     : 'CogoVerse',

			},
		});
	};
	return {
		sendMessage,
		loading,
	};
};
export default useSendMessage;
