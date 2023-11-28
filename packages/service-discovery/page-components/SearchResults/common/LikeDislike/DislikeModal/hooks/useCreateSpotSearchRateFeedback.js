import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useCreateSpotSearchRateFeedback = () => {
	const [{ loading: createLoading }, trigger] = useRequest({
		url    : '/create_spot_search_rate_feedback',
		method : 'POST',
	}, { manual: true });

	const createSpotSearchRateFeedback = async ({ values }) => {
		try {
			await trigger({ data: values });

			Toast.success('Feedback submitted successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		createLoading,
		createSpotSearchRateFeedback,
	};
};

export default useCreateSpotSearchRateFeedback;
