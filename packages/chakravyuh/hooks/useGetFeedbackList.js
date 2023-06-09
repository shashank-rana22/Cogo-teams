import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetFeedbackList = ({ filters, setFilters }) => {
	const { page, ...restFilters } = filters;
	const FINAL_FILTERS = {};
	Object.keys(restFilters).forEach((key) => {
		if (restFilters[key]) {
			if (key === 'dataRange') {
				FINAL_FILTERS.validity_start_greater_than = restFilters[key].startDate || undefined;
				FINAL_FILTERS.validity_end_less_than = restFilters[key].endDate || undefined;
			} else { FINAL_FILTERS[key] = restFilters[key]; }
		}
	});
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_fcl_freight_rate_feedbacks',
		method : 'GET',
		params : {
			filters                  : FINAL_FILTERS,
			page,
			booking_details_required : true,
			is_dashboard_required    : true,
		},
	}, { manual: true });

	const getFeedbackList = async () => {
		try {
			await trigger();
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getFeedbackList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(filters)]);

	return {
		loading,
		data,
		filters,
		setFilters,
		page,
	};
};

export default useGetFeedbackList;
