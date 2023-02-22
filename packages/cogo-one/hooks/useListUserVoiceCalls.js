import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useListUserVoiceCalls = (filters = {}) => {
	const [listData, setListData] = useState({
		list  : [],
		total : 0,
	});

	const [pagination, setPagination] = useState(1);

	const [{ loading }, trigger] = useRequest({
		url    : '/list_user_call_details',
		method : 'get',
	}, { manual: true });

	const voiceCallList = async () => {
		try {
			const res = await trigger({
				params: {
					page    : pagination,
					filters : { ...filters },
				},
			});
			if (res.data) {
				const { list = [], ...paginationData } = res?.data || {};
				setListData((p) => ({ list: [...(p.list || []), ...(list || [])], ...paginationData }));
			}
		} catch (e) {
			console.log('e', e);
		}
	};

	const handleScroll = (scrollTop) => {
		const reachBottom = scrollTop === 0;
		const hasMoreData = pagination < listData?.total;
		if (reachBottom && hasMoreData && !loading) {
			setPagination((p) => p + 1);
		}
	};
	useEffect(() => {
		voiceCallList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination]);
	useEffect(() => {
		setListData({
			list  : [],
			total : 0,
		});
		setPagination(1);
		voiceCallList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(filters)]);

	return {
		loading,
		listData,
		handleScroll,
	};
};
export default useListUserVoiceCalls;
