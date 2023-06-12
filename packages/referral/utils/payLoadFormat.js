const MINIMUM_NUMBER_VALUE = 0;

const isLastLevel = (type, start, end) => {
	if (type === 'fixed') {
		return Number(start);
	}
	if (end === 'master_node') {
		return undefined;
	}
	return Number(end);
};

const getFormattedPayload = (val) => {
	const remainingBonus = val.map((bonus) => {
		const { start_level, type, end_level, percentage } = bonus;
		return {
			type,
			start_level   : Number(start_level),
			end_level     : isLastLevel(type, start_level, end_level),
			percentage    : Number(percentage),
			is_last_level : end_level === 'master_node',
		};
	});

	return remainingBonus;
};

export const payloadFormat = (event, values) => {
	const {
		event_types, overall_limit_type,
		overall_limit, event_threshold_limit,
		referral_bonus_total_incentive_type,
		referral_bonus_total_incentive_value,
		referral_bonus_max_incentive_value,
		referral_bonus_min_incentive_type, referral_bonus_min_incentive_value,
		referral_bonus_max_incentive_type,
		network_bonus_total_incentive_type, exceed_allowed, remaining_bonus,
		network_bonus_min_incentive_type,
		network_bonus_min_incentive_value,
		network_bonus_max_incentive_type,
		network_bonus_max_incentive_value, threshold_transacting_user,
	} = values;

	const payload = {
		event,
		event_types           : event === 'subscription' ? undefined : event_types,
		overall_limit_type,
		overall_limit         : overall_limit_type === 'none' ? MINIMUM_NUMBER_VALUE : Number(overall_limit),
		event_threshold_limit : Number(event_threshold_limit),
		referral_bonus        : {
			total_incentive_type : referral_bonus_total_incentive_type,
			total_incentive      : referral_bonus_total_incentive_type === 'none'
				? MINIMUM_NUMBER_VALUE : Number(referral_bonus_total_incentive_value),
			min_incentive_type : referral_bonus_min_incentive_type,
			minimum_incentive  : referral_bonus_min_incentive_type === 'none'
				? MINIMUM_NUMBER_VALUE : Number(referral_bonus_min_incentive_value),
			max_incentive_type : referral_bonus_max_incentive_type,
			maximum_incentive  : referral_bonus_max_incentive_type === 'none'
				? MINIMUM_NUMBER_VALUE : Number(referral_bonus_max_incentive_value),
		},
		network_bonus: {
			total_incentive_type : network_bonus_total_incentive_type,
			total_incentive      : network_bonus_total_incentive_type === 'none'
				? MINIMUM_NUMBER_VALUE : Number(exceed_allowed),
			min_incentive_type : network_bonus_min_incentive_type,
			minimum_incentive  : network_bonus_min_incentive_type === 'none'
				? MINIMUM_NUMBER_VALUE : Number(network_bonus_min_incentive_value),
			max_incentive_type : network_bonus_max_incentive_type,
			maximum_incentive  : network_bonus_max_incentive_type === 'none'
				? MINIMUM_NUMBER_VALUE : Number(network_bonus_max_incentive_value),
			level_bonus_criterias: getFormattedPayload(remaining_bonus),
		},
		threshold_transacting_user,
	};

	return payload;
};

export const remainingBonusFieldArray = (val) => {
	const fieldArray = val?.map((item) => ({
		...item,
		end_level: item?.is_last_level === true ? 'master_node' : item?.end_level,
	}));

	return fieldArray;
};
