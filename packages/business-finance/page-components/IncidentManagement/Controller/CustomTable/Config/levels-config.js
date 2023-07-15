export const LEVELS_CONFIG = {
	fields: [
		{
			label : 'Levels',
			key   : 'levels',
			span  : 3,
		},
		{
			label : 'User',
			key   : 'user',
			func  : 'renderIncidentNumber',
			span  : 4,
		},
		{
			label : 'Criteria',
			key   : 'criteria',
			func  : 'renderSIDnumber',
			span  : 4,
		},
		{
			label : '',
			key   : 'edit',
			func  : 'renderAmountWithCurrency',
			span  : 1,
		},
	],
};
