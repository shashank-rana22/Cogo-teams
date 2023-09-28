const getOrganizationUpdateAgentRuleData = (values) => {
	const {
		id = '',
		frequency = '',
		discount_limit_currency = '',
		discount_limit_unit = '',
		discount_limit_value = '',
	} = values || {};
	return {
		discount_config: {
			frequency,
			discount_limit_currency,
			discount_limit_unit,
			discount_limit_value,
		},
		id,
	};
};

export default getOrganizationUpdateAgentRuleData;
