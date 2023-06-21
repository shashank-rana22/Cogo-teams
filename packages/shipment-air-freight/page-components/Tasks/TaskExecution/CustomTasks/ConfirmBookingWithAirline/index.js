import SelectRate from './SelectRate';

function ConfirmBookingWithAirline({
	task,
	onCancel,
	refetch,
	shipmentData,
}) {
	return (
		<SelectRate
			task={task}
			onCancel={onCancel}
			refetch={refetch}
			shipmentData={shipmentData}
		/>
	);
}

export default ConfirmBookingWithAirline;
