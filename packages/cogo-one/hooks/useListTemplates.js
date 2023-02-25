/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

function useListTemplate({ activeTab }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/list_communication_templates',
		method : 'get',
	}, { manual: true });

	const [qfilter, setQfilter] = useState('');
	const [pagination, setPagination] = useState(1);
	const [infiniteList, setInfiniteList] = useState({
		list  : [],
		total : 0,
	});

	const fetchListTemplate = async () => {
		const res = await trigger({
			params: {
				page                     : pagination,
				pagination_data_required : true,
				filters                  : {
					q    : !isEmpty(qfilter?.trim()) ? qfilter?.trim() : undefined,
					type : 'whatsapp',
					tags : ['quick_reply'],
				},
			},
		});
		if (res?.data) {
			const { list = [], ...paginationData } = res?.data || {};
			setInfiniteList((p) => ({ list: [...(p.list || []), ...(list || [])], ...paginationData }));
		}
	};
	const refetch = () => {
		setPagination(1);
		setInfiniteList((p) => ({ ...p, list: [] }));
		fetchListTemplate();
	};
	useEffect(() => {
		refetch();
	}, [qfilter, activeTab]);

	useEffect(() => {
		fetchListTemplate();
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

export default useListTemplate;
