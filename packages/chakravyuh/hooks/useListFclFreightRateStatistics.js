import { useRequest } from '@cogoport/request';
import { merge } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import getFormattedPayload from '../utils/getFormattedPayload';
import toastApiError from '../utils/toastApiError';

const START_PAGE = 1;
const KEY_TO_SEND = {
	checkout       : 'checkout_count',
	disliked_rates : 'dislikes_count',
	stale_rates    : 'stale_rate',
};

const useListFclFreightRateStatistics = ({ filters, activeParent = '', query_type = '' }) => {
	const [page, setPage] = useState(START_PAGE);

	const [{ data, loading }, trigger] = useRequest({
		url    : 'list_fcl_freight_rate_statistics',
		method : 'GET',
	}, { manual: true });

	const getRatesData = async (params) => {
		try {
			await trigger({ params });
		} catch (err) {
			toastApiError(err);
		}
	};

	useEffect(() => {
		if (filters?.service_type === 'fcl') {
			const params = getFormattedPayload(
				{ ...filters, query_type: query_type || undefined },
				['chart_type', 'service_type'],
			);
			const extraFilters = KEY_TO_SEND[activeParent] ? { filters: { [KEY_TO_SEND[activeParent]]: true } } : {};
			const newPage = query_type ? undefined : page;

			getRatesData(merge({ ...params, page: newPage }, extraFilters));
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(filters), page, activeParent, query_type]);

	return { data, loading, page, setPage };
};
export default useListFclFreightRateStatistics;
