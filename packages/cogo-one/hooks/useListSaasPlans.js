import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const getParams = ({ orgId = '' }) => ({
	organization_id: orgId,
});

const useListSaasPlans = ({ orgId = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/saas_get_active_plan_checkout_details',
		method : 'get',
	}, { manual: true });

	const getUserActivePlans = useCallback(() => {
		try {
			trigger({
				params: getParams({ orgId }),
			});
		} catch (error) {
			console.error('error:', error);
		}
	}, [trigger, orgId]);

	useEffect(() => {
		getUserActivePlans();
	}, [getUserActivePlans]);

	return {
		loading,
		plansData: data,
		getUserActivePlans,
	};
};
export default useListSaasPlans;
