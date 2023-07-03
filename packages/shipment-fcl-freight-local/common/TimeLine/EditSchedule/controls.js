import TIMELINE_EDITABLE from '../config/timelineEditable.json';
import { getDate } from '../utils/getDate';

const controls = ({ primary_service, departureDate }) => {
	const disabledState = primary_service?.state === 'vessel_arrived'
		|| !TIMELINE_EDITABLE.primary_service.state.includes(primary_service?.state);

	const finalControls = [
		{
			name    : 'schedule_departure',
			label   : 'Actual time of departure',
		},
		{
			name    : 'schedule_arrival',
			label   : 'Actual time of arrival',
			minDate : departureDate,
			disable : false,
		},
	];

	const DEFAULT_VALUES = {};

	finalControls.forEach((control, index) => {
		const { name, disable = disabledState } = control;
		finalControls[index].disable = disable;
		finalControls[index].dateFormat = 'MMM dd, yyyy, hh:mm:ss aaa';
		finalControls[index].placeholder = 'Select Date';
		finalControls[index].isPreviousDaysAllowed = true;
		finalControls[index].showTimeSelect = true;
		DEFAULT_VALUES[name] = getDate(primary_service?.[name]);
	});

	return { finalControls, defaultValues: DEFAULT_VALUES };
};

export default controls;
