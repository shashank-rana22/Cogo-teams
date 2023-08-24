const filterControls = (t) => [
	{
		name    : 'blCategory',
		type    : 'select',
		label   : t('printingDesk:filter_controls_label1'),
		options : [
			{ value: 'hawb', label: t('printingDesk:filter_controls_label2') },
			{ value: 'mawb', label: t('printingDesk:filter_controls_label3') },
		],
		placeholder : t('printingDesk:filter_controls_placeholder1'),
		span        : 6,
	},
	{
		name        : 'airlineId',
		type        : 'async-select',
		asyncKey    : 'list_operators',
		label       : t('printingDesk:filter_controls_label4'),
		placeholder : t('printingDesk:filter_controls_placeholder4'),
		span        : 6,
	},
	{
		name        : 'originAirportId',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		params      : { filters: { type: ['airport'] } },
		label       : t('printingDesk:filter_controls_label5'),
		placeholder : t('printingDesk:filter_controls_placeholder5'),
		span        : 6,
	},
	{
		name        : 'destinationAirportId',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		params      : { filters: { type: ['airport'] } },
		label       : t('printingDesk:filter_controls_label6'),
		placeholder : t('printingDesk:filter_controls_placeholder6'),
		span        : 6,
	},
	{
		name                  : 'cargoHandedOverAtOriginAt',
		type                  : 'date_picker',
		label                 : t('printingDesk:filter_controls_label7'),
		placeholder           : t('printingDesk:filter_controls_placeholder7'),
		isPreviousDaysAllowed : true,
		span                  : 6,
	},

];
export default filterControls;
