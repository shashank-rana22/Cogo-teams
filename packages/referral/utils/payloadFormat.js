const isLastLevel = (type, start, end) => {
	if(type === 'fixed'){
		return Number(start);
	}

	if(end === 'master_node'){
		return undefined;
	}

	return Number(end);
}

const getFormattedPayload = (val) => {
	const remainingBonus = val.map((bonus) => {
		const { start_level, type, end_level, max_percentage_allowed, percentage } = bonus;
		return {
			type : type,
			start_level            : Number(start_level),
			end_level              : isLastLevel(type, start_level, end_level),
			max_percentage_allowed : type === 'slab' ? Number(max_percentage_allowed) : undefined,
			percentage             : Number(percentage),
			is_last_level          : end_level === 'master_node',
		};
	});

	return remainingBonus;
};

export const payloadFormat = (event, values) => {
	const {
		event_types, overall_limit_type, overall_limit, event_threshold_limit,
		referral_bonus_total_incentive_type, referral_bonus_total_incentive_value,
		referral_bonus_max_incentive_value, referral_bonus_min_incentive_type, referral_bonus_min_incentive_value,
		referral_bonus_max_incentive_type, network_bonus_total_incentive_type, exceed_allowed, remaining_bonus,
		network_bonus_min_incentive_type, network_bonus_min_incentive_value,
		network_bonus_max_incentive_type, network_bonus_max_incentive_value,
	} = values;

	const payload = {
		event,
		event_types,
		overall_limit_type,
		overall_limit         : overall_limit_type === 'none' ? 0 : Number(overall_limit),
		event_threshold_limit : Number(event_threshold_limit),
		referral_bonus        : {
			referral_bonus_total_incentive_type,
			total_incentive: referral_bonus_total_incentive_type === 'none'
				? 0 : Number(referral_bonus_total_incentive_value),
			referral_bonus_min_incentive_type,
			minimum_incentive_cogopoint: referral_bonus_min_incentive_type === 'none'
				? 0 : Number(referral_bonus_min_incentive_value),
			referral_bonus_max_incentive_type,
			maximum_incentive_cogopoint: referral_bonus_max_incentive_type === 'none'
				? 0 : Number(referral_bonus_max_incentive_value),
		},
		network_bonus: {
			network_bonus_total_incentive_type,
			total_incentive   : network_bonus_total_incentive_type === 'none' ? 0 : Number(exceed_allowed),
			network_bonus_min_incentive_type,
			minimum_incentive : network_bonus_min_incentive_type === 'none'
				? 0 : Number(network_bonus_min_incentive_value),
			network_bonus_max_incentive_type,
			maximum_incentive: network_bonus_max_incentive_type === 'none'
				? 0 : Number(network_bonus_max_incentive_value),
			level_bonus_criterias: getFormattedPayload(remaining_bonus),
		},
	};

	return payload;
};

const remainingBonusFieldArray = (val) => {
	const fieldArray = val.map((val) => ({
		...val,
		end_level : val?.is_last_level === true ? 'master_node' : val?.end_level
	}))

	return fieldArray;
}

export const setFormValues = (values, setValue) => {
	const { data } = values || {};

	const {
		event_types, overall_limit_type, overall_limit, event_threshold_limit, referral_bonus, network_bonus,
	} = data || {};

	const {
		total_incentive,
		referral_bonus_total_incentive_type,
		minimum_incentive_cogopoint, maximum_incentive_cogopoint,
	} = referral_bonus || {};

	const {
		maximum_incentive_cogopoint : network_max, minimum_incentive_cogopoint : network_min,
		network_bonus_max_incentive_type, network_bonus_min_incentive_type,
		network_bonus_total_incentive_type, total_incentive : network_incentive,
		level_bonus_criterias,
	} = network_bonus || {};

	const setValues = (valObject = {}) => {
		Object.keys(valObject).forEach((key) => {
			setValue(key, valObject?.[key]);
		});
	};

	setValues({
		overall_limit_type,
		overall_limit,
		event_types,
		event_threshold_limit,
		referral_bonus_total_incentive_type,
		referral_bonus_total_incentive_value : total_incentive,
		referral_bonus_min_incentive_value   : minimum_incentive_cogopoint,
		referral_bonus_max_incentive_value   : maximum_incentive_cogopoint,
		network_bonus_total_incentive_type,
		network_bonus_min_incentive_type,
		network_bonus_max_incentive_type,
		exceed_allowed                       : network_incentive,
		network_bonus_min_incentive_value    : network_min,
		network_bonus_max_incentive_value    : network_max,
		remaining_bonus                      : remainingBonusFieldArray(level_bonus_criterias),
		exceed_limit                         : network_incentive > 8,
	});
};
