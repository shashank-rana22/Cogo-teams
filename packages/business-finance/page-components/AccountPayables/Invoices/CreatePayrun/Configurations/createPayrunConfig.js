export const CREATE_PAYRUN_CONFIG = {
	showHeader         : true,
	showHeaderCheckbox : true,
	headerStyles       : {
		borderRadius : '8px',
		background   : 'none',
		color        : '#000',
		fontSize     : '12px',
		fontWeight   : '600',
	},
	bodyStyles: {
		color     : ' #333333',
		fontSize  : '12px',
		borderTop : '1.8px solid #F68B21',
	},

	itemStyles: {
		padding      : '8px',
		paddingLeft  : '0px',
		borderBottom : '1px solid #F8F2E7',
	},
	fields: [
		{
			func : 'renderCheckbox',
			span : 0.2,
		},
		{
			label     : 'Collection Party',
			key       : 'organizationName',
			func      : 'renderToolTip',
			maxLength : 36,
			span      : 1.6,
		},
		{
			label  : 'Invoice Number',
			key    : 'invoice_number',
			func   : 'renderFieldPair',
			span   : 1,
			topKey : {
				key         : 'invoiceNumber',
				type        : 'href',
				redirectKey : 'documentUrl',
			},
			lowerKey: {
				key  : 'invoiceType',
				type : 'tag',
			},
		},
		{
			label : 'Entity',
			key   : 'entityCode',
			span  : 0.6,
		},
		{
			label  : 'SID',
			key    : 'sid',
			func   : 'renderFieldPair',
			span   : 1,
			topKey : {
				key: 'jobNumber',
			},
			lowerKey: {
				key  : 'serviceType',
				type : 'serviceType',
			},
		},
		{
			label  : 'Invoice',
			key    : 'invoice',
			func   : 'renderFieldPair',
			span   : 1,
			topKey : {
				key         : 'invoiceAmount',
				type        : 'amount',
				currencyKey : 'currency',
			},
			lowerKey: {
				key  : 'paymentStatus',
				type : 'tag',
			},
		},
		{
			label       : 'Tds',
			key         : 'tdsAmount',
			func        : 'renderEditableTds',
			editable    : true,
			currencyKey : 'currency',
			fallBackKey : 'tdsValue',
			span        : 1,
		},
		{
			label       : 'Paid',
			key         : 'paidAmount',
			span        : 1,
			func        : 'renderAmount',
			currencyKey : 'currency',
		},
		{
			label       : 'Payable',
			key         : 'payableAmount',
			span        : 1,
			editable    : true,
			fallBackKey : 'payableValue',
			func        : 'renderEditablePayable',
			currencyKey : 'currency',
		},
		{
			label   : 'Invoice Dates',
			key     : 'invoice_dates',
			sorting : { name: 'dueDateSortType' },
			span    : 1.4,
			func    : 'renderInvoiceDates',
		},
		{
			label : 'Bank Details',
			key   : 'bank_details',
			span  : 1.4,
			func  : 'renderBankDetails',
		},
		{
			label : 'Urgency',
			key   : 'urgencyTag',
			span  : 0.8,
			func  : 'renderUrgencyTag',
		},
		{
			label : 'Action',
			key   : 'action',
			span  : 0.4,
			func  : 'renderAction',
		},
	],
};
