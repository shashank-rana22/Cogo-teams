const ONE = 1; const ZERO = 0;
const disablePrevFields = ({ fieldName = '', key = '', fields = {}, formValues = {} }) => {
	const field = fields;
	field[fieldName].controls = fields[key].controls.map((control) => {
		if (control.name === 'lower_limit') {
			const codeValues = (formValues[fieldName] || []).map((item) => item.lower_limit);
			const { disabled = [] } = codeValues.reduce((pv) => ({
				...pv,
				disabled: [...(pv.disabled || []), true],
			}), {});
			return {
				...control,
				itemsDisabled: disabled,
			};
		}
		if (control.name === 'upper_limit') {
			return {
				...control,
				itemsDisabled: (formValues[fieldName] || []).map(
					(_, index) => index < (formValues[fieldName] || []).length - ONE,
				),
			};
		}
		if (control.name === 'limit_currency') {
			return {
				...control,
				itemsDisabled: (formValues[fieldName] || []).map(
					(_, index) => index !== ZERO,
				),
			};
		}
		return {
			...control,
		};
	});
};

export default disablePrevFields;
