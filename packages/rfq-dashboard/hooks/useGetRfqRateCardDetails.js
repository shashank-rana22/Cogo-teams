import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetRfqRateCardDetails = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_rfq_rate_card_details',
		method : 'GET',
	}, { manual: true });

	const getRfqRateCardDetails = useCallback(({ rfq_rate_card_id = '' }) => {
		try {
			trigger({
				params: {
					rfq_rate_card_id,
				},
			});
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	}, [trigger]);

	return {
		getRfqRateCardDetails,
		rate_card_details_data : data,
		rfq_card_loading       : loading,
	};
};

export default useGetRfqRateCardDetails;
