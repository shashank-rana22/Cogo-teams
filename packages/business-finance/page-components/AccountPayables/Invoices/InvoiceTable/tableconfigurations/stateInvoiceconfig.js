export const STATE_INVOICE_CONFIG = {
	showHeader   : true,
	headerStyles : {
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
			label : 'Job Number',
			key   : 'jobNumber',
			span  : 4,
		},
		{
			label : 'Bill Number',
			key   : 'billNumber',
			span  : 4,
		},
		{
			label : 'State',
			key   : 'state',
			span  : 4,
		},
	],
};
