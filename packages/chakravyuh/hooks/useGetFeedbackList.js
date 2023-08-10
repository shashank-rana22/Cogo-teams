import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetFeedbackList = ({ filters, setFilters }) => {
	const { page, ...restFilters } = filters;

	const FINAL_FILTERS = {};

	Object.keys(restFilters).forEach((key) => {
		if (restFilters[key]) {
			if (key === 'dataRange') {
				FINAL_FILTERS.created_at_greater_than = restFilters[key].startDate || undefined;
				FINAL_FILTERS.created_at_less_than = restFilters[key].endDate || undefined;
			} else { FINAL_FILTERS[key] = restFilters[key]; }
		}
	});

	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_fcl_freight_rate_deviations',
		method : 'GET',
		params : {
			filters: FINAL_FILTERS,
			page,
		},
	}, { manual: true });

	const getFeedbackList = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			Toast.error(err.message);
		}
	}, [trigger]);

	useEffect(() => {
		getFeedbackList();
	}, [filters, getFeedbackList]);

	return {
		loading,
		data,
		filters,
		setFilters,
		page,
	};
};

export default useGetFeedbackList;
