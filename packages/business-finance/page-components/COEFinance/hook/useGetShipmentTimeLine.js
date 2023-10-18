import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetShipmentTimeLine = (shipmentId) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/shipment/get_service_timeline',
			method : 'get',
		},
	);

	useEffect(() => {
		const getList = async () => {
			if (shipmentId) {
				await trigger({
					params: {
						shipment_id: shipmentId,
					},
				});
			}
		};
		getList();
	}, [shipmentId, trigger]);

	return {
		loading,
		data,
	};
};

export default useGetShipmentTimeLine;
