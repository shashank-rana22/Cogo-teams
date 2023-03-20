import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { useEffect, useContext } from 'react';

function useGetContainerDetails() {
	const [{ data: containerDetails },
		containerDetailTrigger] = useRequest({
		url    : '/list_shipment_container_details',
		method : 'GET',
	});

	const { shipment_data } = useContext(ShipmentDetailContext);
	useEffect(() => {
		(async () => {
			try {
				containerDetailTrigger({
					params: { filters: { shipment_id: shipment_data?.id } },
				});
			} catch (err) {
				// console.log(err);
			}
		})();
	}, [shipment_data?.id, containerDetailTrigger]);

	const containerList = [];

	containerDetails?.list?.forEach((value) => (value.container_number
		? containerList.push({
			label : value.container_number,
			value : value.container_number,
		})
		: null));

	return {
		containerList,
	};
}

export default useGetContainerDetails;
