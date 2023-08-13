const HEADING_MAP = {
	operational: 'Operational',
};

export const customersConfig = ({ activeShipmentCard }) => ({
	headerClass : 'border',
	fields      : [
		{
			label : 'SID',
			key   : 'sid',
			span  : 1.5,
		},
		{
			label : 'Customer Name',
			key   : 'customerName',
			span  : 3,
		},
		{
			label      : 'Estimated Profit',
			key        : 'estimatedProfit',
			sortingKey : 'estimatedProfit',
			span       : 2.5,
		},
		{
			label      : `${HEADING_MAP?.[activeShipmentCard] || 'Actual'} Profit`,
			key        : 'actualProfit',
			sortingKey : `${(HEADING_MAP?.[activeShipmentCard] || 'Actual').toLowerCase()}Profit`,
			span       : 2.5,
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
