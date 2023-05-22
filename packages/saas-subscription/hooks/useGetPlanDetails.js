import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetPlanDetails = () => {
	const { query } = useRouter();
	const { plan_id = '' } = query || {};

	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/get_saas_plan_details',
	});

	const refetchPlanDetails = useCallback(async () => {
		try {
			await trigger({
				params: {
					id: plan_id,
				},
			});
		} catch (error) {
			console.log(error);
		}
	}, [plan_id, trigger]);

	useEffect(() => {
		refetchPlanDetails();
	}, [refetchPlanDetails]);

	return {
		planDetails: data,
		loading,
	};
};

export default useGetPlanDetails;
