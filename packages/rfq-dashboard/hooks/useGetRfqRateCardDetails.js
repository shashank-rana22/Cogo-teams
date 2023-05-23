import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useGetRfqRateCardDetails = ({ rfq_rate_card_id = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_rfq_rate_card_details',
		method : 'GET',
		params : {
			filters: {
				rfq_rate_card_id,
			},
		},
	}, { manual: true });

	const getRfqRateCardDetails = async () => {
		try {
			await trigger();
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return {
		getRfqRateCardDetails,
		rate_card_details_data : data,
		rfq_card_loading       : loading,
	};
};

export default useGetRfqRateCardDetails;
