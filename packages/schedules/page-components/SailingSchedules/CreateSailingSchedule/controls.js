const controls = [
	{
		name        : 'origin_port_id',
		label       : 'Origin Port',
		type        : 'select',
		placeholder : 'Select Origin Port',
		span        : 4,
		size        : 'md',
		rules       : { required: 'Required' },
	},
	{
		name        : 'destination_port_id',
		label       : 'Destination Port',
		type        : 'select',
		placeholder : 'Select Destination Port',
		span        : 4,
		size        : 'md',
		rules       : { required: 'Required' },
	},
	{
		name           : 'shipping_line_id',
		label          : 'Shipping Line',
		type           : 'select',
		optionsListKey : 'shipping-lines',
		placeholder    : 'Select Shipping Line',
		span           : 4,
		size           : 'md',
		rules          : { required: 'Required' },
	},
	{
		name        : 'number_of_stops',
		label       : 'Number Of Stops',
		type        : 'number',
		placeholder : 'Type here...',
		span        : 4,
		size        : 'md',
		rules       : { required: 'Required' },
	},
	{
		name        : 'departure',
		label       : 'Departure',
		type        : 'date_picker',
		placeholder : 'Select Date',
		span        : 4,
		size        : 'md',
		rules       : { required: 'Required' },
	},
	{
		name        : 'arrival',
		label       : 'Arrival',
		type        : 'date_picker',
		placeholder : 'Select Date',
		span        : 4,
		size        : 'md',
		rules       : { required: 'Required' },
	},
	{
		name        : 'transit_time',
		label       : 'Transit Time',
		type        : 'text',
		placeholder : 'Type here...',
		span        : 4,
		size        : 'md',
	},
	{
		name        : 'vessel_name',
		label       : 'Vessel Name',
		type        : 'text',
		placeholder : 'Type here...',
		span        : 4,
		size        : 'md',
	},
	{
		name        : 'imo_number',
		label       : 'Imo Number',
		type        : 'text',
		placeholder : 'Type here...',
		span        : 4,
		size        : 'md',
	},
	{
		name        : 'voyage_number',
		label       : 'Voyage Number',
		type        : 'text',
		placeholder : 'Type here...',
		span        : 4,
		size        : 'md',
	},
	{
		name        : 'service_name',
		label       : 'Service Name',
		type        : 'text',
		placeholder : 'Type here...',
		span        : 4,
		size        : 'md',
	},
	{
		name        : 'terminal_cutoff',
		label       : 'Terminal Cutoff',
		type        : 'date_picker',
		placeholder : 'Select Date',
		span        : 4,
		size        : 'md',
	},
	{
		name        : 'bk_cutoff',
		label       : 'Bk Cutoff',
		type        : 'date_picker',
		placeholder : 'Select Date',
		span        : 4,
		size        : 'md',
	},
	{
		name        : 'si_cutoff',
		label       : 'SI Cutoff',
		type        : 'date_picker',
		placeholder : 'Select Date',
		span        : 4,
		size        : 'md',
	},
	{
		name        : 'vgm_cutoff',
		label       : 'VGM Cutoff',
		type        : 'date_picker',
		placeholder : 'Select Date',
		span        : 4,
		size        : 'md',
	},
	{
		name        : 'reefer_cutoff',
		label       : 'Reefer Cutoff',
		type        : 'date_picker',
		placeholder : 'Select Date',
		span        : 4,
		size        : 'md',
	},
	{
		name        : 'haz_bk_cutoff',
		label       : 'HAZ BK Cutoff',
		type        : 'date_picker',
		placeholder : 'Select Date',
		span        : 4,
		size        : 'md',
	},
	{
		name        : 'origin_terminal_name',
		label       : 'Origin Terminal',
		type        : 'select',
		valueKey    : 'display_name',
		placeholder : 'Select Destination Port',
		span        : 4,
		size        : 'md',
	},
	{
		name        : 'destination_terminal_name',
		label       : 'Destination Port',
		valueKey    : 'display_name',
		type        : 'select',
		placeholder : 'Select Destination Port',
		span        : 4,
		size        : 'md',
	},
];

export default controls;
