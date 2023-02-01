export const LINE_ITEMS = {
	showHeader   : true,
	headerStyles : {
		marginBottom : '16px',
		borderRadius : '8px',
		background   : '#333',
		marginTop    : '20px',
		paddingLeft  : '14px',
	},
	bodyStyles : { color: ' #333333', fontWeight: '400', fontSize: '12px', lineHeight: '14px' },
	itemStyles : { marginTop: '8px' },
	fields     : [
		{
			key  : 'Icon',
			span : 1.2,
			func : 'renderIcon',
		},
		{
			label : 'Product',
			key   : 'name',
			span  : 3,
		},
		{
			label : 'Cur.',
			key   : 'currency',
			span  : 1,
		},
		{
			label : 'Rate',
			key   : 'price',
			span  : 1,

		},
		{
			label : 'Qty',
			key   : 'quantity',
			span  : 1,
		},
		{
			label : 'Ex. Rate',
			key   : 'exchangeRate',
			span  : 1.5,
		},
		{
			label : 'Tax',
			key   : 'taxAmount',
			span  : 1.2,
		},
		{
			label : 'Total Cost',
			key   : 'total',
			span  : 1.9,
		},
		{
			key  : 'dots',
			func : 'renderReject',
			span : 0.8,
		},
	],
};

export const LINE_ITEMS_CHECK = {
	showHeader   : true,
	headerStyles : { marginBottom: '16px', borderRadius: '8px', background: '#333', marginTop: '20px' },
	itemStyles   : { border: '1px solid  #e0e0e0', borderTop: 'none', borderRadius: '2px' },
	bodyStyles   : { color: ' #333333', fontWeight: '400', fontSize: '12px', lineHeight: '14px' },
	fields       : [
		{
			label : 'Product',
			key   : 'name',
			span  : 3,
		},
		{
			label : 'Cur.',
			key   : 'currency',
			span  : 1,
		},
		{
			label : 'Rate',
			key   : 'price',
			span  : 1,

		},
		{
			label : 'Qty',
			key   : 'quantity',
			span  : 1,
		},
		{
			label : 'Ex. Rate',
			key   : 'exchangeRate',
			span  : 1.5,
		},
		{
			label : 'Tax',
			key   : 'taxAmount',
			span  : 1.2,
		},
		{
			label : 'Total Cost',
			key   : 'total',
			span  : 1.9,
		},
	],
};
