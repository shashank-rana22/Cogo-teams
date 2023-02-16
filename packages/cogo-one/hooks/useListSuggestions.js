/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

function useListSuggestions() {
	const [{ loading }, trigger] = useRequest({
		url    : '/list_chat_suggestions',
		method : 'get',
	}, { manual: true });

	const [qfilter, setQfilter] = useState('');
	const [pagination, setPagination] = useState(1);
	const [infiniteList, setInfiniteList] = useState({
		list  : [],
		total : 0,
	});

	const fetchListLogApi = async () => {
		const res = await trigger({
			params: {
				page    : pagination,
				filters : {
					q: !isEmpty(qfilter?.trim()) ? qfilter?.trim() : undefined,
				},
			},
		});
		if (res?.data) {
			const { list = [], ...paginationData } = res?.data || {};
			setInfiniteList((p) => ({ list: [...(p.list || []), ...(list || [])], ...paginationData }));
		}
	};

	useEffect(() => {
		setPagination(1);
		fetchListLogApi();
	}, [qfilter]);

	useEffect(() => {
		fetchListLogApi();
	}, [pagination]);

	const handleScroll = (clientHeight, scrollTop, scrollHeight) => {
		const reachBottom = scrollHeight - (clientHeight + scrollTop) <= 0;
		const hasMoreData = pagination < infiniteList?.total;
		if (reachBottom && hasMoreData && !loading) {
			setPagination((p) => p + 1);
		}
	};

	return {
		setQfilter, handleScroll, qfilter, infiniteList, loading,
	};
}

export default useListSuggestions;
