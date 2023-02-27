const controls = {

	assign_user: {
		name        : 'assign_user',
		type        : 'select',
		placeholder : 'Enter name to assign',
		rules       : { required: 'This is required' },
	},
	assign_condition: {
		name        : 'assign_condition',
		type        : 'select',
		placeholder : 'Select Condition',
		options     : [
			{
				label : 'Shipment ID',
				value : 'shipment',
			},
			{
				label : 'Invoice',
				value : 'invoice',
			},
		],
		rules: { required: 'This is required' },
	},
	condition_value: {
		name  : 'condition_value',
		type  : 'input',
		rules : {
			required : true,
			validate : (val) => (val?.trim()?.length <= 0 ? 'This cannot be Empty' : true),
		},
	},
	allow_user: {
		name    : 'allow_user',
		type    : 'radio group',
		options : [
			{
				label : 'Observe',
				value : 'observe',
			},
			{
				label : 'Observe and chat',
				value : 'observe_and_chat',
			},

		],

	},
};
export default controls;
