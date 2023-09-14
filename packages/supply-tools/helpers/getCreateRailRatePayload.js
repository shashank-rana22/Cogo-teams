const getCreateRailPayload = ({ data = {}, user_profile = {} }) => {
	const {
		detention = [],
		demurrage = [],
		validity = {},
		previous_days_applicable = '',
		containers_count_lower_limit = '',
		containers_count_upper_limit = '',
		...rest
	} = data || {};

	const slabs = [...detention, ...demurrage].filter((i) => !!i.upper_limit);

	const convertedValidity = {
		validity_start : validity?.startDate,
		validity_end   : validity?.endDate,
	};

	const createPayload = {
		...rest,
		slabs,
		procured_by_id               : user_profile?.id || undefined,
		previous_days_applicable     : previous_days_applicable === 'yes',
		containers_count_lower_limit : Number(containers_count_lower_limit) || undefined,
		containers_count_upper_limit : Number(containers_count_upper_limit) || undefined,
		...convertedValidity,
	};

	return createPayload;
};

export default getCreateRailPayload;
