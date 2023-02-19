import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

function useGetListNotes({ active, activeMessageCard, activeTab, activeVoiceCard }) {
	const { profile } = useSelector((state) => state);
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_omnichannel_notes',
		method : 'get',
	}, { manual: true });

	const { id } = activeMessageCard || {};
	const { id: roomId } = activeVoiceCard || {};

	const fetchListNotes = async () => {
		await trigger({
			params: {
				channel_chat_id : activeTab === 'message' ? id : roomId,
				agent_id        : active ? profile?.user?.id : undefined,
			},
		});
	};

	useEffect(() => {
		fetchListNotes();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active, activeMessageCard, activeVoiceCard]);

	return {
		listLoading : loading,
		noteData    : data,
		fetchListNotes,
	};
}
export default useGetListNotes;
