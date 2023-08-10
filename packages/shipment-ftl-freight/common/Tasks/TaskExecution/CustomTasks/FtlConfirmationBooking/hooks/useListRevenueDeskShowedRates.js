import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListRevenueDeskShowedRates = ({
	service_type,
	shipment_id,
	service_ids,
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_revenue_desk_showed_rates',
		method : 'GET',
	}, { manual: true });

	const getRates = useCallback(async () => {
		try {
			const params = {
				shipment_id,
				service_type : service_type || undefined,
				filters      : {
					service_id: service_ids,
				},
			};
			await trigger({ params });
		} catch (err) {
			console.error(err);
		}
	}, [trigger, shipment_id, service_type, service_ids]);

	useEffect(() => {
		getRates();
	}, [getRates]);

	return {
		getRates,
		loading,
		data,
	};
};

export default useListRevenueDeskShowedRates;
