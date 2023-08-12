import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useCallback, useEffect } from 'react';

const useGetServicesQuotation = ({ shipmentData = {}, requiredServiceIds = [] }) => {
	const [{ data: serviceChargesData, loading: chargeLoading }, quotationTrigger] = useRequest({
		url    : '/get_shipment_services_quotation',
		method : 'GET',
		params : {
			shipment_id : shipmentData?.id,
			service_ids : requiredServiceIds,
		},
	}, { manual: true });

	const getServiceCharges = useCallback(async () => {
		try {
			await quotationTrigger();
		} catch (error) {
			toastApiError(error);
		}
	}, [quotationTrigger]);

	useEffect(() => {
		getServiceCharges();
	}, [getServiceCharges]);

	return {
		serviceChargesData,
		chargeLoading,
	};
};

export default useGetServicesQuotation;
