import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import TIMELINE_EDITABLE from '../config/timelineEditable.json';
import { getDate } from '../utils/getDate';

const FLIGHT_STATE_ORIGIN = ['flight_arrived', 'flight_departed', 'cargo_handed_over_at_origin'];
const FLIGHT_STATE_DEPART = ['flight_arrived', 'flight_departed'];

const controls = ({ primary_service, departureDate, stakeholderConfig = {} }) => {
	const state = primary_service?.state || '';

	const disabledState = !TIMELINE_EDITABLE?.primary_service?.state?.includes(state);
	const editableFields = stakeholderConfig?.timeline?.editable_fields;

	const finalControls = [
		{
			name                  : 'cargo_handed_over_at_origin_at',
			label                 : 'Cargo Handover At Airport',
			disable               : disabledState || FLIGHT_STATE_ORIGIN.includes(state),
			dateFormat            : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			placeholder           : 'Select Date',
			isPreviousDaysAllowed : true,
		},
		{
			name                  : 'schedule_departure',
			label                 : 'Actual time of departure',
			maxDate               : null,
			disable               : disabledState || FLIGHT_STATE_DEPART.includes(state),
			dateFormat            : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			placeholder           : 'Select Date',
			isPreviousDaysAllowed : true,
		},
		{
			name                  : 'schedule_arrival',
			label                 : 'Actual time of arrival',
			maxDate               : null,
			minDate               : departureDate,
			disable               : disabledState,
			dateFormat            : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			placeholder           : 'Select Date',
			isPreviousDaysAllowed : true,
		},
	];

	const DEFAULT_VALUES = {};

	finalControls.forEach((control) => {
		const { name } = control;
		DEFAULT_VALUES[name] = getDate(primary_service?.[name]);
	});

	const newControls = finalControls.map((control) => ({
		...control,
		disable: control.disable || !editableFields.includes(control.name),
	}));

	return { finalControls: newControls, defaultValues: DEFAULT_VALUES };
};

export default controls;
