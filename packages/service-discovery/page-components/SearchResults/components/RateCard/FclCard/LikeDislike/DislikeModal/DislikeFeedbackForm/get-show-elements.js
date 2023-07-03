const getShowElements = (controls, formValues) => {
	const showElements = controls.reduce((previousControls, currentControls) => {
		const { name = '' } = currentControls;

		let showElement = true;

		if (
			['preferred_freight_rate_currency', 'preferred_freight_rate'].includes(name)
			&& !(formValues.feedbacks || []).includes('unsatisfactory_rate')
		) {
			showElement = false;
		}

		if (
			name === 'preferred_airline_ids'
			&& !(formValues.feedbacks || []).includes('unpreferred_airlines')
		) {
			showElement = false;
		}

		if (
			name === 'preferred_shipping_line_ids'
			&& !(formValues.feedbacks || []).includes('unpreferred_shipping_lines')
		) {
			showElement = false;
		}

		if (
			name === 'preferred_detention_free_days'
			&& !(formValues.feedbacks || []).includes(
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
