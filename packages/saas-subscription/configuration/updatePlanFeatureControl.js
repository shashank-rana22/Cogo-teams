const updatePlanFeatureControl = 	[{
	name     : 'updatePlanFeature',
	type     : 'fieldArray',
	controls : [
		{
			name        : 'value',
			type        : 'text',
			placeholder : 'Enter value',
			size        : 'sm',
			width       : '25%',
			rules       : {
				required: true,
			},
		},
		{
			name        : 'display_name',
			type        : 'text',
			placeholder : 'Enter Name',
			size        : 'sm',
			width       : '45%',
			rules       : {
				required: true,
			},
		},
		{
			name        : 'sequence',
			type        : 'number',
			placeholder : 'Enter Sequence',
			size        : 'sm',
			width       : '20%',
			rules       : {
				required : true,
				min      : {
					value   : 0,
					message : 'Should be greater than or equal to 0',
				},
			},
		},
	],
}];

const planFeatureDefaultValue = {
	value        : '',
	display_name : '',
	sequence     : '',
};
export default updatePlanFeatureControl;
export { planFeatureDefaultValue };
