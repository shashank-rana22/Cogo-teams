import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useUpdateContainerNumber = (
	containerValue = {},
	setEditContainerNum,
	shipment_data = {},
	refetch = () => {},
) => {
	const [{ data: containerDetails },
		containerDetailTrigger] = useRequest({
		url    : '/list_shipment_container_details',
		method : 'GET',
	});

	useEffect(() => {
		(async () => {
			try {
				if (shipment_data?.id) {
					await containerDetailTrigger({
						params: { filters: { shipment_id: shipment_data?.id } },
					});
				}
			} catch (err) {
				console.log(err);
			}
		})();
	}, [containerDetailTrigger, shipment_data?.id]);

	const [{ loading: updateContainerLoading },
		updateShipmentContainerTrigger] = useRequest({
		url    : '/update_shipment_container_details',
		method : 'POST',
	});

	useEffect(() => {
		(async () => {
			try {
				if (shipment_data?.id) {
					await updateShipmentContainerTrigger({
						params: { filters: { shipment_id: shipment_data?.id } },
					});
				}
			} catch (err) {
				console.log(err);
			}
		})();
	}, [shipment_data?.id, updateShipmentContainerTrigger]);

	const handleSubmit = async () => {
		const update_data = [];
		Object.keys(containerValue || {}).forEach((key) => {
			const reqObj = {
				id   : key,
				data : {
					container_number: containerValue[key],
				},
			};
			update_data.push(reqObj);
		});

		try {
			const res = await updateShipmentContainerTrigger({ data: { update_data } });

			if (!res?.hasError) {
				Toast.success('Container Details Updated Successfully!');
				setEditContainerNum(false);
				refetch();
			} else {
				Toast.error('Please check the details filled or try again!');
			}
		} catch (err) {
			Toast.error(getApiErrorString(err?.data));
		}
	};

	return {
		containerDetails,
		handleSubmit,
		loading: updateContainerLoading,
	};
};

export default useUpdateContainerNumber;
