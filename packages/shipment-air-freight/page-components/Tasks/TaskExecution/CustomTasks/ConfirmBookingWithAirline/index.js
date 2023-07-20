import SelectRate from './SelectRate';

function ConfirmBookingWithAirline({
	task,
	onCancel,
	refetch,
	shipmentData,
	primary_service = {},
}) {
	return (
		<SelectRate
			task={task}
			onCancel={onCancel}
			refetch={refetch}
			shipmentData={shipmentData}
			primary_service={primary_service}
		/>
	);
}

export default ConfirmBookingWithAirline;
