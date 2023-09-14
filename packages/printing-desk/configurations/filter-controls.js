const filterControls = ({ t = () => {} }) => [
	{
		name    : 'blCategory',
		type    : 'select',
		label   : t('printingDesk:filter_controls_awb_category_label'),
		options : [
			{ value: 'hawb', label: t('printingDesk:filter_controls_hawb_label') },
			{ value: 'mawb', label: t('printingDesk:filter_controls_mawb_label') },
		],
		placeholder : t('printingDesk:filter_controls_awb_category_placeholder'),
		span        : 6,
	},
	{
		name        : 'airlineId',
		type        : 'async-select',
		asyncKey    : 'list_operators',
		label       : t('printingDesk:filter_controls_carrier_label'),
		placeholder : t('printingDesk:filter_controls_airline_placeholder'),
		span        : 6,
	},
	{
		name        : 'originAirportId',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		params      : { filters: { type: ['airport'] } },
		label       : t('printingDesk:filter_controls_origin_airport_label'),
		placeholder : t('printingDesk:filter_controls_origin_airport_placeholder'),
		span        : 6,
	},
	{
		name        : 'destinationAirportId',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		params      : { filters: { type: ['airport'] } },
		label       : t('printingDesk:filter_controls_dest_airport_label'),
		placeholder : t('printingDesk:filter_controls_dest_airport_placeholder'),
		span        : 6,
	},
	{
		name                  : 'cargoHandedOverAtOriginAt',
		type                  : 'date_picker',
		label                 : t('printingDesk:filter_controls_handover_date_label'),
		placeholder           : t('printingDesk:filter_controls_handover_date_placeholder'),
		isPreviousDaysAllowed : true,
		span                  : 6,
	},

];
export default filterControls;
