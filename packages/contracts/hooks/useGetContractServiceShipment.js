import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetContractServiceShipment = () => {
	const [data, setData] = useState([]);

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/get_contract_service_shipment_data',
			method : 'GET',
		},
		{ manual: true },
	);

	const getShipmentServiceData = async ({ portPair, data: shipmentData }) => {
		const ServiceName = `${portPair?.service_type}_services`;

		try {
			const res = await trigger({
				params: {
					service_location_id: shipmentData?.[ServiceName]?.[0]?.
						[`contract_${portPair?.service_type}_location_detail_id`],
					service_type           : portPair?.service_type,
					shipment_data_required : false,
				},
			});
			setData(res?.data);
		} catch (err) {
			// console.log(err);
		}
	};

	return {
		data,
		loading,
		getShipmentServiceData,
	};
};

export default useGetContractServiceShipment;
