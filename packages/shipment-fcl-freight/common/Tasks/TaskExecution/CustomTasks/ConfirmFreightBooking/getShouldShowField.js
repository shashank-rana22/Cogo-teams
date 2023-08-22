const getShowElements = ({ controls, formValues }) => {
	const SHOW_ELEMENTS = {};
	const { booking_ref_status } = formValues || {};

	(controls || []).forEach((ctrl) => {
		const { name } = ctrl || {};

		if (name === 'booking_ref_status') {
			SHOW_ELEMENTS[name] = !booking_ref_status;
			return;
		}

		if (booking_ref_status === 'not_placed'
            && ['booking_reference_delay_reasons', 'booking_reference_delay_remarks'].includes(name)) {
			SHOW_ELEMENTS[name] = true;
			return;
		}

		if (booking_ref_status === 'placed' && name === 'agent_id') {
			SHOW_ELEMENTS[name] = true;
			return;
		}

		SHOW_ELEMENTS[name] = false;
	});

	return SHOW_ELEMENTS;
};
export default getShowElements;
