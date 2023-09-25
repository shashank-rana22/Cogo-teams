import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetContainerMilestones = ({ id = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : 'get_saas_container_subscription',
	});

	const getMilestones = async () => {
		await trigger({
			params: { id },
		});
	};

	useEffect(() => {
		if (id) {
			getMilestones();
		}
	}, [id]);

	return {
		getMilestones,
		data,
		milestoneData    : data?.data,
		apiloading       : loading,
		shipping_line_id : data?.shipping_line_id,
	};
};

export default useGetContainerMilestones;
