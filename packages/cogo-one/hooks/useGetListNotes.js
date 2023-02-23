import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

function useGetListNotes({ active, activeMessageCard = {}, activeTab = '', activeVoiceCard = {} }) {
	const [firstLoading, setFirstLoading] = useState(true);
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
			setFirstLoading(false);
		} catch (error) {
			console.log(error);
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
		firstLoading,
	};
}
export default useGetListNotes;
