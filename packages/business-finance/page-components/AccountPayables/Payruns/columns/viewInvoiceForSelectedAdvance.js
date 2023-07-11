export const ADVANCE_PAYMENT_VIEW_INVOICE = {
	showHeader   : true,
	pageLimit    : 20,
	headerStyles : {
		borderRadius : '8px',
		background   : 'none',
		color        : 'black',
		marginLeft   : '8px',
	},
	bodyStyles: {
		color      : ' #333333',
		fontWeight : '400',
		fontSize   : '12px',
		borderTop  : '1.8px solid #F68B21',
	},
	fields: [
		// {
		// 	key  : 'checkbox',
		// 	func : 'renderCheckbox',
		// 	span : 0.5,
		// },
		{
			key   : 'organizationName',
			label : 'Organization',
			span  : 2.2,
			// func  : 'renderAdvanceName',
		},
		{
			key   : 'advanceDocumentNo',
			label : 'Adv. Doc. No.',
			span  : 1.5,
		},
		{
			key   : 'incidentRefNo',
			label : 'Incident No.',
			span  : 1.5,
		},
		{
			label  : 'SID',
			topKey : {
				key: 'jobNumber',
			},
			lowerKey: {
				key  : 'serviceType',
				type : 'serviceType',
			},
			func : 'renderFieldPair',
			span : 1,
		},
		{
			label  : 'Payable Amount',
			span   : 1.7,
			topKey : {
				key         : 'payableAmount',
				type        : 'amount',
				currencyKey : 'currency',
			},
			func: 'renderFieldPair',
		},
		{
			key   : 'dueDate',
			// type  : 'text',
			label : 'Payment Due Date',
			span  : 1.5,
		},
		{
			key  : 'delete',
			span : 0.5,
			// func : 'renderTrashInvoice',
		},
	],
};
