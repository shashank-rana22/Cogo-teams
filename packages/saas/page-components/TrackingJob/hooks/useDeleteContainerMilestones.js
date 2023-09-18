import { useRequest } from '@cogoport/request';

const useDeleteContainerMilestones = () => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'post',
		url    : '/delete_saas_container_timeline_detail',
	});

	const deleteMileStones = async (id, getMilestones) => {
		trigger({
			params: { saas_container_timeline_detail_id: id },
		});

		if (data) {
			await getMilestones();
		}
	};

	return {
		deleteMileStones,
		loading,
	};
};

export default useDeleteContainerMilestones;
