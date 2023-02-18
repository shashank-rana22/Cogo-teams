import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

function useUpdateAssignedChat({ messageData, onClose = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_assigned_chat',
		method : 'post',
	}, { manual: true });

	const { channel_type, id, user_details } = messageData || {};
	const { user_id } = user_details || {};
	const updateChat = async ({ selectPill, inputValue }) => {
		try {
			await trigger({
				data: {
					channel           : channel_type,
					channel_chat_id   : id,
					feedback          : inputValue,
					feedback_category : selectPill,
					user_id,
				},
			});
			Toast.success('Update Successful');
			onClose();
		} catch (error) {
			Toast.error(error?.message);
		}
	};

	return {
		updateChat,
		loading,
	};
}

export default useUpdateAssignedChat;
