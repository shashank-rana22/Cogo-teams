import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetShipmentQuotation = ({ shipmentData, priceData }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_shipment_quotation',
	}, { manual: true });
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
		if (priceData) {
			getQuotation();
		}
	}, []);

	return {
		data,
		loading,
	};
};

export default useGetShipmentQuotation;
