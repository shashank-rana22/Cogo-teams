import removeObjEmptyValue from '../../../../../helpers/removeObjEmptyValue';

const getOrganizationCreateRuleData = ({ values = {} }) => {
	const {
		discount_limit_currency = '',
		discount_limit_unit = '',
		discount_limit_value = '',
		frequency = '',
		category = '',
		...restValues
	} = values || {};
	const nonEmptyValues = removeObjEmptyValue(restValues);
	return {
		...nonEmptyValues,
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
		category : [category],
		scope    : values?.scope,
	};
};

export default getOrganizationCreateRuleData;
