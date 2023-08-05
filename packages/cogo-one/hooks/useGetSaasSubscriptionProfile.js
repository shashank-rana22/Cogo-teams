import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const getParams = ({ saasSubscriptionCustomerId = '' }) => ({
	saas_subscription_customer_id: saasSubscriptionCustomerId,
});

const useGetSaasSubscriptionProfile = ({ saasSubscriptionCustomerId = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_saas_subscription_profile',
		method : 'get',
	}, { manual: true });

	const getSaasSubscription = useCallback(() => {
		try {
			trigger({
				params: getParams({ saasSubscriptionCustomerId }),
			});
		} catch (error) {
			console.error('error', error);
		}
	}, [saasSubscriptionCustomerId, trigger]);

	useEffect(() => {
		getSaasSubscription();
	}, [getSaasSubscription]);

	return {
		subscriptionData: data,
		loading,
	};
};
export default useGetSaasSubscriptionProfile;
