import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import getActiveCardDetails from '../utils/getActiveCardDetails';

function useBulkAssignChat({ setSelectedAutoAssign = () => {}, setAutoAssignChats = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/bulk_assign_chat',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const bulkAssignChat = async ({ selectedAutoAssign = {} }) => {
		const chats = Object.values(selectedAutoAssign) || [];

		const payload = chats.map((chat) => {
			console.log('chat:', chat);

			const {
				channel_type = '',
				id = '',
				user_id = '',
				mobile_no = '',
				sender = '',
				lead_user_id = '',
				organization_id = '',
			} = getActiveCardDetails(chat) || {};

			return {
				channel                 : channel_type,
				channel_chat_id         : id,
				user_id,
				whatsapp_number_eformat : channel_type === 'whatsapp' ? mobile_no : undefined,
				lead_user_id            : (!(user_id) && lead_user_id) ? lead_user_id : undefined,
				organization_id,
				sender,

			};
		});

		try {
			await trigger({
				data: { chats: payload },
			});

			Toast.success('Successfully Auto Assigned');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		} finally {
			setSelectedAutoAssign({});
			setAutoAssignChats(true);
		}
	};
	return {
		bulkAssignChat,
		bulkAssignLoading: loading,
	};
}
export default useBulkAssignChat;
