import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useGetAirMilestones = ({ id }) => {
	const { loading, data, trigger } = useRequest(
		'get',
		false,
	)('/get_saas_air_subscription');

	const getMilestones = async () => {
		await trigger({
			params: { id },
		});
	};

	useEffect(() => {
		getMilestones();
	}, []);

	return {
		getMilestones,
		milestoneData: data?.data,
		loading,
	};
};

export default useGetAirMilestones;
