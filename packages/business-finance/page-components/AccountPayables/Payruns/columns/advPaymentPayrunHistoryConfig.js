export const advPaymentPayrunHistoryConfig = {
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
		{
			key   : 'organizationName',
			label : 'Name',
			span  : 2.3,
			func  : 'renderTooltip',
		},
		{
			key   : 'advanceDocumentNo',
			label : 'Adv. Doc. No',
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
			key   : 'incidentRefNo',
			label : 'Incident Id',
			span  : 1.2,
		},
		{
			label : 'Payable Amount',
			key   : 'payableAmount',
			func  : 'renderAmount',
			span  : 1.5,
		},
		{
			key   : 'bankDetail',
			label : 'Bank Details',
			func  : 'renderBankDetails',
			span  : 2,
		},
		{
			key     : 'dueDate',
			type    : 'text',
			label   : 'Due Date',
			span    : 1,
			sorting : { name: 'dueDateSortType' },
		},
		{
			key     : 'createdAt',
			type    : 'text',
			sorting : { name: 'createdAtSortType' },
			label   : 'Created At',
			span    : 1,
		},

	],
};
