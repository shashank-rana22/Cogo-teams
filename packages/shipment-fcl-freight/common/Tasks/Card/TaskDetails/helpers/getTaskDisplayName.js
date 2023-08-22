import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

export default function getTaskDisplayName({
	shipment_data = {},
	task = {},
	REQUIRED_SERVICE_ARR = [],
	servicesList = [],
}) {
	let taskName = startCase(task?.label || task?.task);

	if (task?.service_type === 'haulage_freight_service') {
		const service_details = servicesList?.filter((item) => item?.id === task?.service_id)
			?.[GLOBAL_CONSTANTS.zeroth_index];

		if (service_details?.transport_mode === 'trailer') {
			taskName = taskName?.replace('Haulage', 'Trailer');
		}
	}

	if (task?.service_type === 'subsidiary_service') {
		const [serviceObj] = REQUIRED_SERVICE_ARR || [];

		taskName = serviceObj?.service_name
			? `Mark (${serviceObj?.service_name}) ${task?.task === 'mark_completed' ? 'Completed' : 'Confirm'}`
			: (startCase(task?.label)
		|| startCase(task?.task));
	}

	if (
		shipment_data?.source === 'rollover'
		&& task?.task === 'upload_booking_note'
	) {
		taskName = taskName?.replace('Upload', 'Upload Rollover');
	}

	return taskName;
}
