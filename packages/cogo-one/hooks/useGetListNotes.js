import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetListNotes({ activeMessageCard, active }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_omnichannel_notes',
		method : 'get',
	}, { manual: true });

	const fetchListNotes = async () => {
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
	};
	useEffect(() => {
		fetchListNotes();
	}, [activeMessageCard]);

	return {
		listLoading : loading,
		noteData    : data,
		fetchListNotes,
	};
}
export default useGetListNotes;
