import { isEmpty } from '@cogoport/utils';

export const documentType = [
	{
		name        : 'document_type',
		placeholder : 'Document Type',
		type        : 'select',
		span        : 6,
		label       : 'Document Type',
		options     : [
			{ label: 'Eway Bill', value: 'ftl_eway_bill_copy' },
			{ label: 'Commercial Invoice', value: 'ftl_commercial_invoice' },
		],
		rules     : { required: true },
		className : 'primary lg',
	},
];

const invoiceDocumentField = (item) => ({
	service_id   : item?.id || undefined,
	truck_number : item?.truck_number || undefined,
	url          : '',
	description  : '',
});

const ewayBillField = (item) => ({
	service_id   : item?.id || undefined,
	truck_number : item?.truck_number || undefined,
	url          : '',
	description  : '',
});

export const invoiceDocumentControls = (obj) => [
	{
		name  : 'upload_ftl_commercial_invoice',
		type  : 'fieldArray',
		value : !isEmpty(obj)
			? obj.map((item) => invoiceDocumentField(item))
			: [
				{
					url         : '',
					service_id  : '',
					description : '',
				},
			],
		controls: [
			{
				name     : 'truck_number',
				span     : 6,
				type     : 'text',
				label    : 'Truck Number',
				disabled : true,
				rules    : {
					required: {
						value   : true,
						message : 'Truck Number Req',
					},
				},
			},
			{
				name  : 'invoice_number',
				span  : 6,
				type  : 'text',
				label : 'Invoice Number',
				rules : {
					required: {
						value   : true,
						message : 'This is required',
					},
				},
			},
			{
				name  : 'invoice_date',
				span  : 6,
				type  : 'datepicker',
				label : 'Invoice Date',
				rules : {
					required: {
						value   : true,
						message : 'This is required',
					},
				},
			},
			{
				name  : 'description',
				rows  : 2,
				span  : 6,
				type  : 'textarea',
				label : 'Document Description',
			},
			{
				drag  : true,
				name  : 'url',
				span  : 12,
				type  : 'file',
				label : 'Document',
				rules : {
					required: {
						value   : true,
						message : 'This is required',
					},
				},
			},
		],
		showButtons      : false,
		showDeleteButton : true,
	},
];

export const ewayBillControls = (obj) => [
	{
		name  : 'upload_ftl_eway_bill_copy',
		type  : 'fieldArray',
		value : !isEmpty(obj)
			? obj.map((item) => ewayBillField(item))
			: [
				{
					url         : '',
					service_id  : '',
					description : '',
				},
			],
		controls: [
			{
				name     : 'truck_number',
				span     : 6,
				type     : 'text',
				label    : 'Truck Number',
				disabled : true,
				rules    : {
					required: {
						value   : true,
						message : 'Truck Number Req',
					},
				},
				options: [],
			},
			{
				name  : 'description',
				rows  : 2,
				span  : 6,
				type  : 'textarea',
				label : 'Document Description',
			},
			{
				drag  : true,
				name  : 'url',
				span  : 12,
				type  : 'file',
				label : 'Document',
				rules : {
					required: {
						value   : true,
						message : 'This is required',
					},
				},
			},
		],
		showButtons      : false,
		showDeleteButton : true,
	},
];
