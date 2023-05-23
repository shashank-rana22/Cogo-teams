import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
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
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
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
