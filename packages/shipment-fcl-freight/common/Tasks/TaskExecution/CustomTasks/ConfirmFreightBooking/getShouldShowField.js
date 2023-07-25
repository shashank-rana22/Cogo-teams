const getShouldShowField = ({ ctrl, formValues }) => {
	const { name } = ctrl || {};
	const { booking_ref_status } = formValues || {};

	if (name === 'booking_ref_status') {
		return !formValues.booking_ref_status;
	}

	if (booking_ref_status === 'not_placed'
		&& ['booking_reference_delay_reasons', 'booking_reference_delay_remarks'].includes(name)) {
		return true;
	}

	if (booking_ref_status === 'placed' && name === 'agent_id') {
		return true;
	}
	return false;
};
export default getShouldShowField;
