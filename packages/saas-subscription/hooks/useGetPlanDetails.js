import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetPlanDetails = () => {
	const { query } = useRouter();
	const { plan_id = '' } = query || {};
	console.log(query, 'plan_id');
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/get_saas_plan_details',
	});

	const refetchPlanDetails = async () => {
		try {
			await trigger({
				params: {
					id: plan_id,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		refetchPlanDetails();
	}, []);

	return {
		planDetails: data,
		loading,
	};
};

export default useGetPlanDetails;
