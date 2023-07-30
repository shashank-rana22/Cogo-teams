export const ADVANCE_PAYMENT_PAYRUN_PAID_CONFIG = {
	showHeader   : true,
	pageLimit    : 20,
	headerStyles : {
		borderRadius : '8px',
		background   : 'none',
		color        : 'black',
		marginLeft   : '8px',
		fontWeight   : 600,
	},
	bodyStyles: {
		color      : ' #333333',
		fontWeight : '400',
		fontSize   : '12px',
		borderTop  : '1.8px solid #F68B21',
	},
	fields: [
		{
			label : 'Adv. Doc. No.',
			key   : 'objectNumber',
			span  : 1.3,
		},

		{
			label : 'Incident ID',
			key   : 'incidentRefNo',
			span  : 1.3,
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
			label : 'Job Type',
			key   : 'jobType',
			span  : 1.3,
		},
		{
			label : 'Organization',
			key   : 'organizationName',
			func  : 'renderTooltip',
			span  : 2.4,
		},
		{
			key   : 'grandTotal',
			label : 'Advance Amount',
			func  : 'renderAmount',
			span  : 1.4,
		},
		{
			key         : 'totalPaidAmount',
			func        : 'renderAmount',
			currencyKey : 'currency',
			label       : 'Paid Amount',
			span        : 1,
		},
		{
			key   : 'paymentDate',
			label : 'Payment Date',
			span  : 1,
		},
		{
			func : 'renderDropDownData',
			span : 0.7,
		},
	],
};
