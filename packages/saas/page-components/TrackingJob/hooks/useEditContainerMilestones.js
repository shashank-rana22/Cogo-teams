import { useRequest } from '@cogoport/request';

const useEditContainerMilestones = (id, getMilestones) => {
	const { loading, trigger } = useRequest(
		'post',
		false,

	)('/update_saas_container_timeline_detail');

	const updateMilestoneData = async (data) => {
		const res = await trigger({
			data: {
				saas_container_timeline_detail_id: id,
				data,
			},
		});

		if (res?.data) {
			await getMilestones();
		}
	};

	return {
		updateMilestoneData,
		loading,
	};
};

export default useEditContainerMilestones;
