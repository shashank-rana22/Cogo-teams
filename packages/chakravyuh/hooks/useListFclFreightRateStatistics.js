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

	const [{ data, loading }, trigger] = useRequest({
		url    : 'list_fcl_freight_rate_statistics',
		method : 'GET',
	}, { manual: true });

	const getData = useCallback(
		async (params) => {
			try {
				await trigger({ params });
			} catch (err) {
				// console.error(err);
			}
		},
		[trigger],
	);

	useEffect(() => {
		const params = getFormattedPayload(filters);
		const extraFilters = KEY_TO_SEND[activeParent] ? { [KEY_TO_SEND[activeParent]]: true } : {};
		getData({ ...params, ...extraFilters, page });
	}, [getData, filters, page, activeParent]);

	return { data, loading, page, setPage };
};
export default useListFclFreightRateStatistics;
