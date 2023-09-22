const getShowElements = (controls, formValues) => {
	const feedbackValue = formValues.feedbacks || [];

	const showElements = controls.reduce((previousControls, currentControls) => {
		const { name = '' } = currentControls;

		let showElement = true;

		if (
			['preferred_freight_rate_currency', 'preferred_freight_rate'].includes(name)
			&& !(feedbackValue).includes('unsatisfactory_rate')
		) {
			showElement = false;
		}

		if (
			name === 'preferred_airline_ids'
			&& !(feedbackValue).includes('unpreferred_airlines')
		) {
			showElement = false;
		}

		if (
			name === 'preferred_shipping_line_ids'
			&& !(feedbackValue).includes('unpreferred_shipping_lines')
		) {
			showElement = false;
		}

		if (
			name === 'preferred_detention_free_days'
			&& !(feedbackValue).includes(
				'unsatisfactory_destination_detention',
			)
		) {
			showElement = false;
		}

		return {
			...previousControls,
			[name]: showElement,
		};
	}, {});

	return showElements;
};
export default getShowElements;
