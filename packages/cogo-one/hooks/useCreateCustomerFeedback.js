import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useCreateCustomerFeedback = ({ setShowFeedback = () => {} }) => {
	const { profile, general } = useSelector((state) => state);
	const { spot_search_ids } = general?.query || {};
	const [{ loading }, trigger] = useRequest({
		url    : '/create_customer_feedback',
		method : 'post',
	}, { manual: true });

	const createCustomerFeedback = async ({ starRating, feedbackMessage }) => {
		try {
			await trigger({
				data: {
					agent_id         : profile?.user?.id,
					rating           : starRating,
					feedback_message : feedbackMessage,
					spot_search_ids,

				},
			});
			setShowFeedback(false);
			Toast.success('Thanks for your Feedback!');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};
	return {
		createCustomerFeedback,
		customerFeedbackLoading: loading,
	};
};

export default useCreateCustomerFeedback;
