const PURCHASE_VIEW_CONFIG = {
	showHeader   : true,
	headerStyles : {
		marginBottom : '16px',
		borderRadius : '8px',
		background   : '#333',
		marginTop    : '20px',
		paddingLeft  : '14px',
		minWidth     : '1800px',
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
			span : 1.4,
		},
		{
			label : 'Supplier Name',
			key   : 'organizationName',
			func  : 'renderCustomer',
			span  : 2,
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
			span    : 1.8,
			sorting : { name: 'billDateSortType' },
		},
		{
			label   : 'Payment Due Date',
			key     : 'dueDate',
			func    : 'renderFormate',
			span    : 1.8,
			sorting : { name: 'dueDateSortType' },
		},
		{
			label : 'Status',
			key   : 'status',
			span  : 1,
			func  : 'renderStatus',
		},
		{
			label : 'Remarks ',
			key   : 'remarks',
			span  : 1,
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
			span : 1.4,
			func : 'renderViewMore',
		},
		// {
		//     key:'ribbon',
		//     span:0.01,
		//     func:'renderRibbon',
		// }
	],
};

export default PURCHASE_VIEW_CONFIG;
