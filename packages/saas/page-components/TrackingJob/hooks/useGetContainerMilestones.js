import { useEffect } from 'react';
import { useRequest, useScope } from '@cogo/commons/hooks';

const useGetContainerMilestones = ({ showUpdate = {} }) => {
	const id = showUpdate?.data?.saas_container_subscription_id;
	const { scope } = useScope();

	const { loading, data, trigger } = useRequest(
		'get',
		false,
		scope,
	)('/get_saas_container_subscription');

	const getMilestones = async () => {
		await trigger({
			params: { id },
		});
	};

	useEffect(() => {
		if (id) {
			getMilestones();
		}
	}, [showUpdate]);

	return {
		getMilestones,
		milestoneData: data?.data,
		apiloading: loading,
		shipping_line_id: data?.shipping_line_id,
	};
};

export default useGetContainerMilestones;
