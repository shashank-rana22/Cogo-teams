import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useDeleteContainerMilestones = ({ refetch }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/delete_saas_container_timeline_detail',
	});

	const deleteMileStones = async (id) => {
		await trigger({
			params: { saas_container_timeline_detail_id: id },
		});
		Toast.success('Deleted Sucessfully');
		refetch();
	};

	return {
		deleteMileStones,
		loading,
	};
};

export default useDeleteContainerMilestones;
