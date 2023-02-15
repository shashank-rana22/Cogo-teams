const controls = {
	assign_to: {
		name    : 'assign_to',
		type    : 'radio_group',
		options : [
			{
				label : 'Assign user',
				value : 'user',
			},
			{
				label : 'Assign based on condition',
				value : 'condition',
			},
		],
	},
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
};
export default controls;
