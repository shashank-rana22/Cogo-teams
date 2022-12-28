export const LINE_ITEMS = {
	showHeader         : true,
	headerStyles       : { marginBottom: '16px', borderRadius: '8px', background: '#333',marginTop:'20px' },
    bodyStyles          :{color:' #333333',fontWeight: '400',fontSize: '12px',lineHeight: '14px'},
	fields             : [
        {
			key  : 'Icon',
			span : 1.2,
			func : 'renderIcon'
		},
        {
			label: 'Product',
            key:'name',
			span: 2,
		},
		{
			label : 'Cur.',
			key   : 'currency',
			span  : 1,
		},
		{
            label   : 'Rate',
            key     : 'price',
			span    : 1,
			
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
            key   : 'dots',
			func : 'renderReject',
			span  : 0.8,
		},
	],
};
