import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

function useGetSpotSearches({ feedbackData = null, requestData = null }) {
	const [{ loading, data }, trigger] = useRequest({
		url          : '/list_spot_searches',
		method       : 'GET',
		service_name : 'spot_search',
	}, { manual: true });

	const rate_id = feedbackData?.list?.[GLOBAL_CONSTANTS.zeroth_index]?.source_id
		|| requestData?.list?.[GLOBAL_CONSTANTS.zeroth_index]?.source_id;

	const getData = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: { id: rate_id || rate_id },
				},
			});
		} catch (err) {
			console.error(err);
		}
	}, [rate_id, trigger]);

	const serviceList = Object.values(data?.list?.[GLOBAL_CONSTANTS.zeroth_index]?.service_details || {});
	const spot_data = data?.list?.[GLOBAL_CONSTANTS.zeroth_index];

	return {
		spot_data,
		serviceList,
		getData,
		loadingSpotSearch: loading,
	};
}

export default useGetSpotSearches;
