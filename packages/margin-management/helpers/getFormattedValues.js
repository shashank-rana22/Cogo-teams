const ZERO = 0;
const getFormatterValues = ({ values = {} }) => {
	const {
		service,
		organization_id,
		margin_values,
		location_pair_type,
		partner_id,
		agent_id,
		addition_type,
		margin_type,
		rate_type,
		margin_slabs,
		margin_applied_on,
		is_sales_discount_allowed,
		is_marketing_discount_allowed,
		...rest
	} = values;

	const getFormattedMinMaxValue = (val) => {
		if (val !== undefined && val !== '' && val !== null) {
			return Number(val);
		}
		return undefined;
	};

	const type = addition_type === 'channel_partner' ? 'cogoport' : margin_type;
	const rateType = rate_type === 'marketplace_rate' ? undefined : rate_type;

	let allFilters = {};
	const combinedFilters = { ...rest };

	Object.keys(combinedFilters).forEach((key) => {
		if (combinedFilters[key] || combinedFilters[key] === ZERO) {
			allFilters = { ...allFilters, [key]: combinedFilters[key] };
		}
	});

	const MARGINS_ARR = [];

	(margin_slabs || []).map((item, index) => {
		if (item?.lower_limit !== '' && item?.upper_limit !== '') {
			const lower_limit = Number(item?.lower_limit || ZERO);
			const upper_limit = Number(item?.upper_limit || ZERO);

			const obj = {
				margin_values: margin_values[index].map((val) => ({
					...val,
					max_value : getFormattedMinMaxValue(val.max_value),
					min_value : getFormattedMinMaxValue(val.min_value),
					value     : Number(val.value),
					code      : val?.code || undefined,
				})),
				lower_limit,
				upper_limit,
			};

			MARGINS_ARR.push(obj);
		}
		return MARGINS_ARR;
	});

	return {
		partner_id      : type === 'cogoport' ? partner_id : undefined,
		service,
		organization_id : organization_id || undefined,
		margin_type     : type,
		rate_type       : rateType,
		margin_slabs    : MARGINS_ARR,
		margin_applied_on,
		filters         : { ...allFilters, rate_type: rateType },
		is_sales_discount_allowed,
		is_marketing_discount_allowed,
	};
};

export default getFormatterValues;
