import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetBuyQuotation = (shipmentData = {}) => {
	const allServices = [];
	const all_services = shipmentData.services || [];
	all_services.forEach((service) => {
		allServices.push(...(shipmentData[`${service}s`] || []));
	});

	const allServiceIds = allServices.map((service) => service.id);

	const [{ data:listQuotationData, loading }, trigger] = useRequest(
		'/get_shipment_services_quotation',
		{ manual: true },
	);

	const getQuotation = async () => {
		try {
			await trigger({
				params: {
					shipment_id : shipmentData.id,
					service_ids : allServiceIds,
				},
			});
		} catch (err) {
			Toast.error('Something went wrong!');
		}
	};

	useEffect(() => {
		getQuotation();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shipmentData?.id]);

	return {
		service_charges: listQuotationData?.service_charges,
		loading,

	};
};
export default useGetBuyQuotation;
