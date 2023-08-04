import { getDate } from '../../../utils/getDate';
import { getDepartureArrivalDate } from '../utils/getDepartureArrivalDate';
import { getDisplayDate } from '../utils/getDisplayDate';

const controls = ({
	primary_service = {},
	departureDate = '',
	timelineData = [],
	defaultEditable = false,
}) => {
	const modifiedPrimaryService = {
		...primary_service || {},
		schedule_departure : getDepartureArrivalDate(primary_service, 'departure'),
		schedule_arrival   : getDepartureArrivalDate(primary_service, 'arrival'),
	};
	const { origin_port, destination_port, is_containers_gated_out } = modifiedPrimaryService || {};

	const disabledState = !defaultEditable;

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
			lowerLabel : deviated_departure ? `Fluctuated time of departure: ${deviated_departure}` : '',
			maxDate    : null,
		},
		{
			name       : 'schedule_arrival',
			label      : 'Actual time of arrival',
			lowerLabel : deviated_arrival && deviated_departure
				&& new Date(deviated_arrival) > new Date(deviated_departure)
				? `Fluctuated time of arrival: ${deviated_arrival}` : '',
			maxDate : null,
			minDate : departureDate,
			disable : false,
		},
		...(origin_port?.is_icd ? [{
			name  : 'origin_icd_departed_at',
			label : 'Departure from ICD Port Date',
		}] : []),
		...(destination_port?.is_icd ? [{
			name    : 'arrived_at_destination_icd_at',
			label   : 'Arrived At ICD Port Date',
			disable : !!is_containers_gated_out,
		}] : []),
	];

	const DEFAULT_VALUES = {};

	finalControls.forEach((control, index) => {
		const { name, label, maxDate = departureDate, disable = disabledState } = control || {};
		const prefillValue = getDate(modifiedPrimaryService[name]);

		finalControls[index] = {
			...finalControls[index],
			maxDate,
			disable,
			dateFormat            : 'MMM dd, yyyy, hh:mm:ss aaa',
			placeholder           : 'Select Date',
			isPreviousDaysAllowed : true,
			showTimeSelect        : true,
			rules                 : {
				required: {
					value   : !!prefillValue,
					message : `${label} is required`,
				},
			},
		};

		DEFAULT_VALUES[name] = prefillValue;
	});

	return { finalControls, defaultValues: DEFAULT_VALUES };
};

export default controls;
