import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useCancelSubscription = ({ modalChangeHandler }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/cancel_saas_subscription',
	}, { manual: true });

	const cancelSubscriptionHandler = useCallback(async (id = '') => {
		try {
			await trigger({
				data: {
					subscription_id: id,
				},
			});
			modalChangeHandler(true);
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	}, [modalChangeHandler, trigger]);

	return {
		loading, cancelSubscriptionHandler,
	};
};

export default useCancelSubscription;
