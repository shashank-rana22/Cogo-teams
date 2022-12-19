export const PAYRUN_PAID_CONFIG = {
	showHeader         : true,
	showHeaderCheckbox : true,
	headerStyles       : { marginBottom: '16px', borderRadius: '8px' },
	fields             : [
		{
			label : 'Invoice Number',
			key   : 'billNumber',
			func  : 'renderClickableTooltip',
			span  : 1.3,
		},
		{
			label : 'Job Type',
			key   : 'jobType',
			span  : 1.3,
		},
		{
			key     : 'jobNumber',
			label   : 'SID',
			span    : 1,
			sorting : { name: 'sid' },
		},
		{
			label : 'Supplier Name',
			key   : 'organizationName',
			func  : 'renderTooltip',
			span  : 1.5,
		},
		{
			key   : 'grandTotal',
			label : 'Invoice Amount',
			func  : 'renderAmount',
			span  : 1.5,
		},
		{
			key   : 'totalPaidTds',
			label : 'TDS Amount',
			func  : 'renderAmount',
			span  : 1.5,
		},
		{
			key   : 'totalPaidAmount',
			label : 'Paid Amount',
			func  : 'renderAmount',
			span  : 1.7,
		},
		{
			key     : 'transactionId',
			label   : 'UTR/BRN ',
			sorting : { name: 'payment' },
			span    : 1.4,
			func    : 'renderTooltip',
		},
		{
			key   : 'status',
			label : 'Status ',
			span  : 1.2,
			func  : 'renderStatus',
		},
		{
			func : 'renderDropDownData',
			span : 0.5,
		},
	],
};
