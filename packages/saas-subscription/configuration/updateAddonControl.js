const updateAddonControl = 	[{
	name     : 'updateAddon',
	type     : 'fieldArray',
	controls : [
		{
			name        : 'product_id',
			type        : 'asyncSelect',
			asyncKey    : 'addon_list',
			placeholder : 'Enter Name',
			size        : 'sm',
			width       : '40%',
			rules       : {
				required: true,
			},
		},
		{
			name        : 'count',
			type        : 'number',
			placeholder : 'Enter count',
			size        : 'sm',
			width       : '25%',
			rules       : {
				required : true,
				min      : {
					value   : -1,
					message : 'Should be greater than or equal to -1',
				},
			},
		},
		{
			name        : 'discount',
			type        : 'number',
			placeholder : 'Enter Discount',
			size        : 'sm',
			width       : '25%',
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

const addonDefaultValue = {
	product_id : '',
	count      : 0,
	discount   : 0,
};
export default updateAddonControl;
export { addonDefaultValue };
