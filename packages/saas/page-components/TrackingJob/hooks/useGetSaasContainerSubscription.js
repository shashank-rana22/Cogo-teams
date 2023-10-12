import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../utlis/toastApiError';

const useGetSaasContainerSubscription = ({ id = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : 'get_saas_container_subscription',
	}, { manual: true });

	const getMilestones = useCallback(async () => {
		try {
			if (id) {
				await trigger({
					params: { id },
				});
			}
		} catch (err) {
			toastApiError(err);
		}
	}, [id, trigger]);

	useEffect(() => {
		getMilestones();
	}, [getMilestones]);

	return {
		refetch: getMilestones,
		data,
		loading,

	};
};

export default useGetSaasContainerSubscription;
