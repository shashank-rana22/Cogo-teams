import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetContainerDetails(item = {}) {
	const [{ data: containerDetails },
		containerDetailTrigger] = useRequest({
		url    : '/list_shipment_container_details',
		method : 'GET',
	});

	useEffect(() => {
		(async () => {
			try {
				containerDetailTrigger({
					params: { filters: { shipment_id: item?.shipment_id } },
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [item?.shipment_id, containerDetailTrigger]);

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
