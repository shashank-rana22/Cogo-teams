import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetListNotes({ activeMessageCard, active }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_omnichannel_notes',
		method : 'get',
	}, { manual: true });

	const { agent_id, id } = activeMessageCard || {};

	const fetchListNotes = async () => {
		let payload;
		if (active) {
			payload = {
				channel_chat_id: id,
				agent_id,
			};
		} else {
			payload = {
				channel_chat_id: id,
			};
		}
		await trigger({
			params: payload,
		});
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
