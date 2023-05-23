import TIMELINE_EDITABLE from '../config/timelineEditable.json';
import { getDate } from '../utils/getDate';

const controls = ({ primary_service, departureDate }) => {
	const disabledState = primary_service?.state === 'vessel_arrived'
		|| !TIMELINE_EDITABLE.primary_service.state.includes(primary_service?.state);

	const finalControls = [
		{
			name    : 'schedule_departure',
			label   : 'Actual time of departure',
			maxDate : null,
		},
		{
			name    : 'schedule_arrival',
			label   : 'Actual time of arrival',
			maxDate : null,
			minDate : departureDate,
			disable : false,
		},
	];

	const defaultValues = {};

	finalControls.forEach((control, index) => {
		const { name, disable = disabledState } = control;
		finalControls[index].disable = disable;
		finalControls[index].dateFormat = 'MMM dd, yyyy, hh:mm:ss aaa';
		finalControls[index].placeholder = 'Select Date';
		finalControls[index].isPreviousDaysAllowed = true;
		finalControls[index].showTimeSelect = true;
		defaultValues[name] = getDate(primary_service?.[name]);
	});

	return { finalControls, defaultValues };
};

export default controls;
