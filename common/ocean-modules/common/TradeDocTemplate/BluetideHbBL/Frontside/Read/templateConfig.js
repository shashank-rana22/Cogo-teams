export const SECTION_ONE_CHILD_1_MAPPINGS = [
	{ label: 'Consigner/Shipper', key: 'consigner' },
	{ label: 'Consignee (or order)', key: 'consignee' },
	{ label: 'Notify Address', key: 'notify_address' },
	{
		label : null,
		key   : 'location',
		children:
				[
					{
						childrenLabel : 'Place of Acceptance',
						childrenKey   : 'place_of_acceptance',
						className     : 'section_one_child_1-location_element',
					},
					{
						childrenLabel : 'Port of Loading',
						childrenKey   : 'port_of_loading',
						className     : 'section_one_child_1-location_element',
					},
				],
	},
	{
		label : null,
		key   : 'location',
		children:
				[
					{
						childrenLabel : 'Port of Discharge',
						childrenKey   : 'port_of_discharge',
						className     : 'section_one_child_1-location_element',
					},
					{
						childrenLabel : 'Place of Delivery',
						childrenKey   : 'place_of_delivery',
						className     : 'section_one_child_1-location_element',
					},
				],
	},
	{
		label : null,
		key   : 'location',
		children:
				[
					{
						childrenLabel : 'Vessel & Voyage No.',
						childrenKey   : 'vessel_number',
						className     : 'section_one_child_1-location_element',
					},
				],
	},
];

export const SECTION_THREE_MAPPINGSS = [
	{ label: 'Freight Terms', key: 'freight_amount' },
	{ label: 'Freight Payable At', key: 'freight_payable_at' },
	{ label: 'Number of original MTD(s)', key: 'number_of_original_MTDs' },
	{ label: 'Place and date of issue', key: 'place_and_date_of_issue' }];
