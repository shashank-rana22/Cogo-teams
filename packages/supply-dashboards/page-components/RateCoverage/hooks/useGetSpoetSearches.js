import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import { DEFAULT_VALUE } from '../configurations/helpers/constants';

function useGetSpoetSearches({ feedbackData, requestData, showPopover }) {
	const [{ loading, data }, trigger] = useRequest({
		url          : '/list_spot_searches',
		method       : 'GET',
		service_name : 'spot_search',
	}, { manual: true });

	const rate_id = feedbackData?.list?.[DEFAULT_VALUE]?.source_id || requestData?.list?.[DEFAULT_VALUE]?.source_id;

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

	const serviceList = Object.values(data?.list?.[DEFAULT_VALUE]?.service_details || {});
	const spot_data = data?.list?.[DEFAULT_VALUE];

	return {
		spot_data,
		serviceList,
		getData,
		loadingSpotSearch: loading,
	};
}

export default useGetSpoetSearches;
