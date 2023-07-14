import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

export default function getTaskDisplayName({ shipment_data = {}, task = {}, REQUIRED_SERVICE_ARR = [] }) {
	let taskName = startCase(task?.label || task?.task);

	if (task?.service_type === 'subsidiary_service') {
		taskName = `Mark ( ${REQUIRED_SERVICE_ARR?.[GLOBAL_CONSTANTS.zeroth_index]?.service_name} ) ${
			task?.task === 'mark_completed' ? 'Completed' : 'Confirm'
		}` || 	startCase(task?.label) || startCase(task?.task);
	}

	if (
		shipment_data?.source === 'rollover'
		&& task?.task === 'upload_booking_note'
	) {
		taskName = taskName?.replace('Upload', 'Upload Rollover');
	}

	return taskName;
}
