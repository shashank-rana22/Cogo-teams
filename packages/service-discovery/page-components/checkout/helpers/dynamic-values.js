import getGeoConstants from '@cogoport/globalization/constants/geo';

const geo = getGeoConstants();

export const displayLineItemValue = (
	value = 0,
	{ lineItem = {}, editedMargin = {}, filterMarginType = 'demand' },
) => {
	const appliedMargin = (lineItem?.margins || []).find(
		(m) => m.margin_type === filterMarginType,
	);

	let totalEditedMargin =		editedMargin?.value || appliedMargin?.total_margin_value || 0;
	if (editedMargin?.type === 'absolute_unit') {
		totalEditedMargin = lineItem?.quantity * (editedMargin?.value || 0);
	}

	if (!appliedMargin) {
		return value + totalEditedMargin;
	}

	const totalAppliedMargin = appliedMargin?.total_margin_value;

	const delta = totalEditedMargin - totalAppliedMargin;
	return value + delta;
};

// will not work because adding different currencies

export const convertCurrencyValue = (
	value,
	fromCurrency,
	toCurrency,
	conversions,
) => {
	const {
		base_currency,
		currencies,
		currency_conversion_delta = 0.04,
		cogofx_currencies = {},
	} = conversions || {};

	const fxFees = 1 + currency_conversion_delta;

	if (fromCurrency === toCurrency) {
		return value;
	}

	if (base_currency === fromCurrency) {
		return (value / (currencies[toCurrency] || cogofx_currencies[toCurrency])) * fxFees;
	}

	const inBase = value * (currencies[fromCurrency] || cogofx_currencies[fromCurrency]);

	return (inBase / (currencies[toCurrency] || cogofx_currencies[toCurrency])) * fxFees;
};

export const displayTotalValue = (
	value = 0,
	{
		lineItems = [],
		editedMargins = [],
		filterMarginType = 'demand',
		conversions,
		toCurrency = geo.country.currency.code,
	},
) => {
	let calculatedMargins = [];
	lineItems.forEach((lineItem) => {
		let tempMargins = (lineItem?.margins || []).filter(
			(m) => m.margin_type === filterMarginType,
		);
		const editedMargin = editedMargins.find((em) => em.code === lineItem.code);
		if (!tempMargins?.length) {
			tempMargins.push({
				type               : editedMargin?.type,
				value              : 0,
				total_margin_value : 0,
				margin_type        : filterMarginType,
			});
		}
		tempMargins = tempMargins.map((m) => {
			let actual = 0;
			if (m?.type === 'absolute_unit') { actual = (lineItem?.quantity || 1) * (m?.value || 0); } else if (m?.type === 'absolute_total') actual = m?.value || 0;
			else if (m?.type === 'percentage') actual = m?.total_margin_value || 0;

			let edited;
			if (editedMargin) {
				if (editedMargin?.type === 'absolute_unit') { edited = (lineItem?.quantity || 1) * (editedMargin?.value || 0); } else if (editedMargin?.type === 'absolute_total') { edited = editedMargin?.value || 0; } else edited = actual;
			} else {
				edited = actual;
			}

			edited = convertCurrencyValue(
				edited,
				lineItem?.currency,
				toCurrency,
				conversions,
			);
			actual = convertCurrencyValue(
				actual,
				lineItem?.currency,
				toCurrency,
				conversions,
			);

			return { actual, edited, currency: toCurrency };
		});
		calculatedMargins = calculatedMargins.concat(tempMargins);
	});

	const aggregated = calculatedMargins.reduce(
		(acc, item) => ({
			actual : acc.actual + item.actual,
			edited : acc.edited + item.edited,
		}),
		{ actual: 0, edited: 0 },
	);

	const delta = aggregated.edited - aggregated.actual;
	return value + delta;
};

export const displayTotal = (
	lineItems,
	editedMargins,
	conversions,
	toCurrency,
) => {
	let Total = 0;

	(lineItems || []).forEach((line_item) => {
		const {
			source = '',
			isNew = false,
			total_buy_price = 0,
			total_price_discounted = 0,
			credit_amount = 0,
			quantity = 0,
			currency = '',
		} = line_item;

		if (source !== 'manual' && !isNew) {
			Total += convertCurrencyValue(
				!total_buy_price
					? total_price_discounted
					: total_price_discounted + Number(credit_amount * quantity),
				currency,
				toCurrency,
				conversions,
			);
		}
	});

	editedMargins?.forEach((editedMargin) => {
		const { type, isNew = false, value = 0 } = editedMargin || {};

		if (type === 'absolute_unit' && !isNew) {
			const lineItem = (lineItems || []).find((item) => item.code === editedMargin.code);

			const { margins = [], quantity = 0, source = '' } = lineItem;

			const predefined_margin = (margins || []).find(
				(item) => item?.margin_type === 'demand',
			);
			const { total_margin_value = 0 } = predefined_margin || {};

			const temp = value * quantity - (source !== 'manual' ? total_margin_value : 0);

			Total += convertCurrencyValue(
				temp,
				editedMargin.currency,
				toCurrency,
				conversions,
			);
		}

		if (type === 'absolute_total' && !editedMargin.isNew) {
			const lineItem = (lineItems || []).find((item) => item.code === editedMargin.code);

			const { margins = [] } = lineItem;

			const predefined_margin = (margins || []).find(
				(item) => item?.margin_type === 'demand',
			);
			const { total_margin_value = 0 } = predefined_margin || {};

			const temp = editedMargin.value
						- (lineItem.source !== 'manual' ? total_margin_value : 0);

			Total += convertCurrencyValue(
				temp,
				editedMargin.currency,
				toCurrency,
				conversions,
			);
		}

		if (editedMargin.isNew) {
			Total += convertCurrencyValue(
				Number(editedMargin.value),
				editedMargin.currency,
				toCurrency,
				conversions,
			);
		}
	});

	return Total;
};

