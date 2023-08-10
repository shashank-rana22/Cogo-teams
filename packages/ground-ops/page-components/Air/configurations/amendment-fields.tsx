const AmendmentFields = {
	fields: [
		{
			key   : 'serialId',
			label : 'SID',
			span  : 2.4,
			func  : 'handleSerialId',
		},
		{
			key   : 'blCategory',
			label : 'AWB Category',
			span  : 2.4,
			func  : 'handleBlCategory',
		},
		{
			key   : 'stakeholder',
			label : 'Stakeholder',
			span  : 2.4,
			func  : 'handleStakeholder',
		},
		{
			key   : 'awbNumber',
			label : 'AWB',
			span  : 2.4,
		},
		{
			key   : 'status',
			label : 'Status',
			span  : 2.4,
			func  : 'handleStatus',
		},
	],
};

export default AmendmentFields;
