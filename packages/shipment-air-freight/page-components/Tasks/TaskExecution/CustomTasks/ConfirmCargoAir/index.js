import React from 'react';

import ConfirmCargoAirModal from './ConfrimCargoAirModal';
import useUpdateShipmentService from './hooks/useUpdateShipmentService';

function UpdateFlightDetails({
	task,
	services,
	primary_service,
	onCancel,
	refetch,
	timeLineRefetch,
	shipment_data,
}) {
	const mainService = services.filter(
		(service) => service.service_type === 'air_freight_service',
	);
	const { handleUpdate, loading } = useUpdateShipmentService({
		task,
		services: mainService,
		onCancel,
		refetch,
		timeLineRefetch,
		primary_service,
		shipment_data,
	});
	return (
		<ConfirmCargoAirModal
			task={task}
			handleUpdate={handleUpdate}
			onCancel={onCancel}
			loading={loading}
			services={mainService}
			primary_service={primary_service}
			shipment_data={shipment_data}
		/>
	);
}

export default UpdateFlightDetails;
