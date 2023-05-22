import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import { PARSING_REGEX } from '../constants';

const useCreateCustomerFeedback = ({ setShowFeedback = () => {} }) => {
	const { agent_id, query } = useSelector(({ profile, general }) => ({
		agent_id : profile.user.id,
		query    : general.query,
	}));

	const { spot_search_ids = '' } = query || {};

	const parsedIds = JSON.parse(spot_search_ids?.replace(PARSING_REGEX, '"'));

	const [{ loading }, trigger] = useRequest({
		url    : '/create_agent_feedback',
		method : 'post',
	}, { manual: true });

	const createCustomerFeedback = async ({ starRating, feedbackMessage }) => {
		try {
			await trigger({
				data: {
					agent_id,
					rating           : starRating,
					feedback_message : feedbackMessage,
					spot_search_ids  : parsedIds,

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
