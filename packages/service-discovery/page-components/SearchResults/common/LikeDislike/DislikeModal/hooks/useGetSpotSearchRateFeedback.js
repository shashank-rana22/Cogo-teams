import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useGetSpotSearchRateFeedback = ({ rate_card_id = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_spot_search_rate_feedback',
		method : 'GET',
		params : {
			rate_card_id,
		},
	}, { manual: false });

	const getSpotSearchRateFeedback = async () => {
		try {
			await trigger({
				params: {
					rate_card_id,
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		getSpotSearchRateFeedback,
		loading,
		data,
	};
};

export default useGetSpotSearchRateFeedback;
