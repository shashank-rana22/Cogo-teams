import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

const API_NAME = {
	fcl_freight : 'get_fcl_freight_rate_coverage_stats',
	air_freight : 'get_air_freight_rate_coverage_stats',
};

const useGetCoverageDetails = () => {
	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { user: { id: user_id = '' } = {} } = user_data;

	const [filter, setFilter] = useState({
		service           : 'fcl_freight',
		status            : 'pending',
		releventToMeValue : true,
	});

	const endPoint = API_NAME[filter?.service || 'fcl_freight'];
	const [{ loading, data }, trigger] = useRequest({
		url    : endPoint,
		method : 'GET',
	}, { manual: true });

	const getCoverageDetails = useCallback(async () => {
		const { releventToMeValue, ...restFilters } = filter;

		const FINAL_FILTERS = {};

		Object.keys(restFilters).forEach((ele) => {
			if (restFilters[ele]) {
				FINAL_FILTERS[ele] = restFilters[ele];
			}
		});

		try {
			await trigger({
				params: {
					filters : { ...FINAL_FILTERS },
					user_id : filter?.releventToMeValue ? user_id : undefined,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [trigger, user_id, filter]);

	useEffect(() => {
		getCoverageDetails();
	}, [getCoverageDetails, filter]);

	return {
		loading,
		data,
		getCoverageDetails,
		filter,
		setFilter,
	};
};

export default useGetCoverageDetails;
