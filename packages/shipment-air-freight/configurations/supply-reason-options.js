export const SUPPLY_CANCELLATION_REASONS = {
	not_in_progress: [
		{
			label : 'Space Unavailable',
			value : 'space_unavailable',
		},
		{
			label : 'Rates do not match',
			value : 'rates_do_not_match',
		},
		{
			label : 'The shipping line rejected the service',
			value : 'shipping_line_rejected_the_service',
		},
		{
			label : 'Schedule Not Available',
			value : 'schedule_not_available',
		},
		{
			label : 'Quote has expired',
			value : 'quote_has_expired',
		},
	],
	in_progress: [
		{
			label : 'Inventory issue at yard (complete inventory unavailable)',
			value : 'complete_inventory_issue',
		},
		{
			label : 'Inventory issue at yard (partial inventory unavailable)',
			value : 'partial_inventory_issue',
		},
		{
			label : 'Supplier is not reachable',
			value : 'supplier_unreachable',
		},
	],
};

export const SUPPLY_SUB_REASONS = {
	space_unavailable: [
		{
			label : 'Different sailing dates available on the same carrier',
			value : 'different_sailing_dates_available',
		},
		{
			label : 'Partial space available on the same carrier',
			value : 'partial_space_available_on_same_carrier',
		},
		{
			label : 'Space available on a different carrier',
			value : 'space_available_on_different_carrier',
		},
	],

	rates_do_not_match: [
		{
			label:
				'rate available for the selected schedule on higher side than provided before',
			value:
				'rate_available_for_the_selected_schedule_on_higher_side_than_provided_before',
		},
	],

	shipping_line_rejected_the_service: [
		{
			label : 'The commodity is blacklisted/high risk',
			value : 'the_commodity_is_blacklisted/high_risk',
		},
		{
			label : 'Importer/exporter or consignee is blacklisted',
			value : 'importer/exporter_or_consignee_is_blacklisted',
		},
		{
			label : 'Line does not provide the services to destination',
			value : 'line_does_not_provide_the_services_to_destination',
		},
	],
};
