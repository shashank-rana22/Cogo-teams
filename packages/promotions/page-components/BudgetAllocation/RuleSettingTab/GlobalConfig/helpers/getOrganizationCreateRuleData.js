const getOrganizationCreateRuleData = (values) => {
	const {
		discount_limit_currency = '',
		discount_limit_unit = '',
		discount_limit_value = '',
		frequency = '',
		...restValues
	} = values;
	return {
		...restValues,
		discount_config: {
			discount_limit_currency,
			discount_limit_unit,
			discount_limit_value,
			frequency,
		},
		applicable_at: [
			'promotion_creation',
			'negative_margin_applicability',
			'promotion_consumption',
		],
		category : ['business'],
		scope    : values?.scope,
	};
};

export default getOrganizationCreateRuleData;
