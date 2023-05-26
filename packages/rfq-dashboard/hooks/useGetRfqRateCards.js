import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetRfqRateCards = ({ rfq_id = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_rfq_rate_cards',
		method : 'GET',
		params : {
			group_by_data_required : true,
			filters                : {
				state: 'requested_for_approval',
				rfq_id,
			},
		},
	}, { manual: false });

	const getRfqsRateCards = useCallback(async () => {
		try {
			await trigger();
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	}, [trigger]);

	return {
		getRfqsRateCards,
		data,
		loading,
	};
};

export default useGetRfqRateCards;
