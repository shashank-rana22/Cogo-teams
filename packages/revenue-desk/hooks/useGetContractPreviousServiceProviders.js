import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetContractPreviousServiceProviders = ({ currentShipmentData }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_contract_previous_service_providers',
	}, { manual: true });
	const shipmentId = currentShipmentData?.id;
	const sourceId = currentShipmentData?.source_id;
	const serviceType = `${currentShipmentData?.shipment_type}_service`;
	const getContractPreviousServiceProviderList = useCallback(async () => {
		try {
			await trigger({
				params: {
					shipment_id  : shipmentId,
					source_id    : sourceId,
					service_type : serviceType,
				},
			});
		} catch (err) {
			// console.log(err)
		}
	}, [trigger, shipmentId, sourceId, serviceType]);

	useEffect(() => {
		if (currentShipmentData?.id) {
			getContractPreviousServiceProviderList();
		}
	}, [currentShipmentData?.id, getContractPreviousServiceProviderList]);
	return {
		data, loading,
	};
};
export default useGetContractPreviousServiceProviders;
