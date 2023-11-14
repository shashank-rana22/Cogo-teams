import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const DEFAULT_PAGINATION = 1;
const MIN_HEIGHT = 0;
const DEFAULT_VALUE = 0;

const getPayload = ({ pagination, userId, userNumber }) => ({
	page    : pagination,
	filters : {
		user_id     : userId || undefined,
		user_number : !userId ? userNumber : undefined,
	},
	communication_logs_required: true,
});

const useListUserVoiceCalls = ({ userId = '', userNumber = '' }) => {
	const [listData, setListData] = useState({
		list        : [],
		total       : 0,
		page        : 1,
		initialLoad : false,
	});

	const [{ loading }, trigger] = useRequest({
		url    : '/list_user_call_details',
		method : 'get',
	}, { manual: true });

	const voiceCallList = useCallback(async ({ page = 1 }) => {
		try {
			const res = await trigger({
				params: getPayload({ pagination: page, userId, userNumber }),
			});
			if (res.data) {
				const { list = [], ...paginationData } = res?.data || {};
				setListData((p) => ({
					list        : [...(p.list || []), ...(list || [])],
					...paginationData,
					initialLoad : true,
				}));
			}
		} catch (error) {
			console.error(error);
		}
	}, [trigger, userId, userNumber]);

	const handleScroll = (scrollTop) => {
		const reachBottom = scrollTop === MIN_HEIGHT;
		const hasMoreData = listData?.page < listData?.total;

		if (reachBottom && hasMoreData && !loading) {
			voiceCallList({ page: (listData?.page || DEFAULT_VALUE) + DEFAULT_PAGINATION });
		}
	};

	useEffect(() => {
		setListData({
			list  : [],
			total : 0,
			page  : 1,
		});

		voiceCallList({ page: 1 });
	}, [voiceCallList]);

	return {
		loading,
		listData,
		handleScroll,
	};
};
export default useListUserVoiceCalls;
