const getComponentMapping = ({ data = {} }) => [
	{
		label    : 'Basic Details',
		key      : 'basic',
		subItems : [
			{
				subLabel : 'Tax Number',
				subKey   : 'tax',
				value    : data?.sezRequest?.taxNumber || '...',
			},
			{
				subLabel : 'Trade Party Type',
				subKey   : 'buy_price',
				value    : data?.organization?.tradePartyType || '...',
			},
			{
				subLabel : 'Business Name',
				subKey   : 'entity_code',
				value    : data?.organization?.businessName || '...',
			},
		],
	},
	{
		label    : 'Other Details',
		key      : 'other',
		subItems : [
			{
				subLabel : 'Pin Code',
				subKey   : 'pin',
				value    : data?.sezRequest?.pincode || '...',
			},
			{
				subLabel : 'Address',
				subKey   : 'address',
				value    : data?.sezRequest?.address || '...',
			},
			{
				subLabel : 'Remarks',
				subKey   : 'remarks',
				value    : data?.sezRequest?.remarks || '...',
			},
		],
	},
];

export default getComponentMapping;
