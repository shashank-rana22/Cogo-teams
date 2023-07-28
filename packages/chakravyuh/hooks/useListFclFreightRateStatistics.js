import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

import getFormattedPayload from '../utils/getFormattedPayload';

const START_PAGE = 1;
const KEY_TO_SEND = {
	checkout       : 'checkout_count',
	disliked_rates : 'dislikes_count',
	stale_rates    : 'stale_rate',
};

const useListFclFreightRateStatistics = ({ filters, activeParent = '' }) => {
	const [page, setPage] = useState(START_PAGE);
	const [data, setData] = useState(null);

	const [{ data:rateData, loading:rateLoading }, trigger] = useRequest({
		url    : 'list_fcl_freight_rate_statistics',
		method : 'GET',
	}, { manual: true });

	const [{ daat:rateRequestData, loading:rateRequestLoading }, rateRequestTrigger] = useRequest({
		url    : 'list_fcl_freight_rate_request_statistics',
		method : 'GET',
	}, { manual: true });

	const getRatesData = useCallback(
		async (params) => {
			try {
				await trigger({ params });
			} catch (err) {
				// console.error(err);
			}
		},
		[trigger],
	);

	const getRateRequestsData = useCallback(
		async (params) => {
			try {
				await rateRequestTrigger({ params });
			} catch (err) {
				// console.error(err);
			}
		},
		[rateRequestTrigger],
	);

	useEffect(() => {
		const params = getFormattedPayload(filters);
		const extraFilters = KEY_TO_SEND[activeParent] ? { [KEY_TO_SEND[activeParent]]: true } : {};
		if (activeParent === 'missing_rates') {
			getRateRequestsData({ ...params, page });
		} else {
			getRatesData({ ...params, ...extraFilters, page });
		}
	}, [filters, page, activeParent, getRateRequestsData, getRatesData]);

	useEffect(() => {
		if (activeParent === 'missing_rates') {
			setData(rateRequestData);
		} else {
			setData(rateData);
		}
	}, [activeParent, rateData, rateRequestData]);

	return { data, loading: rateLoading || rateRequestLoading, page, setPage };
};
export default useListFclFreightRateStatistics;
