import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getExtraControls = {
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
			label : 'Bill of Lading Number',
			name  : 'document_number',
			type  : 'text',
			span  : 6,
			rules : {
				required: { value: true, message: 'Bill of Lading Number is required' },
			},
		},
	],
	draft_house_bill_of_lading: [
		{
			label : 'Bill of Lading Number',
			name  : 'document_number',
			type  : 'text',
			span  : 6,
			rules : {
				required: { value: true, message: 'Bill od Lading Number is required' },
			},
		},
	],
	bill_of_lading: [
		{
			label    : 'Bill of Lading Number',
			name     : 'document_number',
			type     : 'text',
			span     : 6,
			disabled : true,
			rules    : {
				required: { value: true, message: 'Bill od Lading Number is required' },
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
			label    : 'Bill of Lading Number',
			name     : 'document_number',
			type     : 'text',
			span     : 6,
			disabled : true,
			rules    : {
				required: { value: true, message: 'Bill of Lading Number is required' },
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
			label : 'Shipping Bill Number',
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
			rules          : { required: { value: true, message: 'FOB Currency is required' } },
		},
		{
			name          : 'shipment_fob_value',
			label         : 'FOB Amount',
			type          : 'number',
			span          : 6,
			isShowStepprr : false,
			rules         : { required: { value: true, message: 'FOB Amount is required' } },
		},
	],
	delivery_order: [
		{
			label : 'Delivery Order Number',
			name  : 'delivery_number',
			type  : 'text',
			span  : 6,
			rules : {
				required: { value: true, message: 'Delivery Order Number is required' },
			},
		},
		{
			label                 : 'Document Issue Date',
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
			label          : 'Document Expiry Date',
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
			label : 'Bill of Entry Number',
			name  : 'document_number',
			type  : 'text',
			span  : 6,
			rules : {
				required: { value: true, message: 'Bill of Entry Number is required' },
			},
		},
		{
			name           : 'fob_currency',
			label          : 'FOB Currency',
			type           : 'select',
			optionsListKey : 'currencies',
			value          : GLOBAL_CONSTANTS.currency_code.USD,
			span           : 6,
			rules          : { required: { value: true, message: 'FOB Currency is required' } },
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
			label : 'Import Customs Entry Number',
			name  : 'document_number',
			type  : 'text',
			span  : 6,
			rules : {
				required: {
					value   : true,
					message : 'Import Customs Entry Number is required',
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
};

export default getExtraControls;
