import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const DEFAULT_PAGINATION = 1;
const MIN_HEIGHT = 0;

const useGetListProductDetail = () => {
	const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
	const [listData, setListData] = useState({
		list  : [],
		total : 0,
	});
	const [filters, setFilters] = useState({
		page_limit : 30,
		page       : 1,
	});
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_products',
	}, { manual: true });

	const getListProductDetail = useCallback(
		async () => {
			try {
				const { page, page_limit, category_id } = filters;
				const res = await trigger({
					params: {
						filters: {
							category_id: category_id || null,
						},
						page_limit,
						page,
					},
				});
				if (res.data) {
					const { list = [], ...paginationData } = res?.data || {};
					setListData((prev) => ({ list: [...(prev.list || []), ...(list || [])], ...paginationData }));
				}
			} catch (error) {
				if (error?.response?.data) {
					Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
				}
			}
		},
		[trigger, filters],
	);

	const handleScroll = (clientHeight, scrollTop, scrollHeight) => {
		console.log('hitting');
		const reachBottom = scrollHeight - (clientHeight + scrollTop) <= MIN_HEIGHT;
		const hasMoreData = pagination < listData?.total;

		if (reachBottom && hasMoreData && !loading) {
			setPagination((p) => p + DEFAULT_PAGINATION);
		}
	};

	useEffect(() => {
		getListProductDetail();
	}, [getListProductDetail]);

	return { loading, data: listData, getListProductDetail, filters, setFilters, handleScroll };
};

export default useGetListProductDetail;
