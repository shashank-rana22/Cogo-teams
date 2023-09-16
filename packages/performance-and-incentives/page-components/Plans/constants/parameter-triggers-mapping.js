const PARAM_TRIGGERS_MAPPING = {
	new_activation: {
		provisional_trigger : '1st SID booked',
		realised_trigger    : 'IRN generation / Invoice Knockoff',
	},
	true_activation: {
		provisional_trigger : '3rd SID booked',
		realised_trigger    : 'IRN generation / Invoice Knockoff',
	},
	re_activation: {
		provisional_trigger : '1st SID booked post churn',
		realised_trigger    : 'IRN generation / Invoice Knockoff',
	},
	retention: {
		provisional_trigger : 'Every 5th booking post true activation',
		realised_trigger    : 'IRN generation / Invoice Knockoff',
	},
	royalty: {
		provisional_trigger : 'Every 5th booking',
		realised_trigger    : 'IRN generation / Invoice Knockoff',
	},
	kyc_verification: {
		provisional_trigger : 'kyc_verification',
		realised_trigger    : 'kyc_verification',
	},
	outbound_answered: {
		provisional_trigger : 'call_log_created',
		realised_trigger    : 'call_log_created',
	},
	inbound_answered: {
		provisional_trigger : 'call_log_created',
		realised_trigger    : 'call_log_created',
	},
	inbound_missed: {
		provisional_trigger : 'call_log_created',
		realised_trigger    : 'call_log_created',
	},
	email_delivered: {
		provisional_trigger : 'email_log_created',
		realised_trigger    : 'email_log_created',
	},
	chat_attended_within_tat: {
		provisional_trigger : 'chat_log_created',
		realised_trigger    : 'chat_log_created',
	},
	chat_missed: {
		provisional_trigger : 'chat_log_created',
		realised_trigger    : 'chat_log_created',
	},
	demo_successfully_given: {
		provisional_trigger : 'demo_log_created',
		realised_trigger    : 'demo_log_created',
	},
	verified_email_addition: {
		provisional_trigger : 'email_added',
		realised_trigger    : 'email_bounce_verified',
	},
	verified_mobile_addition: {
		provisional_trigger : 'mobile_added',
		realised_trigger    : 'mobile_bounce_verified',
	},
	valid_account_feedback: {
		provisional_trigger : 'feedback_submission',
		realised_trigger    : 'feedback_submission',
	},
	valid_user_feedback: {
		provisional_trigger : 'feedback_submission',
		realised_trigger    : 'feedback_submission',
	},
	new_booking_primary_service: {
		provisional_trigger : 'SID creation',
		realised_trigger    : 'IRN generation / Invoice Knockoff',
	},
	'upselling_cross-selling': {
		provisional_trigger : 'SID creation',
		realised_trigger    : 'IRN generation / Invoice Knockoff',
	},
	quotation_sent: {
		provisional_trigger : 'quotation_sent',
		realised_trigger    : 'quotation_sent',
	},
	cancellations_by_kam: {
		provisional_trigger : 'SID cancelled',
		realised_trigger    : 'SID cancelled',
	},
	cancellations_by_customer: {
		provisional_trigger : 'SID cancelled',
		realised_trigger    : 'SID cancelled',
	},
	cancellations_by_cogoport: {
		provisional_trigger : 'SID cancelled',
		realised_trigger    : 'SID cancelled',
	},
	new_service_unlocked: {
		provisional_trigger : 'SID creation',
		realised_trigger    : 'IRN generation / Invoice Knockoff',
	},

};

export default PARAM_TRIGGERS_MAPPING;
