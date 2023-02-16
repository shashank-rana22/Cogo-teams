import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetListNotes({ activeMessageCard, active }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_omnichannel_notes',
		method : 'get',
	}, { manual: true });

	const fetchListNotes = async () => {
		try {
			let payload;
			if (active) {
				payload = {
					channel_chat_id : '2T85TebJo8ohRBtEJXf0',
					agent_id        : '7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44',
				};
			} else {
				payload = {
					channel_chat_id: '2T85TebJo8ohRBtEJXf0',
				};
			}
			await trigger({
				params: payload,
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.data));
		}
	};

	useEffect(() => {
		fetchListNotes();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeMessageCard, active]);

	return {
		listLoading : loading,
		noteData    : data,
		fetchListNotes,
	};
}
export default useGetListNotes;
