const AmendmentFields = {
	fields: [
		{
			key   : 'serialId',
			label : 'SID',
			span  : 0.8,
			func  : 'handleSerialId',
		},
		{
			key   : 'blCategory',
			label : 'AWB Category',
			span  : 1,
			func  : 'handleBlCategory',
		},
		{
			key   : 'awbNumber',
			label : 'AWB',
			span  : 1.2,
		},
		{
			key   : 'status',
			label : 'Status',
			span  : 1,
			func  : 'handleStatus',
		},
	],
};

export default AmendmentFields;
