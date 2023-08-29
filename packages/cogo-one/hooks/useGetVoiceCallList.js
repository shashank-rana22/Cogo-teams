import { useRequest } from '@cogoport/request';
// import { isEmpty } from '@cogoport/utils';
import { useEffect, useState, useCallback } from 'react';

const DEFAULT_PAGINATION = 1;
const MIN_HEIGHT = 0;

const getPayload = ({ pagination = 1, agent = '', user_number = '' }) => ({
	params: {
		page    : pagination,
		source  : 'omnichannel',
		filters : {
			agent_id : agent || undefined,
			q        : user_number || undefined,
		},
	},
});

const useGetVoiceCallList = () => {
	const [listData, setListData] = useState({
		list  : [],
		total : 0,
	});

	const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
	const [appliedFilters, setAppliedFilters] = useState({});

	const { agent = '', user_number = '' } = appliedFilters || {};

	const [{ loading }, trigger] = useRequest({
		url    : '/list_user_call_details',
		method : 'get',
	}, { manual: true });

	const voiceCallList = useCallback(async () => {
		try {
			// if (!isEmpty(appliedFilters)) {
			// 	setListData({
			// 		list  : [],
			// 		total : 0,
			// 	});
			// }
			const res = await trigger(getPayload({
				pagination,
				agent,
				user_number,
			}));

			if (res.data) {
				const { list = [], ...paginationData } = res?.data || {};
				setListData((prev) => ({ list: [...(prev.list || []), ...(list || [])], ...paginationData }));
			}
		} catch (error) {
			console.error(error);
		}
	}, [agent, pagination, trigger, user_number]);

	const handleScroll = (clientHeight, scrollTop, scrollHeight) => {
		const reachBottom = scrollHeight - (clientHeight + scrollTop) <= MIN_HEIGHT;
		const hasMoreData = pagination < listData?.total;

		if (reachBottom && hasMoreData && !loading) {
			setPagination((p) => p + DEFAULT_PAGINATION);
		}
	};

	useEffect(() => {
		voiceCallList();
	}, [voiceCallList]);

	return {
		loading,
		data: listData,
		handleScroll,
		setAppliedFilters,
		appliedFilters,
	};
};
export default useGetVoiceCallList;
