import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const api = {
	fcl_freight : 'list_fcl_freight_rate_feedbacks',
	lcl_freight : 'list_lcl_freight_rate_feedbacks',
	air_freight : 'list_air_freight_rate_feedbacks',
};

const keyFilter = (filter) => Object.fromEntries(
	Object.entries(filter).filter(([, value]) => value !== ''),
);

const useListFreightRateFeedback = ({ filter, currentPage }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : api[filter.service],
		method : 'GET',
	}, { manual: true });

	const listFreightRateFeedback = async () => {
		const updateFilter = keyFilter(filter);
		try {
			await trigger({
				params: {
					filters: {
						validity_start_greater_than : '2023-04-25T00:00:00+05:30',
						validity_end_less_than      : '2023-04-24T12:51:22+05:30',
						status                      : 'active',
						...updateFilter,
					},
					page: currentPage,
				},
			});
		} catch (e) {
			// console.log(e);
		}
	};

	useEffect(() => {
		listFreightRateFeedback();
	}, [JSON.stringify(filter), currentPage]);

	return {
		data,
		loading,
		listFreightRateFeedback,
	};
};
export default useListFreightRateFeedback;
