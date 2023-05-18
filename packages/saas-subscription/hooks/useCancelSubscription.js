import { useRequest } from '@cogoport/request';

const useCancelSubscription = () => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/cancel_saas_subscription',
	}, { manual: true });

	const cancelSubscriptionHandler = async (id = '') => {
		try {
			await trigger({
				data: {
					subscription_id: id,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	return {
		loading, cancelSubscriptionHandler,
	};
};

export default useCancelSubscription;
