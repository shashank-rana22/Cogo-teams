const controls = {

	assign_user: {
		name        : 'assign_user',
		type        : 'input',
		placeholder : 'Enter name to assign',
	},
	assign_condition: {
		name        : 'assign_condition',
		type        : 'select',
		placeholder : 'Select Condition',
		options     : [
			{
				label : 'Shipment ID',
				value : 'shipment_id',
			},
			{
				label : 'Invoice',
				value : 'invoice',
			},
			{
				label : 'Onboarding KYC',
				value : 'onboarding_kyc',
			},
		],
	},
	condition_value: {
		name : 'condition_value',
		type : 'input',
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
