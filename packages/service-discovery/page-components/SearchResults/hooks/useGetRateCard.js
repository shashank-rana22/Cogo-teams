import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const useGetRateCard = () => {
	const { general: { query = {} } } = useSelector((state) => state);
	const { rate_card_id } = query;

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
