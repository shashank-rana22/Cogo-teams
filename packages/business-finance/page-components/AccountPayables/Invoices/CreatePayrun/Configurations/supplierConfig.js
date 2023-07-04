export const SUPPLIER_CONFIG = {
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
			label     : 'Supplier Name',
			key       : 'organizationName',
			func      : 'renderToolTip',
			maxLength : 36,
			span      : 2,
		},
		{
			label : 'Invoices',
			key   : 'invoiceAmount',
			func  : 'renderAmount',
			span  : 1,
		},
		{
			label : 'No. of Invoices Selected',
			key   : 'invoiceCount',
			span  : 1.8,
		},
		{
			label : 'Credit Note Amount',
			key   : 'creditAmount',
			func  : 'renderAmount',
			span  : 2,
		},
		{
			label : 'No. of Credit Notes',
			key   : 'creditCount',
			span  : 2,
		},
		{
			label : 'On Account Payment',
			key   : 'onAccountPaymentValue',
			span  : 1.8,
			func  : 'renderAmount',
		},
		{
			label : '',
			key   : 'action',
			span  : 1.2,
			func  : 'renderCn',
		},
	],
};
