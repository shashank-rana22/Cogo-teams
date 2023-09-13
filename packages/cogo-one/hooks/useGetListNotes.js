import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import { FIREBASE_TABS } from '../constants';

const getParams = ({ activeTab, id, user_number, active, user_id }) => ({
	filters: {
		channel_chat_id : FIREBASE_TABS.includes(activeTab) ? id : user_number,
		agent_id        : active ? user_id : undefined,
	},
});

function useGetListNotes({ active, activeMessageCard = {}, activeTab = '', activeVoiceCard = {} }) {
	const { profile } = useSelector((state) => state);
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_omnichannel_notes',
		method : 'get',
	}, { manual: true });

	const { id } = activeMessageCard || {};
	const user_id = profile?.user?.id;
	const { user_number } = activeVoiceCard || {};

	const fetchListNotes = async () => {
		try {
			await trigger({
				params: getParams({ activeTab, id, user_number, active, user_id }),
			});
		} catch (e) {
			console.error('e:', e);
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
