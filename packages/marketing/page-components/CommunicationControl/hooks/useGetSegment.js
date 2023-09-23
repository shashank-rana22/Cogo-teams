import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetSegment = ({ statusFilter = '', pagination = 1 }) => {
	const [data, setData] = useState({});
	const [filters, setFilters] = useState({});

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
	};
};

export default useGetSegment;
