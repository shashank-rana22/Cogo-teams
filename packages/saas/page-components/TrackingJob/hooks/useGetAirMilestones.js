import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../utlis/toastApiError';

const useGetAirMilestones = ({ id = null }) => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/get_saas_air_subscription',

	});

	const getMilestones = useCallback(async () => {
		try {
			await trigger({
				params: { id },
			});
		} catch (err) {
			toastApiError(err);
		}
	}, [id, trigger]);

	useEffect(() => {
		getMilestones();
	}, [getMilestones]);

	return {
		data,
		refetch: getMilestones,
		loading,
	};
};

export default useGetAirMilestones;
