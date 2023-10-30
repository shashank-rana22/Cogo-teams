import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const PAGE_ONE = 1;

const useGetSegment = ({ statusFilter = '' }) => {
	const [data, setData] = useState({});
	const [filters, setFilters] = useState({});
	const [pagination, setPagination] = useState(PAGE_ONE);

	const [{ loading }, trigger] = useRequest({
		url    : '/list_communication_segment_controls',
		method : 'GET',
		params : {
			page    : pagination,
			filters : {
				status: statusFilter,
				...filters,
			},
		},
	}, { manual: true });

	const getSegmentData = useCallback(async () => {
		try {
			const res = await trigger();
			setData(res?.data);
		} catch (error) {
			toastApiError(error);
		}
	}, [trigger]);

	useEffect(() => {
		getSegmentData();
	}, [statusFilter, filters, getSegmentData]);

	return {
		data,
		loading,
		setFilters,
		getSegmentData,
		pagination,
		setPagination,
		filters,
	};
};

export default useGetSegment;
