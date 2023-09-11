const getSubBlockControls = () => ({
	accounts: {
		sub_block_type         : 'segment',
		sub_block_type_options : [
			{
				label : 'Default',
				value : 'default',
			},
			{
				label : 'Long Tail',
				value : 'long_tail',
			},
			{
				label : 'Mid Size',
				value : 'mid_size',
			},
			{
				label : 'Enterprise',
				value : 'enterprise',
			},
			{
				label : 'CP',
				value : 'cp',
			},
		],
	},
	engagement: {
		sub_block_type          : 'default',
		agent_scoring_parameter : [{
			name              : 'outbound_answered_call',
			parameter_type    : 'boolean',
			unit_trigger_pair : [{
				parameter_unit      : 'per call',
				// parameter_eligibility_unit : nil,
				provisional_trigger : 'call_log_created',
				realised_trigger    : 'call_log_created',
			}],
		},
		{
			name              : 'inbound_answered_call',
			parameter_type    : 'boolean',
			unit_trigger_pair : [{
				parameter_unit      : 'per call',
				// parameter_eligibility_unit : nil,
				provisional_trigger : 'call_log_created',
				realised_trigger    : 'call_log_created',
			}],
		},
		{
			name              : 'inbound_missed_call',
			parameter_type    : 'boolean',
			unit_trigger_pair : [{
				parameter_unit      : 'per call',
				// parameter_eligibility_unit : nil,
				provisional_trigger : 'call_log_created',
				realised_trigger    : 'call_log_created',
			}],
		},
		{
			name              : 'delivered_email',
			parameter_type    : 'boolean',
			unit_trigger_pair : [{
				parameter_unit      : 'per email',
				// parameter_eligibility_unit : nil,
				provisional_trigger : 'email_log_created',
				realised_trigger    : 'email_log_created',
			}],
		},
		{
			name              : 'chat_attended_within_TAT',
			parameter_type    : 'boolean',
			unit_trigger_pair : [{
				parameter_unit      : 'per chat',
				// parameter_eligibility_unit : nil,
				provisional_trigger : 'chat_log_created',
				realised_trigger    : 'chat_log_created',
			}],
		},
		{
			name              : 'chat_missed',
			parameter_type    : 'boolean',
			unit_trigger_pair : [{
				parameter_unit      : 'per chat',
				// parameter_eligibility_unit : nil,
				provisional_trigger : 'chat_log_created',
				realised_trigger    : 'chat_log_created',
			}],
		},
		{
			name              : 'demo_successfully_given',
			parameter_type    : 'boolean',
			unit_trigger_pair : [{
				parameter_unit      : 'per demo',
				// parameter_eligibility_unit : nil,
				provisional_trigger : 'demo_log_created',
				realised_trigger    : 'demo_log_created',
			}],
		},
		],
	},

	transaction: {
		sub_block_type         : 'service',
		sub_block_type_options : [
			{
				label                   : 'Default',
				value                   : 'default',
				agent_scoring_parameter : [{
					name              : 'new_booking_primary_service',
					parameter_type    : 'boolean',
					unit_trigger_pair : [{
						parameter_unit      : 'per_booking_for_cash_customer',
						// parameter_eligibility_unit : nil,
						provisional_trigger : 'SID_creation',
						realised_trigger    : 'IRN generation of all invoices of 1st SID',
					},
					{
						parameter_unit      : 'per_booking_for_credit_customer',
						// parameter_eligibility_unit : nil,
						provisional_trigger : 'SID_creation',
						realised_trigger    : 'Invoice Knockoff of all invoices of 1st SID',
					},
					],
				},
				{
					name              : 'upselling_cross-selling',
					parameter_type    : 'boolean',
					unit_trigger_pair : [{
						parameter_unit      : 'per_additional_service_for_cash_customer',
						// parameter_eligibility_unit : nil,
						provisional_trigger : 'SID_creation',
						realised_trigger    : 'IRN generation of all invoices of 1st SID',
					},
					{
						parameter_unit      : 'per_additional_service_for_cash_customer',
						// parameter_eligibility_unit : nil,
						provisional_trigger : 'SID_creation',
						realised_trigger    : 'Invoice Knockoff of all invoices of 1st SID',
					},
					],
				},
				{
					name              : 'quotation_sent',
					parameter_type    : 'boolean',
					unit_trigger_pair : [{
						parameter_unit      : 'per_quote_for_cash_customer',
						// parameter_eligibility_unit : nil,
						provisional_trigger : 'quotation_sent',
						realised_trigger    : 'quotation_sent',
					},
					{
						parameter_unit      : 'per_quote_for_credit_customer',
						// parameter_eligibility_unit : nil,
						provisional_trigger : 'quotation_sent',
						realised_trigger    : 'quotation_sent',
					},
					],
				},
				{
					name              : 'cancellations_by_KAM',
					parameter_type    : 'boolean',
					unit_trigger_pair : [{
						parameter_unit      : 'per_cancellation_for_cash_customer',
						// parameter_eligibility_unit : nil,
						provisional_trigger : 'SID_cancelled',
						realised_trigger    : 'SID_cancelled',
					},
					{
						parameter_unit      : 'per_cancellation_for_credit_customer',
						// parameter_eligibility_unit : nil,
						provisional_trigger : 'SID_cancelled',
						realised_trigger    : 'SID_cancelled',
					},
					],
				},
				{
					name              : 'cancellations_by_customer',
					parameter_type    : 'boolean',
					unit_trigger_pair : [{
						parameter_unit      : 'per_cancellation_for_cash_customer',
						// parameter_eligibility_unit : nil,
						provisional_trigger : 'SID_cancelled',
						realised_trigger    : 'SID_cancelled',
					},
					{
						parameter_unit      : 'per_cancellation_for_credit_customer',
						// parameter_eligibility_unit : nil,
						provisional_trigger : 'SID_cancelled',
						realised_trigger    : 'SID_cancelled',
					},
					],
				},
				{
					name              : 'cancellations_by_cogoport',
					parameter_type    : 'boolean',
					unit_trigger_pair : [{
						parameter_unit      : 'per_cancellation_for_cash_customer',
						// parameter_eligibility_unit : nil,
						provisional_trigger : 'SID_cancelled',
						realised_trigger    : 'SID_cancelled',
					},
					{
						parameter_unit      : 'per_cancellation_for_credit_customer',
						// parameter_eligibility_unit : nil,
						provisional_trigger : 'SID_cancelled',
						realised_trigger    : 'SID_cancelled',
					},
					],
				},
				{
					name              : 'new_service_unlocked',
					parameter_type    : 'boolean',
					unit_trigger_pair : [{
						parameter_unit      : 'per_service_for_cash_customer',
						// parameter_eligibility_unit : nil,
						provisional_trigger : 'SID_creation',
						realised_trigger    : 'IRN generation of all invoices of 1st SID',
					},
					{
						parameter_unit      : 'per_service_for_credit_customer',
						// parameter_eligibility_unit : nil,
						provisional_trigger : 'SID_creation',
						realised_trigger    : 'Invoice Knockoff of all invoices of 1st SID',
					},
					],
				},
				],
			},
			{
				label : 'FCL',
				value : 'fcl_freight',
			},
		],
	},
});

export default getSubBlockControls;
