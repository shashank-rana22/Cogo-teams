import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useGetListCommunicationLog({ organizationId = null, userId = null }) {
	const [listData, setListData] = useState({
		list  : [],
		total : 0,
	});
	const [pagination, setPagination] = useState(1);
	const [firstLoading, setFirstLoading] = useState(false);
	const resetList = () => {
		setPagination(1);
		setListData({
			list  : [],
			total : 0,
		});
	};

	const [{ loading }, trigger] = useRequest({
		url    : '/list_organization_communication_logs',
		method : 'get',
	}, { manual: true });

	const fetchListLogApi = async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						communication_type : 'meeting',
						organization_id    : organizationId,
					},
					page_limit : 10,
					page       : pagination,
				},
			});
			setFirstLoading(false);
			if (res.data) {
				const { list = [], ...paginationData } = res?.data || {};
				setListData((p) => ({ list: [...(p.list || []), ...(list || [])], ...paginationData }));
			}
		} catch (error) {
			// console.log(error);
		}
	};
	useEffect(() => {
		if (organizationId) {
			setFirstLoading(true);
			fetchListLogApi();
		}

		resetList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [organizationId, userId]);

	useEffect(() => {
		fetchListLogApi();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination]);
	const handleScroll = (clientHeight, scrollTop, scrollHeight) => {
		const reachBottom = scrollHeight - (clientHeight + scrollTop) <= 0;
		const hasMoreData = pagination < listData?.total;

		if (reachBottom && hasMoreData && !loading) {
			setPagination((p) => p + 1);
		}
	};
	return {
		listLoading: loading,
		listData,
		fetchListLogApi,
		firstLoading,
		setFirstLoading,
		handleScroll,
		setListData,
		resetList,
	};
}
export default useGetListCommunicationLog;
