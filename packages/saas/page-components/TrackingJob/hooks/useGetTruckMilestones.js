import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import toastApiError from '../utlis/toastApiError';

const useGetTruckMilestones = ({ id = null }) => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/get_saas_ftl_tracking_detail',
	}, { manual: true });

	const getMilestones = useCallback(async () => {
		try {
			await trigger({
				params: { trip_id: id },
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
		loading,
	};
};

export default useGetTruckMilestones;
