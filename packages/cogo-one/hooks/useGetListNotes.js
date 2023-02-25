import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

function useGetListNotes({ active, activeMessageCard = {}, activeTab = '', activeVoiceCard = {} }) {
	const { profile } = useSelector((state) => state);
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_omnichannel_notes',
		method : 'get',
	}, { manual: true });

	const { id } = activeMessageCard || {};
	const { user_number } = activeVoiceCard || {};

	const fetchListNotes = async () => {
		try {
			await trigger({
				params: {
					filters: {
						channel_chat_id : activeTab === 'message' ? id : user_number,
						agent_id        : active ? profile?.user?.id : undefined,
					},
				},
			});
		} catch (e) {
			// console.log("e:", e)

		}
	};

	useEffect(() => {
		fetchListNotes();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active, id, user_number]);

	return {
		listLoading : loading,
		noteData    : data,
		fetchListNotes,

	};
}
export default useGetListNotes;
