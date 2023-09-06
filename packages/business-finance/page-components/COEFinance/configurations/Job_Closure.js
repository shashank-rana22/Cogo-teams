const Auto_Job_Closure_Config = {
	showHeader  : true,
	headerClass : 'border',

	fields: [
		{
			label : 'Entity',
			key   : 'entity',
			span  : 1.3,
		},
		{
			label : 'Service',
			key   : 'serviceType',
			span  : 1.5,
		},
		{
			label : 'Trade Type',
			key   : 'tradeType',
			span  : 1.5,
		},
		{
			label : 'Selection Criteria',
			key   : 'selectionCriteriaOp',
			span  : 2.1,
		},
		{
			label : 'Level1',
			key   : 'oprClosureDays',
			span  : 1.1,
		},
		{
			label : 'Selection Criteria',
			key   : 'selectionCriteriaFin',
			span  : 2.1,
		},
		{
			label : 'Level2',
			key   : 'finClosureDays',
			span  : 1.1,
		},
		{
			label : '',
			key   : 'editDelete',
			span  : 1.3,
		},
	],
};

export default Auto_Job_Closure_Config;
