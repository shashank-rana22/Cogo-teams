import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetContainerMilestones = ({ id = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : 'get_saas_container_subscription',
	});

	const getMilestones = useCallback(async () => {
		await trigger({
			params: { id },
		});
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
