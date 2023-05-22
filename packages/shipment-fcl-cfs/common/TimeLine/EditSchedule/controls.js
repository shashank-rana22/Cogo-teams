import { getPrefillValue } from '../../utils/dateFormatter';
import { getDate } from '../utils/formatters';

const controls = ({ primary_service, departureDate, timelineData = [] }) => {
	const disabledState = ['vessel_arrived'].includes(
		primary_service?.state,
	);

	let deviated_departure;
	let deviated_arrival;

	(timelineData || []).forEach((data) => {
		if (data?.actual_completed_on) {
			if (data?.milestone === 'Vessel Departed From Origin (ETD)') {
				deviated_departure = getDate(data.actual_completed_on);
			} else if (data?.milestone === 'Vessel Arrived At Destination (ETA)') {
				deviated_arrival = getDate(data.actual_completed_on);
			}
		}
	});

	const finalControls = [
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
		defaultValues[name] = getPrefillValue(primary_service?.[name]);
	});

	return { finalControls, defaultValues };
};

export default controls;
