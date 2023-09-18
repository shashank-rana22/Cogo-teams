import { formatDateToString } from '@cogo/date';

const editOceanControls = ({ editDetail, shipping_line_id = '' }) => [
	{
		name           : 'location_id',
		type           : 'location-select',
		placeholder    : 'Select Location',
		label          : 'Location',
		optionsListKey : 'locations',
		span           : 9,
		className      : 'primary md',
		rules          : { required: 'This is required' },
	},

	{
		label          : 'Event Date',
		name           : 'event_date',
		type           : 'datepicker',
		withTimePicker : true,
		placeholder    : 'Event Date',
		span           : 4,
		className      : 'primary md',
		rules          : { required: 'This is required' },
		value          : formatDateToString(editDetail?.event_date),
	},
	{
		label          : 'Actual Date',
		name           : 'actual_date',
		type           : 'datepicker',
		withTimePicker : true,
		placeholder    : 'Actual Date',
		span           : 4,
		className      : 'primary md',
		rules          : { required: 'This is required' },
		value          : formatDateToString(editDetail?.actual_date),
	},

	{
		label          : 'Milestone',
		name           : 'milestone',
		type           : 'creatable-select',
		value          : editDetail?.milestone,
		placeholder    : 'Milestone',
		optionsListKey : 'milestone_select',
		params         : {
			shipping_line_id,
		},
		span      : 4,
		className : 'primary md',
		rules     : { required: 'This is required' },
	},
	{
		label       : 'Transport Mode',
		name        : 'transport_mode',
		type        : 'text',
		placeholder : 'Transport Mode',
		span        : 4,
		className   : 'primary md',
		rules       : { required: 'This is required' },
		value       : editDetail?.transport_mode,
	},
	{
		label       : 'Vessel Name',
		name        : 'vessel_name',
		type        : 'text',
		placeholder : 'Vessel Name',
		span        : 4,
		className   : 'primary md',
		rules       : { required: 'This is required' },
		value       : editDetail?.vessel_name,
	},
	{
		label       : 'Voyage No',
		name        : 'voyage_no',
		type        : 'text',
		placeholder : 'Voyage no',
		span        : 4,
		className   : 'primary md',
		rules       : { required: 'This is required' },
		value       : editDetail?.voyage_no,
	},
];

export default editOceanControls;
