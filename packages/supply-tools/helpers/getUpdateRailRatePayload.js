const getUpdateRailRatePayload = ({ data = {}, user_profile = {}, item = {} }) => {
	const {
		detention = [],
		demurrage = [],
		validity = {},
		previous_days_applicable = '',
		containers_count_lower_limit = '',
		containers_count_upper_limit = '',
		free_limit,
		sourced_by_id,
	} = data || {};

	const slabs = [...detention, ...demurrage].filter((i) => !!i.upper_limit);

	const convertedValidity = {
		validity_start : validity?.startDate,
		validity_end   : validity?.endDate,
	};

	const updatePayload = {
		free_limit,
		sourced_by_id,
		slabs,
		procured_by_id               : user_profile?.id || undefined,
		previous_days_applicable     : previous_days_applicable === 'yes',
		containers_count_lower_limit : +containers_count_lower_limit || undefined,
		containers_count_upper_limit : +containers_count_upper_limit || undefined,
		id                           : item?.id || undefined,
		...convertedValidity,
	};

	return updatePayload;
};

export default getUpdateRailRatePayload;
