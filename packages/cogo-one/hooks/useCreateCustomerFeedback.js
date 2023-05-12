import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useCreateCustomerFeedback = ({ setShowFeedback = () => {} }) => {
	const { profile } = useSelector((state) => state);
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
