export const OVERSEAS_FINAL_CONFIRMATION_LIST = {
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
			label  : 'Invoice Number',
			topKey : {
				key         : 'invoiceNumber',
				type        : 'href',
				redirectKey : 'documentUrl',
			},
			span : 4.5,
			func : 'renderFieldPair',
		},
		{
			key         : 'sid',
			type        : 'href',
			redirectKey : 'shipmentId',
			label       : 'SID',
			span        : 3,
		},

		{
			label : 'Tagged Document',
			func  : 'renderTaggedDocument',
			span  : 3.5,
		},
		{
			key  : 'delete',
			span : 0.3,
			func : 'renderTrashInvoice',
		},
	],
};
