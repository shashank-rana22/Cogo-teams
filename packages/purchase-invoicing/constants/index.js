export const CARGO_LABELS = [
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

export const IS_MAIN_SERVICE = [
	'fcl_freight_service',
	'lcl_freight_service',
	'air_freight_service',
];

export const PURCHASE_TYPE_LIST = [
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

export const INVOICE_TYPE_OPTIONS = [
	{ label: 'Invoice', value: 'purchase_invoice' },
	{ label: 'Credit Note', value: 'credit_note' },
	{ label: 'Proforma', value: 'proforma_invoice' },
	{ label: 'Advance Payment', value: 'advanceBill' },
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

export const INVOICE_TYPE_OPTIONS_CN = [
	{ label: 'Invoice', value: 'purchase_invoice' },
	{ label: 'Proforma', value: 'proforma_invoice' },
	{ label: 'Advance Payment', value: 'advanceBill' },
];

export const OPTIONSCN = [
	{ label: 'Credit Note', value: 'credit_note' },
];

export const VERIFICATION_STATUS = ['pending', 'verified'];

export const EMPTY_POC = [{ name: '', email: '', mobile_number: '', alternate_mobile_number: '' }];

export const PAYMENT_TYPE = [
	{ label: 'Full', value: 'full' },
	{ label: 'Balance', value: 'balance' },
	{ label: 'Advance', value: 'advanced' },
];

export const IS_INVOICE_INCEDENTAL = [
	{ label: 'Yes', value: 'yes' },
	{ label: 'No', value: 'no' },
];

export const REMARKS_FOR_CN = [
	{
		label : 'Delayed Delivery',
		value : 'delayed_delivery',
	},
	{
		label : 'Goods Damage',
		value : 'good_damage',
	},
	{
		label : 'Non-Placement Penalty charges',
		value : 'non_placement_penalty_charges',
	},
];
