import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetSaasContainerSubscription = ({
	serialId,
	truckNumber,
}) => {
	const payload = { serial_id: serialId, truck_number: truckNumber };

	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_saas_ftl_tracking_detail',
		method : 'GET',
		params : { ...payload },
	}, { manual: true });

	const listShipments = useCallback(() => {
		(async () => {
			try {
				await trigger();
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger]);

	const trackerData = data ?? {};
	const trackingContainersData = [
		{
			tracking_data: trackerData?.data,
		},
	];
	const apiData = {
		...trackerData,
		data: trackingContainersData,
	};

	useEffect(() => {
		listShipments();
	}, [listShipments]);

	return {
		loading,
		data: apiData,
		listShipments,
	};
};

export default useGetSaasContainerSubscription;
