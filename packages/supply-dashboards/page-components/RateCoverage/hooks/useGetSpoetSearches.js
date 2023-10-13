import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

function useGetSpoetSearches({ id }) {
	const [{ loading, data }, trigger] = useRequest({
		url          : '/list_spot_searches',
		method       : 'GET',
		service_name : 'spot_search',
	}, { manual: true });

	const getData = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: { id },
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [id, trigger]);

	const serviceList = Object.values(data?.list?.[0]?.service_details || {});
	const spot_data = data?.list?.[0];

	return {
		spot_data,
		serviceList,
		getData,
		loadingSpotSearch: loading,
	};
}

export default useGetSpoetSearches;
