const tdsCollectionFilters = () => ([
	{
		label    : 'Business Partner',
		name     : 'id',
		type     : 'asyncSelect',
		asyncKey : 'trade_party_details',
		theme    : 'admin',
		valueKey : 'id',
		size     : 'md',
		show     : true,

		style       : { width: '250px', margin: '6px 0px 10px 0px' },
		span        : 6,
		placeholder : 'Business Partner',
		rules       : { required: 'Customer Name is required' },
	},

	{
		label       : 'Select New TDS Style',
		name        : 'tds_deduction_style',
		type        : 'select',
		placeholder : 'TDS Style',
		show        : true,
		theme       : 'admin',
		options     : [
			{ label: 'Gross Amount', value: 'gross' },
			{ label: 'Net Amount', value: 'net' },
			{ label: 'Gross - Taxable', value: 'gross_taxable' },
			{ label: 'Gross - Non - Taxable', value: 'gross_non_taxable' },
			{ label: 'Net - Taxable', value: 'net_taxable' },
			{ label: 'Random - Undefined', value: 'random' },
		],
		size         : 'md',
		style        : { width: '100%', margin: '6px 0px 10px 0px' },
		showOptional : false,
	},
	{
		label        : 'New TDS Rate (%)',
		name         : 'tds_deduction_rate',
		placeholder  : 'Enter New Tds Rate',
		type         : 'text',
		span         : 3,
		show         : true,
		theme        : 'admin',
		size         : 'md',
		style        : { width: '100%', margin: '6px 0px 10px 0px' },
		showOptional : false,
	},

]
);
export default tdsCollectionFilters;
