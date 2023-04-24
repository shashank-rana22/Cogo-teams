import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';

const getExtraControls = {
	air_booking_note: [
		{
			label : 'Booking Number',
			name  : 'document_number',
			type  : 'text',
			span  : 6,
			rules : {
				required: { value: true, message: 'Booking Note number is required' },
			},
		},
	],
	igm_document: [
		{
			label : 'IGM Number',
			name  : 'igm_number',
			type  : 'text',
			span  : 6,
			rules : { required: { value: true, message: 'IGM Number is required' } },
		},
	],
	draft_bill_of_lading: [
		{
			label : 'Bill of lading Number',
			name  : 'document_number',
			type  : 'text',
			span  : 6,
			rules : {
				required: { value: true, message: 'Bill of lading number is required' },
			},
		},
	],
	draft_house_bill_of_lading: [
		{
			label : 'Bill of lading Number',
			name  : 'document_number',
			type  : 'text',
			span  : 6,
			rules : {
				required: { value: true, message: 'Bill od lading Number is required' },
			},
		},
	],
	bill_of_lading: [
		{
			label    : 'Bill of lading Number',
			name     : 'document_number',
			type     : 'text',
			span     : 6,
			disabled : true,
			rules    : {
				required: { value: true, message: 'Bill od lading Number is required' },
			},
		},
		{
			label : '',
			name  : 'bl_detail_id',
			type  : 'text',
			show  : false,
		},
	],
	house_bill_of_lading: [
		{
			label    : 'Bill of lading Number',
			name     : 'document_number',
			type     : 'text',
			span     : 6,
			disabled : true,
			rules    : {
				required: { value: true, message: 'Bill of lading Number is required' },
			},
		},
		{
			label : '',
			name  : 'bl_detail_id',
			type  : 'text',
			show  : false,
		},
	],
	shipping_bill: [
		{
			label : 'Shipping bill Number',
			name  : 'document_number',
			type  : 'text',
			span  : 6,
			rules : {
				required: { value: true, message: 'Shipping Bill Number is required' },
			},
		},
		{
			name           : 'fob_currency',
			label          : 'FOB Currency',
			type           : 'select-2',
			optionsListKey : 'currencies',
			value          : GLOBAL_CONSTANTS.currency_code.USD,
			span           : 6,
			rules          : { required: { value: true, message: 'Fob Currency is required' } },
		},
		{
			name          : 'shipment_fob_value',
			label         : 'FOB Amount',
			type          : 'number',
			span          : 6,
			isShowStepprr : false,
			rules         : { required: { value: true, message: 'Fob Amount is required' } },
		},
	],
	delivery_order: [
		{
			label : 'Delivery order number',
			name  : 'delivery_number',
			type  : 'text',
			span  : 6,
			rules : {
				required: { value: true, message: 'Delivery order number is required' },
			},
		},
		{
			label                 : 'Docment Issue Date',
			name                  : 'document_issue_date',
			type                  : 'datepicker',
			withTimePicker        : true,
			isPreviousDaysAllowed : true,
			span                  : 6,
			rules                 : {
				required: { value: true, message: 'Document Issue Date is required' },
			},
		},
		{
			label          : 'Docment Expiry Date',
			name           : 'document_expiry_date',
			type           : 'datepicker',
			withTimePicker : true,
			span           : 6,
			rules          : {
				required: { value: true, message: 'Document Expiry date is required' },
			},
		},
	],
	booking_note  : [],
	bill_of_entry : [
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
