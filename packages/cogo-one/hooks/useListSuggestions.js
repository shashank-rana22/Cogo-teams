/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

function useListSuggestions({ activeTab }) {
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
		try {
			const res = await trigger({
				params: {
					page                     : pagination,
					pagination_data_required : true,
					filters                  : {
						q               : !isEmpty(qfilter?.trim()) ? qfilter?.trim() : undefined,
						suggestion_type : 'quick_reply',
					},
				},
			});
			if (res?.data) {
				const { list = [], ...paginationData } = res?.data || {};
				setInfiniteList((p) => ({ list: [...(p.list || []), ...(list || [])], ...paginationData }));
			}
		} catch (error) {
			// console.log(error);
		}
	};
	const refetch = () => {
		setPagination(1);
		setInfiniteList((p) => ({ ...p, list: [] }));
		fetchListLogApi();
	};
	useEffect(() => {
		refetch();
	}, [qfilter, activeTab]);

	useEffect(() => {
		fetchListLogApi();
	}, [pagination, activeTab]);

	const handleScroll = (clientHeight, scrollTop, scrollHeight) => {
		const reachBottom = scrollHeight - (clientHeight + scrollTop) <= 0;
		const hasMoreData = pagination < infiniteList?.total;
		if (reachBottom && hasMoreData && !loading) {
			setPagination((p) => p + 1);
		}
	};

	return {
		setQfilter, handleScroll, qfilter, infiniteList, loading, refetch,
	};
}

export default useListSuggestions;