export const displayMarginValue = (value, { lineItem = {}, editedMargin }) => {
	const { value:finalValue = 0, type = '' } = editedMargin;

	const { quantity = 1 } = lineItem;

	if (!editedMargin) {
		return value;
	}

	let derivedMarginValue = value;

	if (type === 'absolute_unit') {
		derivedMarginValue = quantity * finalValue;
	} else {
		derivedMarginValue = Number(finalValue);
	}

	return derivedMarginValue;
};

export const displayNetTotal = (
	value,
	{
		services = {},
		editedMargins = {},
		toCurrency = geo.country.currency.code,
		conversions = {},
		filterMarginType = 'demand',
	},
) => {
	let aggLineItems = [];
	Object.keys(services).forEach((oldServiceKey) => {
		let tempLineItems =			services?.[oldServiceKey]?.sellers?.[0]?.line_items || [];
		let derivedServiceKey = oldServiceKey;
		if (
			derivedServiceKey === 'origin_local'
			|| derivedServiceKey === 'destination_local'
		) {
			derivedServiceKey = 'freight';
		}
		tempLineItems = tempLineItems.map((l) => ({
			serviceKey: oldServiceKey,
			derivedServiceKey,
			...l,
		}));
		aggLineItems = aggLineItems.concat(tempLineItems);
	});

	let allEditedMargins = [];
	let aggEditedMargins = [];
	Object.keys(editedMargins).forEach((serviceKey) => {
		let servicedEditedMargins = editedMargins[serviceKey];
		servicedEditedMargins = servicedEditedMargins.map((m) => ({
			...m,
			serviceKey,
		}));
		allEditedMargins = allEditedMargins.concat(servicedEditedMargins);

		const servicedEditedMarginValues = servicedEditedMargins.map((m) => {
			const lineItem = aggLineItems.find(
				(l) => m?.code === l?.code && serviceKey === l?.derivedServiceKey,
			);
			let totalValue = 0;
			if (m?.type === 'absolute_unit') { totalValue = (lineItem?.quantity || 1) * (m?.value || 0); } else if (m?.type === 'absolute_total') totalValue = m?.value || 0;
			else if (m?.type === 'percentage') { totalValue = m?.total_margin_value || 0; }
			return convertCurrencyValue(
				totalValue,
				lineItem?.currency,
				toCurrency,
				conversions,
			);
		});
		aggEditedMargins = aggEditedMargins.concat(servicedEditedMarginValues);
	});

	let aggAppliedMargins = [];
	aggLineItems.forEach((lineItem) => {
		let margins = [...lineItem?.margins].filter(
			(m) => m?.margin_type === filterMarginType,
		);
		if (margins?.length === 0) {
			const editedMargin = allEditedMargins.find(
				(m) => m?.code === lineItem?.code && m?.serviceKey === lineItem?.serviceKey,
			);
			if (editedMargin) {
				margins.push({
					code               : lineItem?.code,
					type               : 'absolute_total',
					value              : 0,
					total_margin_value : 0,
					margin_type        : 'demand',
				});
			}
		}

		margins = margins.map((m) => {
			const isEditPresent =				allEditedMargins.findIndex(
				(em) => em?.serviceKey === lineItem?.derivedServiceKey,
			) !== -1;
			if (isEditPresent) {
				let totalValue = 0;

				if (m?.type === 'absolute_unit') {
					totalValue = (lineItem?.quantity || 1) * (m?.value || 0);
				} else if (m?.type === 'absolute_total') totalValue = m?.value || 0;
				else if (m?.type === 'percentage') { totalValue = m?.total_margin_value || 0; }
				return convertCurrencyValue(
					totalValue,
					lineItem?.currency,
					toCurrency,
					conversions,
				);
			}
			return 0;
		});
		aggAppliedMargins = aggAppliedMargins.concat(margins || []);
	});

	const totalAppliedMargin = aggAppliedMargins.reduce((acc, m) => acc + m, 0);
	const totalEditedMargin = aggEditedMargins.reduce((acc, m) => acc + m, 0);
	const delta = totalEditedMargin - totalAppliedMargin;
	return value + delta;
};
