import { useRequest } from '@cogoport/request';

const useGetSubscriptionInfo = () => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/get_saas_subscription_profile',
	}, { manual: true });

	const refetchSubscriptionInfo = async (saas_subscription_customer_id) => {
		try {
			await trigger({
				params: {
					saas_subscription_customer_id,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	return {
		loading, subInfo: data, refetchSubscriptionInfo,
	};
};

export default useGetSubscriptionInfo;
