const PURCHASE_VIEW_CONFIG = {
	showHeader   : true,
	headerStyles : {
		marginBottom : '16px',
		borderRadius : '8px',
		background   : '#333',
		marginTop    : '20px',
		paddingLeft  : '14px',
	},
	bodyStyles: {
		color      : ' #333333',
		fontWeight : '400',
		fontSize   : '12px',
		lineHeight : '14px',
		fontStyle  : 'normal',
	},
	fields: [
		{
			label  : 'Invoice No.',
			topKey : {
				key  : 'billNumber',
				type : 'href',
			},
			bottomKey: {
				key  : 'billType',
				type : 'tags',
			},
			func : 'renderFieldPair',
			span : 1.8,
		},
		{
			label  : 'SID',
			topKey : {
				key  : 'jobNumber',
				type : 'href',
			},
			bottomKey: {
				key: 'serviceType',
			},
			func : 'renderFieldPair',
			span : 1,
		},
		{
			label : 'Supplier Name',
			key   : 'organizationName',
			func  : 'renderCustomer',
			span  : 1.5,
		},
		{
			label : 'Invoice Amount',
			key   : 'grandTotal',
			span  : 1.8,
			func  : 'renderFormate',
		},
		{
			label   : 'Last Modified Date',
			span    : 2,
			key     : 'createdDate',
			func    : 'renderFormate',
			sorting : { name: 'modifiedDateSortType' },
		},
		{
			label   : 'Invoice Date',
			key     : 'billDate',
			func    : 'renderFormate',
			span    : 1.5,
			sorting : { name: 'billDateSortType' },
		},
		{
			label   : 'Payment Due Date',
			key     : 'dueDate',
			func    : 'renderFormate',
			span    : 2.1,
			sorting : { name: 'dueDateSortType' },
		},
		{
			label : 'Status',
			key   : 'status',
			span  : 0.9,
			func  : 'renderStatus',
		},
		{
			label : 'Remarks ',
			key   : 'remarks',
			span  : 0.9,
			func  : 'renderRemarks',
		},
		{
			label : 'Urgency',
			span  : 1,
			key   : 'urgencyTag',
			func  : 'renderUrgencyTag',
		},
		{
			key  : 'viewMore',
			span : 1.8,
			func : 'renderViewMore',
		},
	],
};

export default PURCHASE_VIEW_CONFIG;
