import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetAirMilestones = ({ id = null, trackingType }) => {
	const SHIPMENT_DATA_URL = {
		ocean : '/get_saas_container_subscription',
		air   : '/get_saas_air_subscription',
	};
	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : SHIPMENT_DATA_URL[trackingType],
	});

	const getMilestones = useCallback(async () => {
		try {
			await trigger({
				params: { id },
			});
		} catch (err) {
			console.log(err);
		}
	}, [id, trackingType, trigger]);

	useEffect(() => {
		getMilestones();
	}, [getMilestones]);

	return {
		data,
		refetch: getMilestones,
		loading,
	};
};

export default useGetAirMilestones;
