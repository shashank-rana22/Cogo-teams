export const cargolabels = [
	'airline',
	'container_size',
	'containers_count',
	'container_type',
	'commodity',
	'inco_term',
	'trucks_count',
	'trade_type',
	'packages',
	'volume',
	'weight',
	'master_airway_bill_number',
	'house_airway_bill_number',
	'haulage_type',
	'transport_mode',
	'cargo_weight_per_container',
	'destination_cargo_handling_type',
	'truck_type',
	'trip_type',
	'lr_number',
	'payment_term',
	'container_load_type',
	'contract_reference_id',
	'awb_execution_date',
	'truck_types',
];

export const isMainService = [
	'fcl_freight_service',
	'lcl_freight_service',
	'air_freight_service',
];

export const purchaseTypeList = [
	{
		label : 'Purchase',
		value : 'purchase_invoice',
	},
	{
		label : 'Proforma',
		value : 'proforma_invoice',
	},
	{
		label : 'CN',
		value : 'credit_note',
	},
	{
		label : 'Reimbursement',
		value : 'reimbursement',
	},
];

export const invoiceTypeOptions = [
	{ label: 'Invoice', value: 'purchase_invoice' },
	{ label: 'Credit Note', value: 'credit_note' },
	{ label: 'Proforma', value: 'proforma_invoice' },
];

export const EMPTY_EXCHANGE_RATES = { from_currency: '', to_currency: '', rate: 1 };

export const EMPTY_LINE_ITEMS = {
	container_number : '',
	code             : '',
	currency         : '',
	rate             : 1,
	unit             : '',
	quantity         : '',
	exchange_rate    : '',
	tax_amt          : '',
	cost             : '',
};

export const UNIT_OPTIONS = [
	{ label: 'Per container', value: 'per_container' },
	{ label: 'Per bl', value: 'per_bl' },
	{ label: 'Per shipment', value: 'per_shipment' },
	{ label: 'Per Kg', value: 'per_kg' },
	{ label: 'Per CBM', value: 'per_cbm' },
	{ label: 'Per Truck', value: 'per_truck' },
];

export const PAYMENT_MODE_OPTIONS = [
	{ label: 'Cash', value: 'cash' },
];

export const BILL_MAPPINGS = {
	purchase_invoice : 'BILL',
	proforma_invoice : 'BILL',
	credit_note      : 'CREDIT_NOTE',
	reimbursement    : 'REIMBURSEMENT',
};

export const invoiceTypeOptionsCN = [
	{ label: 'Invoice', value: 'purchase_invoice' },
	{ label: 'Proforma', value: 'proforma_invoice' },
];

export const optionsCN = [
	{ label: 'Credit Note', value: 'credit_note' },
];

export const EMPTY_POC = [{ name: '', email: '', mobile_number: '', alternate_mobile_number: '' }];
