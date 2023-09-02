import TIMELINE_EDITABLE from '../config/timelineEditable.json';
import { getCustomDate } from '../utils/getCustomDate';

const FLIGHT_STATE_ORIGIN = ['flight_arrived', 'flight_departed', 'cargo_handed_over_at_origin'];
const FLIGHT_STATE_DEPART = ['flight_arrived', 'flight_departed'];

const controls = ({ primary_service, departureDate, stakeholderConfig = {} }) => {
	const state = primary_service?.state || '';

	const handedOverDate = getCustomDate(primary_service?.cargo_handed_over_at_origin_at);
	const disabledState = !TIMELINE_EDITABLE?.primary_service?.state?.includes(state);
	const editableFields = stakeholderConfig?.timeline?.editable_fields;

	const finalControls = [
		{
			name                  : 'cargo_handed_over_at_origin_at',
			label                 : 'Cargo Handover At Airport',
			disable               : disabledState || FLIGHT_STATE_ORIGIN.includes(state),
			placeholder           : 'Select Date',
			placement             : 'left-end',
			isPreviousDaysAllowed : true,
		},
		{
			name                  : 'schedule_departure',
			label                 : 'Actual time of departure',
			maxDate               : null,
			minDate               : handedOverDate,
			disable               : disabledState || FLIGHT_STATE_DEPART.includes(state),
			placeholder           : 'Select Date',
			isPreviousDaysAllowed : true,
			placement             : 'right-end',
		},
		{
			name                  : 'schedule_arrival',
			label                 : 'Actual time of arrival',
			maxDate               : null,
			minDate               : departureDate,
			disable               : disabledState,
			placeholder           : 'Select Date',
			isPreviousDaysAllowed : true,
			placement             : 'top',
		},
	];

	const DEFAULT_VALUES = {};

	finalControls.forEach((control) => {
		const { name } = control;
		DEFAULT_VALUES[name] = getCustomDate(primary_service?.[name]);
	});

	const newControls = finalControls.map((control) => ({
		...control,
		disable: control.disable || !editableFields.includes(control.name),
	}));

	return { finalControls: newControls, defaultValues: DEFAULT_VALUES };
};

export default controls;
