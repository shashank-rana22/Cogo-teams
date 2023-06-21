import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetContractPreviousServiceProviders = ({ currentShipmentData }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_contract_previous_service_providers',
	}, { manual: true });
	const getContractPreviousServiceProviderList = async () => {
		try {
			await trigger({
				params: {
					shipment_id  : currentShipmentData?.id,
					source_id    : currentShipmentData?.source_id,
					service_type : `${currentShipmentData?.shipment_type}_service`,
				},
			});
		} catch (err) {
			// console.log(err)
		}
	};

	useEffect(() => {
		if (currentShipmentData?.id) {
			getContractPreviousServiceProviderList();
		}
	}, [currentShipmentData?.id]);
	return {
		data, loading,
	};
};
export default useGetContractPreviousServiceProviders;
