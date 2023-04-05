import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { addDoc, updateDoc } from 'firebase/firestore';

import { COGOVERSE_USER_ID } from '../constants/IDS_CONSTANTS';

const useSendMessage = ({ channel_type = '', activeChatCollection }) => {
	const API_MAPPING = {
		whatsapp      : '/create_communication',
		platform_chat : '/create_communication_platform_chat',
		telegram      : '/create_communication',
	};
	const {
		user:{ id },

	} = useSelector(({ profile }) => profile);

	const [{ loading }, trigger] = useRequest(
		{
			url    : API_MAPPING[channel_type],
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
		let service = 'user';
		let service_id = COGOVERSE_USER_ID;
		if (user_id) {
			service_id = user_id;
		} else if (!user_id && lead_user_id) {
			service = 'lead_user';
			service_id = lead_user_id;
		}
		try {
			const res = await trigger({
				data: {
					type           : channel_type,
					recipient,
					message_metadata,
					user_id,
					organization_id,
					service,
					service_id,
					source         : 'CogoOne:AdminPlatform',
					lead_user_id,
					sender         : channel_type === 'platform_chat' ? id : undefined,
					sender_user_id : id,
				},
			});
			await addDoc(activeChatCollection, { ...adminChat, communication_id: res.data.id });
			scrollToBottom();
			const old_count = document.data().new_user_message_count;

			await updateDoc(messageFireBaseDoc, {
				new_message_count      : 0,
				last_message_document  : { ...adminChat, communication_id: res.data.id } || {},
				new_message_sent_at    : Date.now(),
				new_user_message_count : old_count + 1,
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
