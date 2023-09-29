export const parametersForm = 	{
	service: {
		name        : 'service_type',
		type        : 'select',
		placeholder : 'Select Service Type ',
		options     : [
			{
				id    : 1,
				label : 'FCL freight',
				value : 'fcl_freight_service',
			},
		],
		rules: { required: 'Service Type is Required' },
	},

	tradeType: {
		name        : 'trade_type',
		type        : 'select',
		placeholder : 'Select Trade Type',
		options     : [
			{ label: 'Import', value: 'import' },
			{ label: 'Export', value: 'export' },
		],
		rules: { required: 'Trade Type is Required' },
	},

	importIncoTerms: {
		name        : 'inco_term',
		type        : 'select',
		placeholder : 'Select IncoTerms',
		options     : [
			{ label: 'FOB', value: 'fob' },
			{ label: 'EXW', value: 'exw' },
			{ label: 'FCA', value: 'fca' },
			{ label: 'FAS', value: 'fas' },
		],
		rules: { required: 'Inco terms is Required' },
	},

	exportIncoterms: {
		name        : 'inco_term',
		type        : 'select',
		placeholder : 'Select Incoterms',
		isClearable : true,
		multiple    : true,
		options     : [
			{ label: 'DDP', value: 'ddp' },
			{ label: 'DAP', value: 'dap' },
			{ label: 'DAT', value: 'dat' },
			{ label: 'CPT', value: 'cpt' },
			{ label: 'CIP', value: 'cip' },
			{ label: 'CIF', value: 'cif' },
			{ label: 'CFR', value: 'cfr' },
		],
		rules: { required: 'Inco terms is Required' },
	},

	containerType: {
		name        : 'container_type',
		type        : 'select',
		placeholder : 'Select Container Type',
		isClearable : true,
		options     : [
			{
				label : 'Standard(Dry)',
				value : 'standard',
			},
			{
				label : 'Refrigerated (Reefer)',
				value : 'refer',
			},
			{
				label : 'Open Top',
				value : 'open_top',
			},
			{
				label : 'Flat Rack',
				value : 'flat_rack',
			},
			{
				label : 'ISO Tank',
				value : 'iso_tank',
			},
			{
				label : 'Open Side (One Door Open)',
				value : 'open_side',
			},
		],
	},

};
