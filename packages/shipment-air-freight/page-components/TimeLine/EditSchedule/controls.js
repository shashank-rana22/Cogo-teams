import TIMELINE_EDITABLE from '../config/timelineEditable.json';
import { getDate } from '../utils/getDate';

const controls = ({ primary_service, departureDate }) => {
	const disabledState = primary_service?.state === 'flight_arrived'
		|| !TIMELINE_EDITABLE.primary_service.state.includes(primary_service?.state);

	const finalControls = [
		{
			name                  : 'schedule_departure',
			label                 : 'Actual time of departure',
			maxDate               : null,
			disable               : disabledState,
			dateFormat            : 'MMM dd, yyyy, hh:mm:ss aaa',
			placeholder           : 'Select Date',
			isPreviousDaysAllowed : true,
			showTimeSelect        : true,
		},
		{
			name                  : 'schedule_arrival',
			label                 : 'Actual time of arrival',
			maxDate               : null,
			minDate               : departureDate,
			disable               : disabledState,
			dateFormat            : 'MMM dd, yyyy, hh:mm:ss aaa',
			placeholder           : 'Select Date',
			isPreviousDaysAllowed : true,
			showTimeSelect        : true,
		},
	];

	const DEFAULT_VALUES = {};

	finalControls.forEach((control) => {
		const { name } = control;
		DEFAULT_VALUES[name] = getDate(primary_service?.[name]);
	});

	return { finalControls, defaultValues: DEFAULT_VALUES };
};

export default controls;
