import { remainingBonusFieldArray } from './payLoadFormat';

const MINIMUM_LIMIT_VALUE = 8;

export const setFormValues = (values, setValue) => {
	const {
		event_types, overall_limit_type, overall_limit,
		event_threshold_limit, referral_bonus,
		network_bonus, threshold_transacting_user,
	} = values || {};

	const {
		total_incentive,
		total_incentive_type: referral_bonus_total_incentive_type,
		max_incentive_type: referral_bonus_max_incentive_type,
		min_incentive_type: referral_bonus_min_incentive_type,
		minimum_incentive, maximum_incentive,
	} = referral_bonus || {};

	const {
		maximum_incentive : network_max,
		minimum_incentive : network_min,
		max_incentive_type: network_bonus_max_incentive_type,
		min_incentive_type: network_bonus_min_incentive_type,
		total_incentive_type: network_bonus_total_incentive_type,
		total_incentive : network_incentive,
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
		threshold_transacting_user,
		referral_bonus_total_incentive_type,
		referral_bonus_total_incentive_value : total_incentive,
		referral_bonus_min_incentive_value   : minimum_incentive,
		referral_bonus_max_incentive_value   : maximum_incentive,
		referral_bonus_max_incentive_type,
		referral_bonus_min_incentive_type,
		network_bonus_total_incentive_type,
		network_bonus_min_incentive_type,
		network_bonus_max_incentive_type,
		exceed_allowed                       : network_incentive,
		network_bonus_min_incentive_value    : network_min,
		network_bonus_max_incentive_value    : network_max,
		remaining_bonus                      : remainingBonusFieldArray(level_bonus_criterias),
		exceed_limit                         : network_incentive > MINIMUM_LIMIT_VALUE,
	});
};
