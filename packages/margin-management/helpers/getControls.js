import conditions from '../utils/condition-constants';

const getControls = (
	{
		allPresentControls = [],
		item = {},
		chargeCodes = [],
		additionType = '',
		service = '',
		isConditionMatches = () => {},
	},
) => {
	const newItem = { ...(item || {}), ...(item?.filters || {}) };
	const controls = allPresentControls.map((control) => {
		const value = (newItem || {})[control.name] || control?.value;
		if (!['trade_type', 'margin_slabs', 'margin_type'].includes(control.name)) {
			const newControl = {
				...control,
				value,
			};
			return newControl;
		}

		if (control.name === 'margin_slabs') {
			const controlData = control.controls;

			return {
				...control,
				value,
				controls: controlData.map((val) => {
					if (val.name === 'limit_currency') {
						return {
							...val,
							value: item.margin_slabs_currency,
						};
					}

					if (val.name === 'margin_values') {
						return {
							...val,
							value,
							controls: (val?.controls || []).map((child) => {
								if (child.name === 'code') {
									return {
										...child,
										options: chargeCodes,
									};
								}
								return child;
							}),
						};
					}

					return {
						...val,
						value,
					};
				}),
			};

			// return {
			// 	...control,
			// 	value,
			// };

			// return {
			// 	...control,
			// 	value,
			// 	controls: (control?.controls || []).map((child) => {
			// 		if (child.name === 'code') {
			// 			return {
			// 				...child,
			// 				options: chargeCodes,
			// 			};
			// 		}
			// 		return child;
			// 	}),
			// };
		}

		if (control.name === 'margin_type') {
			const OPTIONS = [];
			if (
				isConditionMatches(
					[
						...conditions.SEE_SALES_MARGIN,
						...conditions.SEE_ALL_MARGINS,
						...conditions.ADD_CHANNEL_PARTNER_MARGIN,
					],
					'or',
				)
			) {
				OPTIONS.push({ label: 'Sales', value: 'demand' });
			}
			if (
				isConditionMatches(
					[...conditions.SEE_SUPPLY_MARGIN, ...conditions.SEE_ALL_MARGINS],
					'or',
				)
			) {
				OPTIONS.push({ label: 'Supply', value: 'supply' });
			}
			if (isConditionMatches(conditions.SEE_ALL_MARGINS, 'or')) {
				OPTIONS.push({ label: 'Cogoport', value: 'cogoport' });
			}
			return {
				...control,
				value,
				options:
					additionType === 'channel_partner'
						? [{ label: 'Cogoport', value: 'cogoport' }]
						: OPTIONS,
			};
		}

		if (control.name === 'trade_type') {
			const options = [
				{ label: 'Import', value: 'import' },
				{ label: 'Export', value: 'export' },
			];

			if (['ftl_freight', 'ltl_freight', 'haulage_freight'].includes(service)) {
				options.push({ label: 'Domestic', value: 'domestic' });
			}
			return {
				...control,
				value,
				options,
			};
		}

		return {
			...control,
			value,
		};
	});

	return controls;
};
export default getControls;
