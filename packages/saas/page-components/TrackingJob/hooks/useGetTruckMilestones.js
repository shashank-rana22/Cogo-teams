import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetTruckMilestones = ({ id = null, trackingType }) => {
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/get_saas_ftl_tracking_detail',
	});

	const getMilestones = useCallback(async () => {
		try {
			await trigger({
				params: { trip_id: id },
			});
			console.log('trigger');
		} catch (err) {
			console.log(err);
		}
	}, [id, trackingType, trigger]);

	useEffect(() => {
		getMilestones();
	}, [getMilestones]);

	return {
		data,
		loading,
	};
};

export default useGetTruckMilestones;
