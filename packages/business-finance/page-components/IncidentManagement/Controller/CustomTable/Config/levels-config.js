export const LEVELS_CONFIG = {
	fields: [
		{
			label : 'Levels',
			key   : 'levels',
			span  : 1,
		},
		{
			label : 'User',
			key   : 'user',
			func  : 'renderIncidentNumber',
			span  : 3,
		},
		{
			label : 'Criteria',
			key   : 'criteria',
			func  : 'renderSIDnumber',
			span  : 3,
		},
		{
			label : 'Parameter',
			key   : 'parameter',
			func  : 'renderModifiedName',
			span  : 3,
		},
		{
			label : '',
			key   : 'edit',
			func  : 'renderAmountWithCurrency',
			span  : 2,
		},
	],
};
