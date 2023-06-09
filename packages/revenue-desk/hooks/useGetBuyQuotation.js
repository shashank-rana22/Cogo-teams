import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetBuyQuotation = ({ shipmentData }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_shipment_services_quotation',
	}, { manual: true });
	const getBuyQuotation = async () => {
		try {
			await trigger({
				params: {
					shipment_id: shipmentData.id,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};
	useEffect(() => {
		getBuyQuotation();
	}, []);
	const service_charges = data?.service_charges || [];
	return {
		service_charges,
		loading,
	};
};

export default useGetBuyQuotation;
