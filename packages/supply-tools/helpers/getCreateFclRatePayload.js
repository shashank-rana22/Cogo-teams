const getCreateFclRatePayload = ({ data = {}, user_profile = {} }) => {
	const {
		detention = [],
		demurrage = [],
		previous_days_applicable,
		validity = {},
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
		procured_by_id           : user_profile?.id || undefined,
		previous_days_applicable : previous_days_applicable === 'yes',
		...convertedValidity,
	};

	return createPayload;
};
export default getCreateFclRatePayload;
