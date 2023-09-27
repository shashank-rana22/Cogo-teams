const getOrganizationUpdateRuleData = (values) => {
	const {
		id = '',
		cogo_entity_id = '',
		organization_id = '',
		rate_source = '',
		trade_type = '',
		organization_type = '',
		organization_sub_type = '',
		frequency = '',
		discount_limit_currency = '',
		discount_limit_unit = '',
		discount_limit_value = '',
	} = values;
	return {
		discount_config: {
			frequency,
			discount_limit_currency,
			discount_limit_unit,
			discount_limit_value,
		},
		id,
		scope: values?.scope,
		cogo_entity_id,
		organization_id,
		rate_source,
		trade_type,
		organization_type,
		organization_sub_type,
	};
};

export default getOrganizationUpdateRuleData;
