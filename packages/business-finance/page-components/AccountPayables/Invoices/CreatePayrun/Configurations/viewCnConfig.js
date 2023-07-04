export const CN_CONFIG = {
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
			label  : 'Credit Note No.',
			key    : 'creditNoteNumber',
			topKey : {
				type        : 'href',
				key         : 'creditNoteNumber',
				redirectKey : 'pdfUrl',
			},
			func : 'renderFieldPair',
			span : 2,
		},
		{
			label  : 'SID',
			key    : 'sid',
			func   : 'renderFieldPair',
			span   : 1.6,
			topKey : {
				key: 'jobNumber',
			},
			lowerKey: {
				key  : 'serviceType',
				type : 'serviceType',
			},
		},
		{
			label : 'Total Amount',
			key   : 'totalAmount',
			func  : 'renderAmount',
			span  : 1.2,
		},
		{
			label : 'Tds',
			key   : 'tds',
			func  : 'renderAmount',
			span  : 1.2,
		},
		{
			label : 'Utilized Tds',
			key   : 'utilizedTds',
			func  : 'renderAmount',
			span  : 1.2,
		},
		{
			label : 'Utilized Amount',
			key   : 'utilizedAmount',
			func  : 'renderAmount',
			span  : 1.4,
		},
		{
			label : 'Balance Amount',
			key   : 'balanceAmount',
			span  : 1.4,
			func  : 'renderAmount',
		},
		{
			label  : 'Status',
			key    : 'status',
			span   : 1,
			func   : 'renderFieldPair',
			topKey : {
				key  : 'status',
				type : 'tag',
			},
		},
		{
			label : 'Issue Date',
			key   : 'issueDate',
			func  : 'renderDate',
			span  : 1,
		},
	],
};
