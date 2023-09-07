const AUTO_JOB_CLOSURE_CONFIG = {
	showHeader : true,
	fields     : [
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
			label : 'Level 1',
			key   : 'oprClosureDays',
			span  : 1.1,
		},
		{
			label : 'Selection Criteria',
			key   : 'selectionCriteriaFin',
			span  : 2.1,
		},
		{
			label : 'Level 2',
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

export default AUTO_JOB_CLOSURE_CONFIG;
