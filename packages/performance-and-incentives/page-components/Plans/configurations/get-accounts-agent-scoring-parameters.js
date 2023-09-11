// eslint-disable-next-line max-lines-per-function
const getAccountsAgentScoringParameters = () => ({
	default: {
		// agent_scoring_parameter: [{
		// 	name              : 'new_activation',
		// 	parameter_type    : 'value',
		// 	unit_trigger_pair : [{
		// 		parameter_unit             : 'per cash account',
		// 		parameter_eligibility_unit : nil,
		// 		provisional_trigger        : '1st SID booked',
		// 		realised_trigger           : 'IRN generation of all invoices of 1st SID',
		// 	},
		// 	{
		// 		parameter_unit             : 'per credit account',
		// 		parameter_eligibility_unit : nil,
		// 		provisional_trigger        : '1st SID booked',
		// 		realised_trigger           : 'Invoice Knockoff of all invoices of 1st SID',
		// 	},
		// 	],
		// },
		// {
		// 	name              : 'true_activation',
		// 	parameter_type    : 'value',
		// 	unit_trigger_pair : [{
		// 		parameter_unit             : 'per cash account',
		// 		parameter_eligibility_unit : nil,
		// 		provisional_trigger        : '3rd SID booked',
		// 		realised_trigger           : 'IRN generation of all invoices of 1st SID',
		// 	},
		// 	{
		// 		parameter_unit             : 'per credit account',
		// 		parameter_eligibility_unit : nil,
		// 		provisional_trigger        : '3rd SID booked',
		// 		realised_trigger           : 'Invoice Knockoff of all invoices of 1st SID',
		// 	},
		// 	],
		// },
		// {
		// 	name              : 're_activation',
		// 	parameter_type    : 'value',
		// 	unit_trigger_pair : [{
		// 		parameter_unit             : 'per cash account',
		// 		parameter_eligibility_unit : nil,
		// 		provisional_trigger        : '1st SID booked',
		// 		realised_trigger           : 'IRN generation of all invoices of 1st SID',
		// 	},
		// 	{
		// 		parameter_unit             : 'per credit account',
		// 		parameter_eligibility_unit : nil,
		// 		provisional_trigger        : '1st SID booked',
		// 		realised_trigger           : 'Invoice Knockoff of all invoices of 1st SID',
		// 	},
		// 	],
		// },
		// {
		// 	name              : 'retention',
		// 	parameter_type    : 'value',
		// 	unit_trigger_pair : [{
		// 		parameter_unit             : 'per cash account',
		// 		parameter_eligibility_unit : nil,
		// 		provisional_trigger        : '1st SID booked',
		// 		realised_trigger           : 'IRN generation of all invoices of 1st SID',
		// 	},
		// 	{
		// 		parameter_unit             : 'per credit account',
		// 		parameter_eligibility_unit : nil,
		// 		provisional_trigger        : '1st SID booked',
		// 		realised_trigger           : 'Invoice Knockoff of all invoices of 1st SID',
		// 	},
		// 	],
		// },
		// {
		// 	name              : 'royalty',
		// 	parameter_type    : 'value',
		// 	unit_trigger_pair : [{
		// 		parameter_unit             : 'per cash account',
		// 		parameter_eligibility_unit : nil,
		// 		provisional_trigger        : 'Every 5th booking',
		// 		realised_trigger           : 'IRN generation of all invoices of 1st SID',
		// 	},
		// 	{
		// 		parameter_unit             : 'per credit account',
		// 		parameter_eligibility_unit : nil,
		// 		provisional_trigger        : 'Every 5th booking',
		// 		realised_trigger           : 'Invoice Knockoff of all invoices of 1st SID',
		// 	},
		// 	],
		// },
		// {
		// 	name              : 'kyc_verification',
		// 	parameter_type    : 'value',
		// 	unit_trigger_pair : [{
		// 		parameter_unit             : 'per cash account',
		// 		parameter_eligibility_unit : nil,
		// 		provisional_trigger        : 'kyc_verification',
		// 		realised_trigger           : 'kyc_verification',
		// 	},
		// 	{
		// 		parameter_unit             : 'per credit account',
		// 		parameter_eligibility_unit : nil,
		// 		provisional_trigger        : 'kyc_verification',
		// 		realised_trigger           : 'kyc_verification',
		// 	},
		// 	],
		// },
		// ],

		agent_scoring_parameter: [{
			label : 'new_activation',
			value : 'New Activation',
		}, {
			label : 'true_activation',
			value : 'True Activation',
		}, {
			label : 'Re-activation',
			value : 're_activation',
		}, {
			label : 'retention',
			value : 'Retention',
		},
		{
			label : 'royalty',
			value : 'Royalty',
		}, {
			label : 'KYC Verification',
			value : 'kyc_verification',
		}],
	},
	enterprise: {
		agent_scoring_parameter: [{
			name              : 'new_activation',
			parameter_type    : 'value',
			unit_trigger_pair : [{
				parameter_unit      : 'per cash account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '1st SID booked',
				realised_trigger    : 'IRN generation of all invoices of 1st SID',
			},
			{
				parameter_unit      : 'per credit account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '1st SID booked',
				realised_trigger    : 'Invoice Knockoff of all invoices of 1st SID',
			},
			],
		},
		{
			name              : 'true_activation',
			parameter_type    : 'value',
			unit_trigger_pair : [{
				parameter_unit      : 'per cash account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '3rd SID booked',
				realised_trigger    : 'IRN generation of all invoices of 1st SID',
			},
			{
				parameter_unit      : 'per credit account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '3rd SID booked',
				realised_trigger    : 'Invoice Knockoff of all invoices of 1st SID',
			},
			],
		},
		{
			name              : 're_activation',
			parameter_type    : 'value',
			unit_trigger_pair : [{
				parameter_unit      : 'per cash account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '1st SID booked',
				realised_trigger    : 'IRN generation of all invoices of 1st SID',
			},
			{
				parameter_unit      : 'per credit account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '1st SID booked',
				realised_trigger    : 'Invoice Knockoff of all invoices of 1st SID',
			},
			],
		},
		{
			name              : 'retention',
			parameter_type    : 'value',
			unit_trigger_pair : [{
				parameter_unit      : 'per cash account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '1st SID booked',
				realised_trigger    : 'IRN generation of all invoices of 1st SID',
			},
			{
				parameter_unit      : 'per credit account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '1st SID booked',
				realised_trigger    : 'Invoice Knockoff of all invoices of 1st SID',
			},
			],
		},
		{
			name              : 'royalty',
			parameter_type    : 'value',
			unit_trigger_pair : [{
				parameter_unit      : 'per cash account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : 'Every 5th booking',
				realised_trigger    : 'IRN generation of all invoices of 1st SID',
			},
			{
				parameter_unit      : 'per credit account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : 'Every 5th booking',
				realised_trigger    : 'Invoice Knockoff of all invoices of 1st SID',
			},
			],
		},
		{
			name              : 'kyc_verification',
			parameter_type    : 'value',
			unit_trigger_pair : [{
				parameter_unit      : 'per cash account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : 'kyc_verification',
				realised_trigger    : 'kyc_verification',
			},
			{
				parameter_unit      : 'per credit account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : 'kyc_verification',
				realised_trigger    : 'kyc_verification',
			},
			],
		},
		],
	},
	mid_size: {

		agent_scoring_parameter: [{
			name              : 'new_activation',
			parameter_type    : 'value',
			unit_trigger_pair : [{
				parameter_unit      : 'per cash account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '1st SID booked',
				realised_trigger    : 'IRN generation of all invoices of 1st SID',
			},
			{
				parameter_unit      : 'per credit account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '1st SID booked',
				realised_trigger    : 'Invoice Knockoff of all invoices of 1st SID',
			},
			],
		},
		{
			name              : 'true_activation',
			parameter_type    : 'value',
			unit_trigger_pair : [{
				parameter_unit      : 'per cash account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '3rd SID booked',
				realised_trigger    : 'IRN generation of all invoices of 1st SID',
			},
			{
				parameter_unit      : 'per credit account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '3rd SID booked',
				realised_trigger    : 'Invoice Knockoff of all invoices of 1st SID',
			},
			],
		},
		{
			name              : 're_activation',
			parameter_type    : 'value',
			unit_trigger_pair : [{
				parameter_unit      : 'per cash account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '1st SID booked',
				realised_trigger    : 'IRN generation of all invoices of 1st SID',
			},
			{
				parameter_unit      : 'per credit account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '1st SID booked',
				realised_trigger    : 'Invoice Knockoff of all invoices of 1st SID',
			},
			],
		},
		{
			name              : 'retention',
			parameter_type    : 'value',
			unit_trigger_pair : [{
				parameter_unit      : 'per cash account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '1st SID booked',
				realised_trigger    : 'IRN generation of all invoices of 1st SID',
			},
			{
				parameter_unit      : 'per credit account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '1st SID booked',
				realised_trigger    : 'Invoice Knockoff of all invoices of 1st SID',
			},
			],
		},
		{
			name              : 'royalty',
			parameter_type    : 'value',
			unit_trigger_pair : [{
				parameter_unit      : 'per cash account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : 'Every 5th booking',
				realised_trigger    : 'IRN generation of all invoices of 1st SID',
			},
			{
				parameter_unit      : 'per credit account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : 'Every 5th booking',
				realised_trigger    : 'Invoice Knockoff of all invoices of 1st SID',
			},
			],
		},
		{
			name              : 'kyc_verification',
			parameter_type    : 'value',
			unit_trigger_pair : [{
				parameter_unit      : 'per cash account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : 'kyc_verification',
				realised_trigger    : 'kyc_verification',
			},
			{
				parameter_unit      : 'per credit account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : 'kyc_verification',
				realised_trigger    : 'kyc_verification',
			},
			],
		},
		],
	},
	cp: {
		agent_scoring_parameter: [{
			name              : 'new_activation',
			parameter_type    : 'value',
			unit_trigger_pair : [{
				parameter_unit      : 'per cash account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '1st SID booked',
				realised_trigger    : 'IRN generation of all invoices of 1st SID',
			},
			{
				parameter_unit      : 'per credit account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '1st SID booked',
				realised_trigger    : 'Invoice Knockoff of all invoices of 1st SID',
			},
			],
		},
		{
			name              : 'true_activation',
			parameter_type    : 'value',
			unit_trigger_pair : [{
				parameter_unit      : 'per cash account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '3rd SID booked',
				realised_trigger    : 'IRN generation of all invoices of 1st SID',
			},
			{
				parameter_unit      : 'per credit account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '3rd SID booked',
				realised_trigger    : 'Invoice Knockoff of all invoices of 1st SID',
			},
			],
		},
		{
			name              : 're_activation',
			parameter_type    : 'value',
			unit_trigger_pair : [{
				parameter_unit      : 'per cash account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '1st SID booked',
				realised_trigger    : 'IRN generation of all invoices of 1st SID',
			},
			{
				parameter_unit      : 'per credit account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '1st SID booked',
				realised_trigger    : 'Invoice Knockoff of all invoices of 1st SID',
			},
			],
		},
		{
			name              : 'retention',
			parameter_type    : 'value',
			unit_trigger_pair : [{
				parameter_unit      : 'per cash account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '1st SID booked',
				realised_trigger    : 'IRN generation of all invoices of 1st SID',
			},
			{
				parameter_unit      : 'per credit account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : '1st SID booked',
				realised_trigger    : 'Invoice Knockoff of all invoices of 1st SID',
			},
			],
		},
		{
			name              : 'royalty',
			parameter_type    : 'value',
			unit_trigger_pair : [{
				parameter_unit      : 'per cash account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : 'Every 5th booking',
				realised_trigger    : 'IRN generation of all invoices of 1st SID',
			},
			{
				parameter_unit      : 'per credit account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : 'Every 5th booking',
				realised_trigger    : 'Invoice Knockoff of all invoices of 1st SID',
			},
			],
		},
		{
			name              : 'kyc_verification',
			parameter_type    : 'value',
			unit_trigger_pair : [{
				parameter_unit      : 'per cash account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : 'kyc_verification',
				realised_trigger    : 'kyc_verification',
			},
			{
				parameter_unit      : 'per credit account',
				// parameter_eligibility_unit : nil,
				provisional_trigger : 'kyc_verification',
				realised_trigger    : 'kyc_verification',
			},
			],
		},
		],
	},
});

export default getAccountsAgentScoringParameters;
