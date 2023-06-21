import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetShipmentQuotation = ({ shipmentData }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_shipment_quotation',
	}, { manual: true });
	const getQuotation = async () => {
		try {
			await trigger({
				params: {
					shipment_id        : shipmentData?.id,
					preferred_currency : 'USD',
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};
	useEffect(() => {
		getQuotation();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		data,
		loading,
	};
};

export default useGetShipmentQuotation;
