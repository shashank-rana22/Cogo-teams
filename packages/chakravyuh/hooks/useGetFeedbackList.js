import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetFeedbackList = ({ filters, setFilters }) => {
	const { page, ...restFilters } = filters;
	const finalFilters = {};
	Object.keys(restFilters).forEach((key) => {
		if (restFilters[key]) {
			finalFilters[key] = restFilters[key];
		}
	});
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_fcl_freight_rate_feedbacks',
		method : 'GET',
		params : {
			filters: finalFilters,
			page,
		},
	}, { manual: true });

	const getFeedbackList = async () => {
		await trigger();
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
