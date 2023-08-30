export const AUDIT_CONFIG = {
	showHeader   : true,
	headerStyles : {
		borderRadius : '8px',
		background   : 'none',
		color        : 'var(--color-secondary-greyscale-2)',
		fontSize     : '12px',
		fontWeight   : '500',
	},
	bodyStyles: {
		color     : ' #333333',
		fontSize  : 'var(--font-size-md)',
		borderTop : '1.8px solid var(--color-accent-orange-2)',
	},
	itemStyles: {
		padding      : '8px',
		borderBottom : '1px solid var(--color-tertiary-beige-4)',
	},
	fields: [
		{
			label     : 'Name',
			key       : 'organizationName',
			func      : 'renderTooltip',
			maxLength : 70,
			span      : 1.8,
		},
		{
			label  : 'Invoice Number',
			topKey : {
				key         : 'billNumber',
				type        : 'href',
				redirectKey : 'documentUrl',
			},
			lowerKey: {
				key  : 'typeOfInvoice',
				type : 'tag',
			},
			func : 'renderFieldPair',
			span : 1.2,
		},
		{
			label  : 'SID',
			topKey : {
				key: 'sid',
			},
			lowerKey: {
				key  : 'serviceType',
				type : 'serviceType',
			},
			func : 'renderFieldPair',
			span : 1,
		},
		{
			label  : 'Invoice Amount',
			topKey : {
				key         : 'invoiceAmount',
				type        : 'amount',
				currencyKey : 'currency',
			},
			func : 'renderFieldPair',
			span : 1.2,
		},
		{
			label  : 'Payable',
			topKey : {
				key         : 'payableAmount',
				type        : 'amount',
				currencyKey : 'currency',
			},
			func : 'renderFieldPair',
			span : 1.2,
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
			span  : 1.6,
			func  : 'renderAcceptAudit',
		},
		{
			key   : 'remarks',
			label : 'Remarks',
			func  : 'renderAuditRemarks',
			span  : 1.4,
		},
		{
			key  : 'invoiceDetails',
			func : 'renderInvoiceData',
			span : 0.6,
		},
	],
};
