import { ShipmentDetailContext } from '@cogoport/context';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useContext } from 'react';

import useUpdateShipmentContainerDetails from '../../../hooks/useUpdateShipmentContainerDetails';

const useCreateRolloverShipment = ({
	isRollover = false,
	rollover_containers = [],
}) => {
	const { shipment_data, refetch: getShipmentRefetch } = useContext(ShipmentDetailContext);

	const { id: shipment_id } = shipment_data || {};

	const updateContainerDetailsSuccessMessage = isRollover
		? 'Rollover shipment has been created successfully'
		: 'Details have been updated successfully';

	const [{ loading: rolloverLoading }, createRolloverTrigger] = useRequest({
		url    : '/create_rollover_shipment',
		method : 'POST',
	});

	const { loading: containerLoading, apiTrigger: containerUpdateTrigger } = useUpdateShipmentContainerDetails({
		successMessage : updateContainerDetailsSuccessMessage,
		refetch        : getShipmentRefetch,
	});

	const updateContainerDetails = () => {
		const update_data = rollover_containers.map((container) => ({
			id   : container.id,
			data : {
				rollover_status : isRollover ? 'confirmed' : 'cancelled',
				is_deleted      : true,
			},
		}));

		containerUpdateTrigger(update_data);
	};

	const createRollover = async () => {
		try {
			await createRolloverTrigger({
				data: { shipment_id },
			});

			updateContainerDetails();
		} catch (err) {
			toastApiError(err);
		}
	};

	const handleSubmit = () => {
		if (isRollover) {
			createRollover();
		} else {
			updateContainerDetails();
		}
	};

	return {
		loading: containerLoading || rolloverLoading,
		handleSubmit,
	};
};

export default useCreateRolloverShipment;
