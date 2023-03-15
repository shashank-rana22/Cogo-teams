import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

function useGetContainerDetails(item = {}) {
	const scope = useSelector(({ general }) => general?.scope);

	const { trigger: containerDetailTrigger, data: containerDetails } =		useRequest('get', false, scope)('/list_shipment_container_details');

	const getDetails = async () => {
		try {
			containerDetailTrigger({
				params: { filters: { shipment_id: item?.shipment_id } },
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (item?.shipment_id) {
			getDetails();
		}
	}, [item?.shipment_id]);

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
