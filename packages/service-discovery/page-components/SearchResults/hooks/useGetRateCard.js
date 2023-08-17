import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetRateCard = () => {
	let rate_card_id;

	if (typeof window !== 'undefined') {
		rate_card_id = new URLSearchParams(window?.location?.search)?.get('rate_card_id');
	}

	const [{ loading, data }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_spot_search_rate_card',
	}, { manual: true });

	const getRateDetails = useCallback(async () => {
		try {
			await trigger({
				params: { rate_card_id, service_type: 'fcl_freight' },
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	}, [rate_card_id, trigger]);

	useEffect(() => {
		if (!rate_card_id) return;

		getRateDetails();
	}, [getRateDetails, rate_card_id]);

	return {
		loading,
		data,
		refetch: getRateDetails,
	};
};
export default useGetRateCard;
