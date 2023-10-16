import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

function useGetSpoetSearches({ feedbackData, requestData, id }) {
	const [{ loading, data }, trigger] = useRequest({
		url          : '/list_spot_searches',
		method       : 'GET',
		service_name : 'spot_search',
	}, { manual: true });

	const rate_id = feedbackData?.list?.[0]?.source_id || requestData?.list?.[0]?.source_id;

	const getData = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: { id: id || rate_id },
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [id, rate_id, trigger]);

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
