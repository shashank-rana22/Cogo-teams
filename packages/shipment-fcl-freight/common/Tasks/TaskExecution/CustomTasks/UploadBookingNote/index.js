import { ShipmentDetailContext } from '@cogoport/context';
import { useContext, useState } from 'react';

function UploadBookingNote({ task }) {
	const { primary_service, shipment_data, servicesList } = useContext(ShipmentDetailContext);

	let initialStep = 0;

	if (primary_service?.trade_type === 'import') initialStep = 1;

	if (task?.tags && task?.tags?.length) initialStep = Number(task.tags[0]) + 1;

	const [step, setStep] = useState(initialStep);

	return <div>Upload Booking Note</div>;
}

export default UploadBookingNote;
