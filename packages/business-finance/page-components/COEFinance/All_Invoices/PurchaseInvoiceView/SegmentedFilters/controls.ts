const controls = [
	{
		name        : 'urgencyTag',
		type        : 'multiSelect',
		placeholder : 'Select Urgency',
		span        : 6,
		isClearable : true,

		options: [
			{ label: 'Advanced PDA Accounts', value: 'pda' },
			{ label: 'Advanced CFS security deposit', value: 'cfs' },
			{ label: 'Surrender (Telex) BL Payments', value: 'telex' },
			{ label: 'Airlines DO Payments', value: 'air_do' },
			{ label: 'BL Amendment Payments', value: 'bl_amnd' },
			{ label: 'LDC/LBC Payments', value: 'ldc_lbc' },
			{ label: 'Cancel Charges', value: 'cxl' },
			{ label: 'Detention Payments', value: 'dtn' },
			{ label: 'Direct Port Delivery (DPD)', value: 'dpd' },
			{ label: 'Short Payment', value: 'short_payment' },
			{ label: 'ODEX', value: 'odex' },
			{ label: 'Short Transit Shipment', value: 'short_transit_shipment' },
			{ label: 'Co-ordination Charges', value: 'coordination_charges' },
			{ label: 'SEZ Shipment', value: 'sez_shipment' },
		],
	},
];
export default controls;
