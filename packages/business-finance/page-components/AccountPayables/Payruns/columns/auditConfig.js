export const AUDIT_CONFIG = {
	showHeader   : true,
	headerStyles : {
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
			label     : 'Name',
			key       : 'organizationName',
			func      : 'renderTooltip',
			maxLength : 36,
			span      : 1.8,
		},
		{
			label  : 'Invoice Number',
			topKey : {
				key         : 'billNumber',
				type        : 'href',
				redirectKey : 'documentUrl',
			},
			func : 'renderFieldPair',
			span : 1.2,
		},
		{
			label  : 'SID',
			topKey : {
				key         : 'sid',
				type        : 'href',
				redirectKey : 'shipmentId',
			},
			lowerKey: {
				key  : 'serviceType',
				type : 'serviceType',
			},
			func : 'renderFieldPair',
			span : 1,
		},
		{
			label : 'Invoice Amount',
			key   : 'invoiceAmount',
			type  : 'text',
			span  : 1.5,
			func  : 'renderAmount',
		},

		{
			label : 'Payable',
			key   : 'payableAmount',
			func  : 'renderAmount',
			span  : 1,
		},
		{
			key   : 'bankDetails',
			type  : 'text',
			label : 'Bank Account Details',
			func  : 'renderBankPair',
			span  : 2,
		},
		{
			label : 'Audit',
			span  : 2,
			func  : 'renderApprove',
		},
		{
			key   : 'remarks',
			label : 'Remarks',
			func  : 'renderRemarks',
			span  : 1.5,
		},
		{
			key  : 'invoiceDetails',
			func : 'renderInvoiceDetails',
			span : 0.5,
		},
	],
};
