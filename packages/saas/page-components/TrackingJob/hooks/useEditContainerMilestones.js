import { useRequest } from '@cogoport/request';

const useEditContainerMilestones = ({ refetch }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_saas_container_timeline_detail',
	});

	const updateMilestoneData = async ({ id, values }) => {
		await trigger({
			data: {
				saas_container_timeline_detail_id : id,
				data                              : values,
			},
		});
		refetch();
	};

	return {
		loading,
		apiTrigger: updateMilestoneData,
	};
};

export default useEditContainerMilestones;
