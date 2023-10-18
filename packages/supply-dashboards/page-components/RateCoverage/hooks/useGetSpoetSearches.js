import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

function useGetSpoetSearches({ feedbackData, requestData, showPopover }) {
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
					filters: { id: rate_id || rate_id },
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [rate_id, trigger]);

	useEffect(() => {
		if (showPopover && rate_id) {
			getData();
		}
	}, [getData, rate_id, showPopover]);

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
