/* eslint-disable react-hooks/exhaustive-deps */

import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const DEFAULT_PAGINATION = 1;
const MIN_HEIGHT = 0;

const getPayload = ({ pagination, filters }) => ({
	page                        : pagination,
	filters                     : { ...filters },
	communication_logs_required : true,
});

const useListUserVoiceCalls = (filters = {}) => {
	const [listData, setListData] = useState({
		list  : [],
		total : 0,
	});

	const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

	const [{ loading }, trigger] = useRequest({
		url    : '/list_user_call_details',
		method : 'get',
	}, { manual: true });

	const voiceCallList = async () => {
		try {
			const res = await trigger({
				params: getPayload({ pagination, filters }),
			});
			if (res.data) {
				const { list = [], ...paginationData } = res?.data || {};
				setListData((p) => ({ list: [...(p.list || []), ...(list || [])], ...paginationData }));
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleScroll = (scrollTop) => {
		const reachBottom = scrollTop === MIN_HEIGHT;
		const hasMoreData = pagination < listData?.total;
		if (reachBottom && hasMoreData && !loading) {
			setPagination((p) => p + DEFAULT_PAGINATION);
		}
	};
	useEffect(() => {
		voiceCallList();
	}, [pagination]);
	useEffect(() => {
		setListData({
			list  : [],
			total : 0,
		});
		setPagination(DEFAULT_PAGINATION);
		voiceCallList();
	}, [JSON.stringify(filters)]);

	return {
		loading,
		listData,
		handleScroll,
	};
};
export default useListUserVoiceCalls;
