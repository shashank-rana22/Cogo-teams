import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { doc } from 'firebase/firestore';

function useAssignChat({ messageFireBaseDoc, setRoomData }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/assign_chat',
		method : 'post',
	}, { manual: true });

	const assignChat = async () => {
		try {
			await trigger();

			Toast.success('Successfully Assigned');
		} catch (error) {
			Toast.error(error?.message);
		}
	};
	return {
		assignChat,
		loading,
	};
}
export default useAssignChat;
