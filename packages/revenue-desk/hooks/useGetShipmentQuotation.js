import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetShipmentQuotation = ({ shipmentData }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_shipment_quotation',
	}, { manual: false });
	const getQuotation = async () => {
		try {
			await trigger({
				params: {
					shipment_id: shipmentData?.id,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};
	useEffect(() => {
		getQuotation();
	}, []);
	const service_charges = data?.service_charges || [];
	return {
		service_charges,
		loading,
	};
};

export default useGetShipmentQuotation;
