import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetSaasAirSubscription = ({
	shipmentId = '',
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_saas_air_subscription',
		method : 'GET',
	}, { manual: true });

	const getSaasAirSubscription = useCallback(async () => {
		try {
			await trigger({
				params: {
					shipment_id: shipmentId,
				},
			});
		} catch (error) {
			toastApiError(error);
		}
	}, [shipmentId, trigger]);

	useEffect(() => {
		getSaasAirSubscription();
	}, [getSaasAirSubscription]);

	const trackingContainersData = [
		{
			airway_bill_no : data?.airway_bill_no,
			tracking_data  : data?.data,
		},
	];
	const list = {
		...data,
		data: trackingContainersData,
	};

	return {
		loading,
		list,
	};
};

export default useGetSaasAirSubscription;
