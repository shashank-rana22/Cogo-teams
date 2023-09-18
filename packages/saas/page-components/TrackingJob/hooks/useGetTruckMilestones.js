import { useRequest } from '@cogoport/request';

const useGetTruckMilestones = () => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/get_saas_ftl_tracking_detail',
	});

	const getMilestones = async ({ trip_id }) => {
		try {
			trigger({
				params: { trip_id },
			});
		} catch (err) {
			console.log(err);
		}
	};

	return {
		getMilestones,
		milestoneData: data,
		loading,
	};
};

export default useGetTruckMilestones;
