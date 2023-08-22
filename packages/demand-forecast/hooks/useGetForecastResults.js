import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

const DEFAULT_PAGE = 1;

const useGetForecastFclFreightClusters = ({ filters = {} }) => {
	const { agent_id } = useSelector(({ profile }) => ({ agent_id: profile.user.id }));
	const [page, setPage] = useState(DEFAULT_PAGE);

	console.log('agent_id::', agent_id);

	const [{ data, loading = false }, trigger] = useRequest({
		url    : '/list_rolling_forecast_fcl_freight_clusters',
		method : 'GET',
	}, { manual: true });

	const fetch = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						filters: {
							agent_id: '4012accb-d515-46e1-957e-ddfd7a921522',
							...filters,
						},
						page,
					},
				});
			} catch (error) {
				if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
			}
		},
		[page, trigger, filters],
	);

	useEffect(() => {
		fetch();
	}, [fetch, page]);

	const { list = [], ...pageData } = data || {};

	return {
		loading,
		page,
		setPage,
		list,
		pageData,
	};
};

export default useGetForecastFclFreightClusters;
