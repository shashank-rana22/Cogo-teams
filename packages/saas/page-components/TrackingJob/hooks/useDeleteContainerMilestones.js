import { useRequest } from '@cogoport/request';

const useDeleteContainerMilestones = ({ refetch }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/delete_saas_container_timeline_detail',
	});

	const deleteMileStones = async (id) => {
		trigger({
			params: { saas_container_timeline_detail_id: id },
		});
		refetch();
	};

	return {
		deleteMileStones,
		loading,
	};
};

export default useDeleteContainerMilestones;
