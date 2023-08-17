const HEADING_MAP = {
	operational: 'Operational',
};

export const customersConfig = ({ activeShipmentCard }) => ({
	headerClass : 'border',
	fields      : [
		{
			label : 'SID',
			key   : 'sid',
			span  : 2,
		},
		{
			label : 'Customer Name',
			key   : 'customerName',
			span  : 3.5,
		},
		{
			label : 'Estimated Profit',
			key   : 'estimatedProfit',
			span  : 2,
		},
		{
			label : `${HEADING_MAP?.[activeShipmentCard] || 'Actual'} Profit`,
			key   : 'actualProfit',
			span  : 2,
		},
		{
			label : 'Deviation',
			key   : 'deviation',
			span  : 2,
		},
		{
			label : '',
			key   : 'action',
			span  : 0.5,
		},
	],
});
