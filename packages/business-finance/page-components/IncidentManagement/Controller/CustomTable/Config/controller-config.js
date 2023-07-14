export const CONTROLLER_CONFIG = {
	headerClass : 'border',
	fields      : [
		{
			label : 'Incident Type',
			key   : 'incidentType',
			span  : 3,
		},
		{
			label : 'Entity',
			key   : 'entity',
			func  : 'renderIncidentNumber',
			span  : 2,
		},
		{
			label : 'Levels',
			key   : 'levels',
			func  : 'renderSIDnumber',
			span  : 2,
		},
		{
			label : 'Users',
			key   : 'users',
			func  : 'renderModifiedName',
			span  : 4.6,
		},
		{
			label : '',
			key   : 'edit',
			func  : 'renderAmountWithCurrency',
			span  : 0.4,
		},
	],
};
