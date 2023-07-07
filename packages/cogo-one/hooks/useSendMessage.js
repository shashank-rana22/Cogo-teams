import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { addDoc, updateDoc } from 'firebase/firestore';

import { API_MAPPING } from '../constants';

const geo = getGeoConstants();

const INCREASE_MESSAGE_COUNT_BY_ONE = 1;

const useSendMessage = ({ channelType = '', activeChatCollection, formattedData }) => {
	const {
		user: { id },
	} = useSelector(({ profile }) => profile);

	const [{ loading }, trigger] = useRequest(
		{
			url    : API_MAPPING[channelType],
			method : 'post',
		},
		{ manual: true, autoCancel: false },
	);

	const sendMessage = async ({
		recipient,
		message_metadata,
		user_id = null,
		organization_id = null,
		lead_user_id = null,
		adminChat,
		document,
		messageFireBaseDoc,
		scrollToBottom,
	}) => {
		const { agent_type = '' } = formattedData || {};

		let service = 'user';
		let service_id = geo.uuid.cogoverse_user_id;

		if (user_id) {
			service_id = user_id;
		} else if (!user_id && lead_user_id) {
			service = 'lead_user';
			service_id = lead_user_id;
		}

		try {
			const res = await trigger({
				data: {
					type           : channelType,
					recipient,
					message_metadata,
					user_id,
					organization_id,
					service,
					service_id,
					source         : 'CogoOne:AdminPlatform',
					lead_user_id,
					sender         : channelType === 'platform_chat' ? id : undefined,
					sender_user_id : id,
				},
			});

			const lastMessageDocument = {
				...adminChat,
				agent_type       : agent_type || 'bot',
				communication_id : res?.data?.id,
			};

			await addDoc(activeChatCollection, lastMessageDocument);

			scrollToBottom();
			const old_count = document.data().new_user_message_count;

			await updateDoc(messageFireBaseDoc, {
				new_message_count         : 0,
				has_admin_unread_messages : false,
				last_message              : adminChat.response.message || '',
				last_message_document     : lastMessageDocument,
				new_message_sent_at       : Date.now(),
				new_user_message_count    : old_count + INCREASE_MESSAGE_COUNT_BY_ONE,
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		sendMessage,
		loading,
	};
};

export default useSendMessage;
