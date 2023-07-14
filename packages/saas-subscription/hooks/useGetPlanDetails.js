import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetPlanDetails = ({ featureModal }) => {
	const { query } = useRouter();
	const { plan_id = '' } = query || {};
	const { apiCall = false } = featureModal;
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/get_saas_plan_details',
		params : { id: plan_id },
	}, { manual: false });

	// getting cancel error by removing async await
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
		if (apiCall) { refetchPlanDetails(); }
	}, [refetchPlanDetails, apiCall]);

	return {
		planDetails: data,
		loading,
	};
};

export default useGetPlanDetails;
