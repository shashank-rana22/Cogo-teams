import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { useEffect, useContext, useState } from 'react';

const useGetShipmentQuotation = () => {
	const { shipment_data } = useContext(ShipmentDetailContext);
	const [serviceCharges, setServiceCharges] = useState([]);

	const [{ data }, trigger] = useRequest({
		url    : '/get_shipment_quotation',
		method : 'GET',
	});

	useEffect(() => {
		(async () => {
			try {
				const res = await trigger({
					params: { shipment_id: shipment_data.id },
				});
				if (!res.hasError) {
					setServiceCharges(res?.data?.service_charges);
				}
			} catch (err) {
				console.log(err);
			}
		})();
	}, [shipment_data.id, trigger]);

	return {
		data,
		serviceCharges,
	};
};

export default useGetShipmentQuotation;
