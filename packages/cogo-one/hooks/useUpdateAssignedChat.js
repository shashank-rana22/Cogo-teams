import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import useCreateCogooneTimeline from './useCreateCogooneTimeline';

const getPayload = ({
	data = {},
	channel_type = '',
	id = '',
	user_id = '',
	lead_user_id = '',
	mobile_no = '',
	organization_id = '',
	sender = '',
}) => ({
	channel                 : channel_type,
	channel_chat_id         : id,
	user_id                 : user_id || undefined,
	lead_user_id            : (!(user_id) && lead_user_id) ? lead_user_id : undefined,
	whatsapp_number_eformat : channel_type === 'whatsapp' ? mobile_no : undefined,
	organization_id,
	sender,
	...data,
});

const getTimelinePayload = ({ channel_type, id, reason }) => ({
	channel           : channel_type,
	channel_chat_id   : id,
	conversation_type : 'tag_changed',
	reason,
});

function useUpdateAssignedChat({ activeMessageCard = {}, onClose = () => {}, formattedData }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_assigned_chat',
		method : 'post',
	}, { manual: true });

	const { createCogooneTimeline = () => {} } = useCreateCogooneTimeline();

	const {
		user_id = null,
		mobile_no = '',
		lead_user_id = null,
		organization_id = null,
		sender = null,
	} = formattedData || {};
	const { channel_type, id } = activeMessageCard || {};

	const updateChat = async (data = {}) => {
		const { action = '', reason = '', ...restData } = data || {};

		try {
			await trigger({
				data: getPayload({
					data: restData,
					channel_type,
					id,
					user_id,
					lead_user_id,
					mobile_no,
					organization_id,
					sender,
				}),
			});
			Toast.success('updated sucessfully');
			onClose();

			if (action === 'tags_changed' && reason) {
				createCogooneTimeline({ payload: getTimelinePayload({ channel_type, id, reason }) });
			}
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		updateChat,
		loading,
	};
}

export default useUpdateAssignedChat;
