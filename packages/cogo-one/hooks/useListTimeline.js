/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useListTimeLine = ({
	activeSubTab,
	id,
	user_id,
	lead_user_id,
}) => {
	const [page, setPage] = useState(1);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_cogoone_timeline',
		method : 'get',
	}, { manual: true });

	const fetchTimeLine = async () => {
		try {
			await trigger({
				params: {
					channel_chat_id: id,
					page,
				},
			});
		} catch (error) {
			// console.log(error);
		}
	};

	useEffect(() => {
		if (activeSubTab === 'agent' && (user_id || lead_user_id)) {
			fetchTimeLine();
		}
	}, [activeSubTab, page]);

	return {
		loading,
		data,
		fetchTimeLine,
		page,
		setPage,
	};
};

export default useListTimeLine;
