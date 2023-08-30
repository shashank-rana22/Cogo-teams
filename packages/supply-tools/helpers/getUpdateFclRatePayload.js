const getUpdateFclRatePayload = ({ data = {}, item = {}, user_profile = {} }) => {
	const {
		detention = [],
		demurrage = [],
		validity = {},
		previous_days_applicable,
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
		procured_by_id           : user_profile?.id,
		previous_days_applicable : previous_days_applicable === 'yes',
		id                       : item?.id,
		...convertedValidity,
	};

	return updatePayload;
};

export default getUpdateFclRatePayload;
