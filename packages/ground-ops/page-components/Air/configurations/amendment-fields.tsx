const AmendmentFields = {
	fields: [
		{
			key   : 'serialId',
			label : 'SID',
			span  : 3,
			func  : 'handleSerialId',
		},
		{
			key   : 'blCategory',
			label : 'AWB Category',
			span  : 3,
			func  : 'handleBlCategory',
		},
		{
			key   : 'awbNumber',
			label : 'AWB',
			span  : 3,
		},
		{
			key   : 'status',
			label : 'Status',
			span  : 3,
			func  : 'handleStatus',
		},
	],
};

export default AmendmentFields;
