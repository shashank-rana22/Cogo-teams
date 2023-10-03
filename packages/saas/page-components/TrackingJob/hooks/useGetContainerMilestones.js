import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../utlis/toastApiError';

const useGetContainerMilestones = ({ id = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : 'get_saas_container_subscription',
	});

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
		getMilestones,
		refetch          : getMilestones,
		data,
		milestoneData    : data?.data,
		apiloading       : loading,
		shipping_line_id : data?.shipping_line_id,
	};
};

export default useGetContainerMilestones;
