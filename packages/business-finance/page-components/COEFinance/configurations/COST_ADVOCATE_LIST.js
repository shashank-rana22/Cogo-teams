const LABEL_MAPPING = {
	coe_rejected : 'Rejection Date',
	coe_on_hold  : 'On Hold Date',
};

const constAdvocateConfig = (subActiveTabReject) => ({
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
		background : '#fff',
	},
	itemStyles: {
		borderBottom: '1px solid #d7d7d7',
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
			label   : `${LABEL_MAPPING[subActiveTabReject] ? LABEL_MAPPING[subActiveTabReject] : 'Last Modified Date'}`,
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
			label : 'Urgency',
			span  : 1,
			key   : 'urgencyTag',
			func  : 'renderUrgencyTag',
		},
		{
			label : 'Ticket',
			key   : 'status',
			span  : 0.7,
			func  : 'renderTicket',
		},
		{
			label : 'Approval Status',
			key   : 'status',
			span  : 1.5,
			func  : 'renderApprovalStatus',
		},
		{
			label : '',
			key   : 'remarks',
			span  : 0.3,
			func  : 'renderRemarks',
		},
		{
			key  : 'action',
			span : 0.4,
			func : 'renderAction',
		},
	],
});

export default constAdvocateConfig;
