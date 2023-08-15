import { useRequest } from '@cogoport/request';
import { merge } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import getFormattedPayload from '../utils/getFormattedPayload';

const START_PAGE = 1;
const KEY_TO_SEND = {
	checkout       : 'checkout_count',
	disliked_rates : 'dislikes_count',
	stale_rates    : 'stale_rate',
};

const useListFclFreightRateStatistics = ({ filters, activeParent = '' }) => {
	const [page, setPage] = useState(START_PAGE);

	const [{ data:rateData, loading:rateLoading }, trigger] = useRequest({
		url    : 'list_fcl_freight_rate_statistics',
		method : 'GET',
	}, { manual: true });

	const [{ data:rateRequestData, loading:rateRequestLoading }, rateRequestTrigger] = useRequest({
		url    : 'list_fcl_freight_rate_request_statistics',
		method : 'GET',
	}, { manual: true });

	const getRatesData = async (params) => {
		try {
			await trigger({ params });
		} catch (err) {
			// console.error(err);
		}
	};

	const getRateRequestsData = async (params) => {
		try {
			await rateRequestTrigger({ params });
		} catch (err) {
			// console.error(err);
		}
	};

	useEffect(() => {
		const params = getFormattedPayload(filters);
		const extraFilters = KEY_TO_SEND[activeParent] ? { filters: { [KEY_TO_SEND[activeParent]]: true } } : {};
		if (activeParent === 'missing_rates') {
			getRateRequestsData({ ...params, page });
		} else {
			getRatesData(merge({ ...params, page }, extraFilters));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(filters), page, activeParent]);

	const data = activeParent === 'missing_rates' ? rateData : rateRequestData;

	return { data, loading: rateLoading || rateRequestLoading, page, setPage };
};
export default useListFclFreightRateStatistics;
