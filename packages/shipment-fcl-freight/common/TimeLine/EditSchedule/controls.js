import TIMELINE_EDITABLE from '../config/timelineEditable.json';
import { getDate } from '../utils/getDate';
import { getDisplayDate } from '../utils/getDisplayDate';

const controls = ({ primary_service, departureDate, timelineData = [] }) => {
	const disabledState = !TIMELINE_EDITABLE.primary_service.state.includes(primary_service?.state)
		|| primary_service?.state !== 'vessel_arrived';

	let deviated_departure;
	let deviated_arrival;

	(timelineData || []).forEach((data) => {
		if (data?.actual_completed_on) {
			if (data?.milestone === 'Vessel Departed From Origin (ETD)') {
				deviated_departure = getDisplayDate({ date: data.actual_completed_on, formatType: 'dateTime' });
			} else if (data?.milestone === 'Vessel Arrived At Destination (ETA)') {
				deviated_arrival = getDisplayDate({ date: data.actual_completed_on, formatType: 'dateTime' });
			}
		}
	});

	const finalControls = [
		{ name: 'bn_expiry', label: 'BN expiry date' },
		{ name: 'tr_cutoff', label: 'TR cutoff date' },
		{ name: 'vgm_cutoff', label: 'VGM cutoff date' },
		{ name: 'si_cutoff', label: 'SI cutoff date' },
		{ name: 'gate_in_cutoff', label: 'Gate-in cutoff date' },
		{ name: 'document_cutoff', label: 'Document cutoff date' },
		{
			name       : 'schedule_departure',
			label      : 'Actual time of departure',
			lowerlabel : deviated_departure ? `Fluctuated time of departure: ${deviated_departure}` : '',
			maxDate    : null,
		},
		{
			name       : 'schedule_arrival',
			label      : 'Actual time of arrival',
			lowerlabel : deviated_arrival && deviated_departure
				&& new Date(deviated_arrival) > new Date(deviated_departure)
				? `Fluctuated time of arrival: ${deviated_arrival}` : '',
			maxDate : null,
			minDate : departureDate,
			disable : false,
		},
	];

	const defaultValues = {};

	finalControls.forEach((control, index) => {
		const { name, maxDate = departureDate, disable = disabledState } = control;
		finalControls[index].maxDate = maxDate;
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
