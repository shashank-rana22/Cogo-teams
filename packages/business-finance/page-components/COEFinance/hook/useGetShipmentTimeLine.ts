import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetShipmentTimeLine = (shipmentId:string) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/shipment/get_service_timeline',
			method : 'get',
		},
	);

	const getList = async () => {
		await trigger({
			params: {
				shipment_id: shipmentId,
			},
		});
	};
	useEffect(() => {
		getList();
	}, []);

	return {
		loading,
		data,
	};
};

export default useGetShipmentTimeLine;
