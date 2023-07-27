import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

import getFormattedPayload from '../utils/getFormattedPayload';

const START_PAGE = 1;

const useListFclFreightRateStatistics = ({ filters }) => {
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
		getData({ ...params, page });
	}, [getData, filters, page]);

	return { data, loading, page, setPage };
};
export default useListFclFreightRateStatistics;
