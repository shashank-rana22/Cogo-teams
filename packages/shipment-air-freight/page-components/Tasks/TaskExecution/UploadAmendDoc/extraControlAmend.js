import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getExtraControls = {
	bill_of_entry: [
		{
			label : 'Bill of entry Number',
			name  : 'document_number',
			type  : 'text',
			span  : 6,
			rules : {
				required: { value: true, message: 'Bill of entry Number is required' },
			},
		},
		{
			name           : 'fob_currency',
			label          : 'FOB Currency',
			type           : 'select',
			optionsListKey : 'currencies',
			value          : GLOBAL_CONSTANTS.currency_code.USD,
			span           : 6,
			rules          : { required: { value: true, message: 'FOB CUrrency is required' } },
		},
		{
			name          : 'fob_value',
			label         : 'FOB Amount',
			type          : 'number',
			span          : 6,
			isShowStepprr : false,
			rules         : { required: { value: true, message: 'FOB Amount is required' } },
		},
	],
	house_airway_bill: [
		{
			label    : 'Airway bill Number',
			name     : 'document_number',
			type     : 'text',
			span     : 6,
			disabled : true,
			rules    : {
				required: { value: true, message: 'Airway bill number is required' },
			},
		},
	],
	airway_bill: [
		{
			label    : 'Airway bill Number',
			name     : 'document_number',
			type     : 'text',
			span     : 6,
			disabled : true,
			rules    : { required: { value: true, message: 'Airway bill is required' } },
		},
	],
	draft_house_airway_bill: [
		{
			label : 'Draft Airway bill Number',
			name  : 'document_number',
			type  : 'text',
			span  : 6,
			rules : {
				required: {
					value   : true,
					message : 'Draft Airway bill number is required',
				},
			},
		},
	],
	draft_airway_bill: [
		{
			label : 'Draft Airway bill Number',
			name  : 'document_number',
			type  : 'text',
			span  : 6,
			rules : {
				required: {
					value   : true,
					message : 'Draft Airway bill number is required',
				},
			},
		},
	],
	export_customs_entry: [
		{
			label : 'Export customs entry number',
			name  : 'document_number',
			type  : 'text',
			span  : 6,
			rules : {
				required: {
					value   : true,
					message : 'Export customs entry number is required',
				},
			},
		},
	],
	import_customs_entry: [
		{
			label : 'Import customs entry number',
			name  : 'document_number',
			type  : 'text',
			span  : 6,
			rules : {
				required: {
					value   : true,
					message : 'Import customs entry number is required',
				},
			},
		},
	],
	invoice: [
		{
			name           : 'cargo_currency',
			label          : 'Cargo Currency',
			optionsListKey : 'currencies',
			type           : 'select',
			span           : 6,
			rules          : {
				required: { value: true, message: 'Cargo Currency is required' },
			},
		},
		{
			label : 'Cargo Value',
			name  : 'cargo_value',
			type  : 'number',
			span  : 6,
			min   : 1,
			rules : { required: { value: true, message: 'Cargo Value is required' } },
		},
	],
	ltl_advance_payment: [
		{
			name      : 'invoice_number',
			span      : 2.5,
			type      : 'text',
			label     : 'Invoice Number',
			className : 'primary lg',
			disabled  : true,
			rules     : {
				required: {
					value   : true,
					message : 'This is required',
				},
			},
		},
		{
			name      : 'payment_mode',
			span      : 1.5,
			type      : 'select',
			label     : 'Payment Mode',
			className : 'primary lg',
			rules     : {
				required: {
					value   : true,
					message : 'This is required',
				},
			},
			options: [
				{
					label : 'Gateway',
					value : 'GATEWAY',
				},
				{
					label : 'Bank',
					value : 'BANK',
				},
				{
					label : 'UPI',
					value : 'UPI',
				},
			],
		},
		{
			name      : 'amount',
			span      : 2,
			type      : 'price-select',
			label     : 'Total amount',
			className : 'primary lg',
			rules     : {
				required: {
					value   : true,
					message : 'This is required',
				},
			},
		},
		{
			name      : 'payment_reference_number',
			span      : 3,
			type      : 'text',
			label     : 'Payment Reference Number',
			className : 'primary lg',
			rules     : {
				required: {
					value   : true,
					message : 'This is required',
				},
			},
		},
	],
};

export default getExtraControls;
