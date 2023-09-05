import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

const API_NAME = {
	fcl_freight : 'get_fcl_freight_rate_job_stats',
	air_freight : 'get_air_freight_rate_job_stats',
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
		const { page, releventToMeValue, ...restFilters } = filter;

		const FINAL_FILTERS = {};

		Object.keys(restFilters).forEach((ele) => {
			if (restFilters[ele]) {
				if (ele === 'origin_port_id' && (filter?.service === 'air_freight')) {
					FINAL_FILTERS.origin_airport_id = restFilters[ele];
				} else if (ele === 'destination_port_id' && (filter?.service === 'air_freight')) {
					FINAL_FILTERS.destination_airport_id = restFilters[ele];
				} else if (ele === 'shipping_line_id' && (filter?.service === 'air_freight')) {
					FINAL_FILTERS.airline_id = restFilters[ele];
				} else FINAL_FILTERS[ele] = restFilters[ele];
			}
		});

		try {
			await trigger({
				params: {
					filters: { ...FINAL_FILTERS, user_id: releventToMeValue ? user_id : undefined },
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
