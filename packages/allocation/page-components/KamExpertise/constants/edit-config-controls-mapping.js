const EDIT_CONFIG_CONTROLS_MAPPING = {
	first_completeion:
		{
			name        : 'first_completeion',
			type        : 'number',
			label       : 'Score credited on first completion',
			placeholder : 'Enter Score',
		},

	second_completion:
		{
			name        : 'second_completion',
			type        : 'number',
			label       : 'Score credited on repetition',
			placeholder : 'Enter Score',
		},

	priority:
		{
			name    : 'priority',
			type    : 'select',
			label   : 'Priority',
			options : [
				{ value: 'high', label: 'High' },
				{ value: 'medium', label: 'Medium' },
				{ value: 'low', label: 'Low' },
			],
			placeholder: 'Select Priority',
		},

	score_controlled_shipment:
		{
			name        : 'score_controlled_shipment',
			type        : 'number',
			label       : 'Score credited on controlled shipment',
			placeholder : 'Enter Score',
		},

	score_unique_lane:
		{
			name        : 'score_unique_lane',
			type        : 'number',
			label       : 'Score credited on Each unique lane',
			placeholder : 'Enter Score',
		},

	score_upto_twenty_five_percent:
		{
			name        : 'score_upto_twenty_five_percent',
			type        : 'number',
			label       : 'Score on 25% completion',
			placeholder : 'Enter Score',
		},

	score_upto_fifty_percent:
		{
			name        : 'score_upto_fifty_percent',
			type        : 'number',
			label       : 'Score on 50% completion',
			placeholder : 'Enter Score',
		},

	score_upto_seventy_five_percent:
		{
			name        : 'score_upto_seventy_five_percent',
			type        : 'number',
			label       : 'Score on 75% completion',
			placeholder : 'Enter Score',

		},

	score_upto_hundred_percent:
		{
			name        : 'score_upto_hundred_percent',
			type        : 'number',
			label       : 'Score on 100% completion',
			placeholder : 'Enter Score',

		},

	score_upto_three_days:
		{
			name        : 'score_upto_three_days',
			type        : 'number',
			label       : '<3 Days',
			placeholder : 'Enter Score',

		},

	score_from_three_to_seven_days:
		{
			name        : 'score_from_three_to_seven_days',
			type        : 'number',
			label       : '3-7 Days',
			placeholder : 'Enter Score',

		},

	score_from_seven_to_fifteen_days:
		{
			name        : 'score_from_seven_to_fifteen_days',
			type        : 'number',
			label       : '7-15 Days',
			placeholder : 'Enter Score',

		},

	score_greater_fifteen_days:
		{
			name        : 'score_greater_fifteen_days',
			type        : 'number',
			label       : '>15 Days',
			placeholder : 'Enter Score',

		},

	score_each_retained_acc_per_month:
		{
			name        : 'score_each_retained_acc_per_month',
			type        : 'number',
			label       : 'Score credited Each Retained Account Per month',
			placeholder : 'Enter Score',

		},

	before_overdue:
		{
			name        : 'before_overdue',
			type        : 'number',
			label       : 'Before Overdue',
			placeholder : 'Enter Score',

		},

	score_from_three_to_ten_days:
		{
			name        : 'score_from_three_to_ten_days',
			type        : 'number',
			label       : '3-10 Days',
			placeholder : 'Enter Score',

		},

	wallet_share_75_to_100:
		{
			name        : 'wallet_share_75_to_100',
			type        : 'number',
			label       : '75-100% wallet share captured',
			placeholder : 'Enter Score',

		},

	wallet_share_50_to_75:
		{
			name        : 'wallet_share_50_to_75',
			type        : 'number',
			label       : '50-75% wallet share captured',
			placeholder : 'Enter Score',

		},

	wallet_share_25_to_50:
		{
			name        : 'wallet_share_25_to_50',
			type        : 'number',
			label       : '25-50% wallet share captured',
			placeholder : 'Enter Score',

		},

	wallet_share_0_to_25:
		{
			name        : 'wallet_share_0_to_25',
			type        : 'number',
			label       : '0-25% wallet share captured',
			placeholder : 'Enter Score',

		},

	score_new_account_new_industry:
		{
			name        : 'score_new_account_new_industry',
			type        : 'number',
			label       : 'Score credited for every new account in new industry',
			placeholder : 'Enter Score',

		},

	score_new_account_in_new_country:
		{
			name        : 'score_new_account_in_new_country',
			type        : 'number',
			label       : 'Score credited for every new account in new Country',
			placeholder : 'Enter Score',

		},

	score_deducted_on_each_churn:
		{
			name        : 'score_deducted_on_each_churn',
			type        : 'number',
			label       : 'Score Deducted on each churn',
			placeholder : 'Enter Score',

		},

	trade_type_drop:
		{
			name    : 'trade_type_drop',
			type    : 'select',
			label   : 'Type',
			options : [
				{ value: 'import', label: 'Import' },
				{ value: 'export', label: 'Export' },
				{ value: 'domestic', label: 'Domestic' },
			],
			placeholder: 'Select Type',
		},

	score_added_first_import:
		{
			name        : 'score_added_first_import',
			type        : 'number',
			label       : 'Score credited on first import',
			placeholder : 'Enter Score',

		},

	score_added_subsequent_import:
		{
			name        : 'score_added_subsequent_import',
			type        : 'number',
			label       : 'Score credited on subsequent import',
			placeholder : 'Enter Score',

		},

	score_added_first_export:
		{
			name        : 'score_added_first_export',
			type        : 'number',
			label       : 'Score credited on first export',
			placeholder : 'Enter Score',

		},

	score_added_subsequent_export:
		{
			name        : 'score_added_subsequent_export',
			type        : 'number',
			label       : 'Score credited on subsequent export',
			placeholder : 'Enter Score',

		},

	score_added_first_domestic:
		{
			name        : 'score_added_first_domestic',
			type        : 'number',
			label       : 'Score credited on first export',
			placeholder : 'Enter Score',

		},

	score_added_subsequent_domestic:
		{
			name        : 'score_added_subsequent_domestic',
			type        : 'number',
			label       : 'Score credited on subsequent export',
			placeholder : 'Enter Score',

		},

	shipment_mode_drop:
		{
			name    : 'shipment_type_drop',
			type    : 'select',
			label   : 'Type',
			options : [
				{ value: 'ocean', label: 'Ocean' },
				{ value: 'air', label: 'Air' },
				{ value: 'surface', label: 'Surface' },
			],
			placeholder: 'Select Type',

		},

	score_added_first_completion:
		{
			name        : 'score_added_first_completion',
			type        : 'number',
			label       : 'Score credited on first completion',
			placeholder : 'Enter Score',

		},

	score_added_shipment_repetition:
		{
			name        : 'score_added_shipment_repetition',
			type        : 'number',
			label       : 'Score credited on repetition',
			placeholder : 'Enter Score',

		},

	shipment_type_drop:
		{
			name    : 'shipment_type_drop',
			type    : 'select',
			label   : 'Type',
			options : [
				{ value: 'fcl', label: 'FCL' },
				{ value: 'lcl', label: 'LCL' },
				{ value: 'air_domestic', label: 'Air (domestic)' },
				{ value: 'air_international', label: 'Air (international)' },
				{ value: 'ftl', label: 'FTL' },
				{ value: 'ltl', label: 'LTL' },
				{ value: 'rail_domestic', label: 'Rail (domestic)' },
				{ value: 'haulage', label: 'Haulage' },
			],
			placeholder: 'Select Type',
		},

	score_first_completion_shipment_type:
		{
			name        : 'score_first_completion_shipment_type',
			type        : 'number',
			label       : 'Score credited on first completion',
			placeholder : 'Enter Score',

		},

	score_shipment_type_repetition:
		{
			name        : 'score_shipment_type_repetition',
			type        : 'number',
			label       : 'Score credited on repetition',
			placeholder : 'Enter Score',

		},

	score_added_each_unique_lane:
		{
			name        : 'score_added_each_unique_lane',
			type        : 'number',
			label       : 'Score credited on Each unique lane',
			placeholder : 'Enter Score',

		},

	score_added_trade_lane_repetition:
		{
			name        : 'score_added_trade_lane_repetition',
			type        : 'number',
			label       : 'Score credited on repetition',
			placeholder : 'Enter Score',

		},

	score_freight_control_repetition:
		{
			name        : 'score_freight_control_repetition',
			type        : 'number',
			label       : 'Score credited on repetition',
			placeholder : 'Enter Score',

		},

	score_value_added_service:
		{
			name        : 'score_value_added_service',
			type        : 'number',
			label       : 'Score credited on each VAS ',
			placeholder : 'Enter Score',

		},

	score_value_added_service_repetition:
		{
			name        : 'score_freight_control_repetition',
			type        : 'number',
			label       : 'Score credited on repetition',
			placeholder : 'Enter Score',

		},

	score_first_completion_reefer:
		{
			name        : 'score_first_completion_reefer',
			type        : 'number',
			label       : 'Score credited on first completion',
			placeholder : 'Enter Score',

		},

	score_repetition_reefer:
		{
			name        : 'score_repetition_reefer',
			type        : 'number',
			label       : 'Score credited on repetition',
			placeholder : 'Enter Score',

		},

	score_once_uncommon_language:
		{
			name        : 'score_once_uncommon_language',
			type        : 'number',
			label       : 'Score credited only once for every uncommon',
			placeholder : 'Enter Score',
		},

};

export default EDIT_CONFIG_CONTROLS_MAPPING;
